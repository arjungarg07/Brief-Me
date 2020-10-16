const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const {insertQuery,selectAll,deleteOne,select,updateQuery} = require("./db");

const app = express();
const port = 8000;

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.use(bodyParser.json());
app.use(cors());
app.use('/',require("./routes"));
app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});


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
