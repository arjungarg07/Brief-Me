const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// const {insertQuery,selectAll,deleteOne,select,updateQuery} = require("./db");
const connectDB = require('./config/db');
const router = require('./routes/index');

const app = express();
const port = 8000;

connectDB();

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.use(bodyParser.json());
app.use(cors());

app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});

app.use(router);


//  let query = {
//         hash : 'a325f4'
//   };

//   (async() =>{
//     const {originalUrl} = await select(query);
//     console.log(originalUrl);
//   })();

// selectAll();
// let query = { creationDate : new Date().toLocaleDateString};
// deleteOne(query)
