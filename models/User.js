const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
	userID: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
	},
	name: String,
	email: String,
	creationDate: {type: Date},
	lastLogin: {type: Date},
});

module.exports = mongoose.model('User',userSchema);