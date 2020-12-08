const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
console.log(db);
// dbname - test
const connectDB = async () => {
// here i have used then and catch statement instead of try catch 
	  await mongoose.connect(db, {
		useNewUrlParser: true,
		 useUnifiedTopology: true,
		 useCreateIndex:true
		}).then(()=>{
			console.log("DB IS CONNECTED sucessfully");
		}).catch(()=>{
			console.log("DB connection failed");
		})
}
  
  module.exports = connectDB;