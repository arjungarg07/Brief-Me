var MongoClient = require("mongodb").MongoClient
// mongoose.connect('mongodb://localhost:27017/', {useNewUrlParser: true, useUnifiedTopology: true});
var url = "mongodb://localhost:27017/"

const insertQuery = (input)=>{
    MongoClient.connect(url, function(err, db) {
      if (err) throw err
      var dbo = db.db("mydb")
      dbo.collection("url").insertOne(input,function(err, result) {
        if (err) throw err
        console.log(`Row inserted`);
        let {expiry} = input;
        const expiryTime = 5;
        // const expiryTime = expiry * 24 * 60 * 60;
        dbo.collection("url").createIndex( { "expiredAt": 1 }, { expireAfterSeconds: 0 } )
        db.close()
      });
    });
};

const select = (query) => new Promise((resolve,reject)=>{
  MongoClient.connect(url, function(err, db) {
    if (err) reject(err);
    db.db("mydb").collection("url").findOne(query, function(err, result) {
      if (err) reject(err);
      db.close();
      resolve(result);
    });
  });
});

  const updateQuery = (query,countValue) =>new Promise((resolve,reject)=>{
    MongoClient.connect(url, function(err, db) {
      if (err) reject(err);
      var dbo = db.db("mydb");
      var myquery = query;
      var newvalues = countValue;
      dbo.collection("url").updateOne(myquery, newvalues, function(err, res) {
        if (err) reject(err);
        console.log("1 document updated");
        db.close();
        resolve(res);
      });
    });
  });
  
const selectAll = ()=>{
  MongoClient.connect(url, function(err, db) {
    if (err) throw err
    var dbo = db.db("mydb")
    dbo.collection("url").find({}).toArray(function(err, result) {
      if (err) throw err
      console.log(result)
      db.close()
    })
  })
} 

const deleteOne =  (query)=>{
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myquery =query;
    dbo.collection("url").deleteMany(myquery, function(err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      db.close();
    });
  });
}


  module.exports = {
    insertQuery,
    selectAll,
    deleteOne,
    select,
    updateQuery
  }