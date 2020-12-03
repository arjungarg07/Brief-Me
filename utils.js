const md5 = require('md5');

const generateHash = url => md5(url).slice(0,6);

module.exports = {
    generateHash
};