var md5 = require('md5');

const generateHash = async(url)=> {
    const hash = await md5(url);
    // console.log(hash)
    return hash;
};

module.exports = {
    generateHash
};