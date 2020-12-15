const Url = require('../models/Url');
const User = require('../models/User');
const config = require('config');
const redis = require('redis');

const { generateHash } = require('../utils');

const REDISPORT = process.env.REDISPORT || 6379;
const client = redis.createClient(REDISPORT);

const baseURL = config.get('baseURL');

async function shorten(req, res) {
	try {
		const { originalUrl } = req.body;
		const hash = generateHash(originalUrl);
		const results = await Url.findOne({ hash: hash }).exec();
		if (results) {
			const { hash: previousHash } = results;
			console.log('Hash was present in the db hence not inserted again');
			return res.json({
				data: baseURL + previousHash,
				success: true,
				message: 'Successfully generated short Url',
			});
		}
		const data = new Url({
			hash,
			originalURL: originalUrl,
			redirectCount: 0,
			creationDate: new Date(),
			expirationDate: new Date(),
		});
		await data.save();

		const result = baseURL + hash;
		res.status(200).json({
			data: result,
			success: true,
			message: 'Successfully generated short Url',
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			error: {
				message: 'Internal server error',
			},
		});
	}
}

async function redirect(req, res) {
	const { code } = req.params;
	if (!req.found) {
		try {
			const { originalURL } =
				(await Url.findOne({ hash: code }).exec()) || {};
			// console.log('check', originalURL);
			if (originalURL) {
				client.setex(code, 3600, originalURL);
				// res.redirect(originalURL);
			}
		} catch (err) {
			console.log(err);
			res.status(500).json({
				success: false,
				message: 'Internal Server error',
			});
		}
	}
	let URL = await Url.findOne({ hash: code });
	URL.redirectCount = URL.redirectCount + 1;
	URL.save();
	res.redirect(URL.originalURL);
}

module.exports = { shorten, redirect };
