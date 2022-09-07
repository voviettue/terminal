const glob = require('glob');
const { copyFileSync, mkdirSync } = require('fs');

const migrationFolder = './node_modules/@giga-extensions/**/src/migrations/*.js';
glob(migrationFolder, null, async function (er, files) {
	if (files.length === 0) return;

	await mkdirSync('./extensions/migrations', { recursive: true });

	for (let file of files) {
		const fileName = file.split('/').pop();
		await copyFileSync(file, `./extensions/migrations/${fileName}`);
	}
});
