const { exec } = require('child_process');
const path = require('path');

const paths = [
	'./waifu-index.js',
];

paths.forEach(file => {
	exec(`node "${path.join(__dirname, file)}"`, (err, stdout) => {
		console.log(stdout);
		if (err) console.log(err);
	});
});