var md5 = require('md5');

const generateHash = (url)=>{
	return new Promise((resolve, reject) => {
		const hash = md5(url);
		// console.log(hash);
		resolve(hash);
	});
};

module.exports = {
    generateHash
};