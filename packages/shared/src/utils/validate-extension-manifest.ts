import {
	EXTENSION_PACKAGE_TYPES,
	EXTENSION_PKG_KEY,
	HYBRID_EXTENSION_TYPES,
	PACKAGE_EXTENSION_TYPES,
} from '../constants';
import { ExtensionManifest, ExtensionManifestRaw, ExtensionOptionsRaw } from '../types';
import { isIn } from './array-helpers';

export function validateExtensionOptions(extensionOptions: ExtensionOptionsRaw) {
	if (!extensionOptions.type) {
		return false;
	}

	if (!isIn(extensionOptions.type, EXTENSION_PACKAGE_TYPES)) {
		return false;
	}

	if (isIn(extensionOptions.type, PACKAGE_EXTENSION_TYPES)) {
		if (!extensionOptions.host) {
			return false;
		}
	} else if (isIn(extensionOptions.type, HYBRID_EXTENSION_TYPES)) {
		if (
			!extensionOptions.path ||
			!extensionOptions.source ||
			typeof extensionOptions.path === 'string' ||
			typeof extensionOptions.source === 'string' ||
			!extensionOptions.path.app ||
			!extensionOptions.path.api ||
			!extensionOptions.source.app ||
			!extensionOptions.source.api ||
			!extensionOptions.host
		) {
			return false;
		}
	} else {
		if (!extensionOptions.path || !extensionOptions.source || !extensionOptions.host) {
			return false;
		}
	}

	return true;
}

export function validateExtensionManifest(
	extensionManifest: ExtensionManifestRaw
): extensionManifest is ExtensionManifest {
	if (!extensionManifest.name || !extensionManifest.version) {
		return false;
	}

	const extensionOptions = extensionManifest[EXTENSION_PKG_KEY];

	if (!extensionOptions) {
		return false;
	}

	if (Array.isArray(extensionOptions)) {
		for (const options of extensionOptions) {
			const isValid = validateExtensionOptions(options);

			if (isValid === false) {
				return false;
			}
		}

		return true;
	}

	return validateExtensionOptions(extensionOptions);
}
