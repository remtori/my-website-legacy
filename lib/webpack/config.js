const path = require('path');

module.exports = {
	rootDir: path.join(__dirname, '../../'),
	dev: process.env.NODE_ENV !== 'production',
};
