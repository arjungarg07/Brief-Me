const mongoose = require('mongoose');
const { Schema } = mongoose;

const urlSchema = new Schema({
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