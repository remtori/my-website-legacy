const { exec } = require('child_process');

function execute(script) {
	return new Promise((resolve, reject) => {
		exec(script, (err, stdout, stderr) => {
			if (err) return reject(new Error(err));
			resolve(stdout + (stderr || ''));
		});
	});
}

module.exports.execute = execute;
