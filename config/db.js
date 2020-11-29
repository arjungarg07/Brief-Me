const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
console.log(db);
// dbname - test
const connectDB = async () => {
	try {
	  await mongoose.connect(db, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false, 
	  });
	  console.log('MongoDB Connected!');
	} catch (err) {
	  console.error(err);
	}
  };
  
  module.exports = connectDB;