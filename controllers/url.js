const Url = require('../models/Url');
const User = require('../models/User');
const config = require('config');
const { generateHash } = require('../uniqueUrlCode');

async function shorten(req,res){	
	try{
		const baseURL = config.get('baseURL');
		console.log('incoming request');
		const { originalUrl } = req.body;
		let hash  = await generateHash(originalUrl);
		hash = hash.slice(0,6);
		// console.log(hash);
		let check ; //BUG yaha pr ye dhang se check nhi ho rha 
		await Url.findOne({hash: hash},(err,docs)=>{check = docs});
		console.log('yeh aa rha ',check);
		if(check){
			let priorResult = baseURL + hash;
			console.log('hash was present in the db hence not inserted again');
			res.status(200).json({
				success: true,
				message: priorResult
			});
		return;
		}
		const data = new Url({
				hash,
				originalURL:originalUrl,
				redirectCount:0,
				creationDate: new Date(),
				expirationDate: new Date(),   // BUG yaha req ki body mein se lelena
			});
		await data.save();
		// await Url.deleteMany({ redirectCount:'0'},(err,docs)=>{console.log('done')});z
		await Url.find({},(err,docs)=>{console.log(docs)});

		let result = baseURL+ hash;
		
		res.status(200).json({
			success: true,
			message: result
		});
	}catch(err){
		console.log(err);
		res.status(500).json({
			success: false,
			error: {
				message: "Internal server error"
			}
		});
	}
};

async function redirect(req,res){
	try{
		console.log('entered');
		const code = req.params.code;
		console.log(code);
		let check = {};
		await Url.findOne({hash: code},(err,docs)=>{check = docs});
		let {originalURL} = check;
		console.log('check',originalURL);
		if(originalURL){
			res.redirect(originalURL);
		}
	}catch(err){
		console.log(err);
		res.status(500).json({
			success : false,
			message: "Internal Server error"
		})
	}
};

module.exports ={shorten,redirect};




