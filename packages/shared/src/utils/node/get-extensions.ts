import path from 'path';
import fse from 'fs-extra';
import {
	ExtensionLocal,
	ExtensionManifestRaw,
	ExtensionOptionsRaw,
	ExtensionPackage,
	ExtensionPackageType,
	ExtensionType,
} from '../../types';
import { resolvePackage } from './resolve-package';
import { listFolders } from './list-folders';
import {
	EXTENSION_NAME_REGEX,
	EXTENSION_PKG_KEY,
	HYBRID_EXTENSION_TYPES,
	PACKAGE_EXTENSION_TYPES,
} from '../../constants';
import { pluralize } from '../pluralize';
import { validateExtensionManifest } from '../validate-extension-manifest';
import { isIn, isTypeIn } from '../array-helpers';

async function resolveExtensions(
	extensionOptions: any,
	types: readonly ExtensionPackageType[],
	extensionPath: string,
	extensionName: string,
	extensionManifest: ExtensionManifestRaw
): Promise<ExtensionPackage[]> {
	const extensions: ExtensionPackage[] = [];

	if (extensionManifest.version === undefined) {
		extensionManifest.version = '';
	}

	if (extensionOptions.type === undefined) {
		extensionOptions.type = 'unknown';
	}

	if (isIn(extensionOptions.type, types)) {
		if (isTypeIn(extensionOptions, PACKAGE_EXTENSION_TYPES)) {
			const extensionChildren = Object.keys(extensionManifest.dependencies ?? {}).filter((dep) =>
				EXTENSION_NAME_REGEX.test(dep)
			);

			const extension: ExtensionPackage = {
				path: extensionPath,
				name: extensionName,
				version: extensionManifest.version,
				type: extensionOptions.type,
				host: extensionOptions.host,
				children: extensionChildren,
				local: false,
			};

			extensions.push(extension);
			extensions.push(...(await resolvePackageExtensions(extension.children || [], extension.path, types)));
		} else if (isTypeIn(extensionOptions, HYBRID_EXTENSION_TYPES)) {
			extensions.push({
				path: extensionPath,
				name: extensionName,
				version: extensionManifest.version,
				type: extensionOptions['type'],
				entrypoint: {
					app: extensionOptions['path']['app'],
					api: extensionOptions['path']['api'],
				},
				host: extensionOptions['host'],
				local: false,
			});
		} else {
			extensions.push({
				path: extensionPath,
				name: extensionName,
				version: extensionManifest.version,
				type: extensionOptions['type'],
				entrypoint: extensionOptions['path'],
				host: extensionOptions['host'],
				local: false,
			});
		}
	}

	return extensions;
}

async function resolvePackageExtensions(
	extensionNames: string[],
	root: string,
	types: readonly ExtensionPackageType[]
): Promise<ExtensionPackage[]> {
	const extensions: ExtensionPackage[] = [];

	for (const extensionName of extensionNames) {
		const extensionPath = resolvePackage(extensionName, root);
		const extensionManifest: ExtensionManifestRaw = await fse.readJSON(path.join(extensionPath, 'package.json'));

		if (!validateExtensionManifest(extensionManifest)) {
			throw new Error(`The extension manifest of "${extensionName}" is not valid.`);
		}

		const extensionOptions: ExtensionOptionsRaw = extensionManifest[EXTENSION_PKG_KEY];

		if (Array.isArray(extensionOptions)) {
			for (const options of extensionOptions) {
				extensions.push(
					...(await resolveExtensions(options, types, extensionPath, options.name ?? extensionName, extensionManifest))
				);
			}
		} else {
			extensions.push(
				...(await resolveExtensions(extensionOptions, types, extensionPath, extensionName, extensionManifest))
			);
		}
	}

	return extensions;
}

export async function getPackageExtensions(
	root: string,
	types: readonly ExtensionPackageType[]
): Promise<ExtensionPackage[]> {
	let pkg: { dependencies?: Record<string, string> };

	try {
		pkg = await fse.readJSON(path.resolve(root, 'package.json'));
	} catch {
		throw new Error('Current folder does not contain a package.json file');
	}

	const extensionNames = Object.keys(pkg.dependencies ?? {}).filter((dep) => EXTENSION_NAME_REGEX.test(dep));

	return resolvePackageExtensions(extensionNames, root, types);
}

export async function getLocalExtensions(root: string, types: readonly ExtensionType[]): Promise<ExtensionLocal[]> {
	const extensions: ExtensionLocal[] = [];

	for (const extensionType of types) {
		const typeDir = pluralize(extensionType);
		const typePath = path.resolve(root, typeDir);

		try {
			const extensionNames = await listFolders(typePath);

			for (const extensionName of extensionNames) {
				const extensionPath = path.join(typePath, extensionName);

				if (!isIn(extensionType, HYBRID_EXTENSION_TYPES)) {
					extensions.push({
						path: extensionPath,
						name: extensionName,
						type: extensionType,
						entrypoint: 'index.js',
						local: true,
					});
				} else {
					extensions.push({
						path: extensionPath,
						name: extensionName,
						type: extensionType,
						entrypoint: {
							app: 'app.js',
							api: 'api.js',
						},
						local: true,
					});
				}
			}
		} catch {
			throw new Error(`Extension folder "${typePath}" couldn't be opened`);
		}
	}

	return extensions;
}
