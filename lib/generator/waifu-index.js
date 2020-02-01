const globby = require('globby');
const fs = require('fs');

process.chdir('./src');
const pathToIndex = './assets/images/waifu/indexes.json';
globby([ './assets/images/waifu/*.jpg' ]).then(files => {

	const indexes = JSON.stringify(files.map(f => f.slice(1)), null, 2);

	fs.writeFile(pathToIndex, indexes, (err) => {
		if (!err) return;
		console.log("Waifu Index, Error writing to ", outPath);
		console.log(err);
	});
});
