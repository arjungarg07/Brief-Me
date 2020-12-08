const mongoose = require('mongoose');
const urlSchema = new mongoose.Schema({
    hash: String,
    originalURL: String,
    redirectCount: Number,
	creationDate: { type: Date},
	expirationDate:{ type: Date},
	userID: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
	},
});

module.exports = mongoose.model('Url', urlSchema);