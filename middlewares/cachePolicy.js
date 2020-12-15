const redis = require('redis');

const REDISPORT = process.env.REDISPORT || 6379;
const client = redis.createClient(REDISPORT);

function cache(req, res, next) {
	const { code } = req.params;

	client.get(code, (err, data) => {
		if (err) throw err;

		if (data !== null) {
			console.log('Cache redirect', data);
			req.found = true;
			next();
			// res.redirect(data);
		} else {
			next();
		}
	});
}

module.exports = cache;
