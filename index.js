const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
// const static =  express.static();
const {
  insertQuery,
  selectAll,
  deleteOne,
  select,
  updateQuery,
} = require("./db");
const { generateHash } = require("./uniqueUrlCode");

const app = express();
const port = 8000;

// app.use('/static', express.static(path.join(__dirname, 'public')));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
  //__dirname : It will resolve to your project folder.
});

app.use(bodyParser.json());
app.use(cors());
// app.use(express.static('public'))

app.post("/url", async (req, res) => {
  const { originalUrl, expiry } = req.body;
  const checkForUrl = await select({ originalUrl }).catch((err) => err);
  // console.log(checkForUrl);
  if (checkForUrl) {
    const { hash } = checkForUrl;
    let hashedUrl = `http://localhost:8000/${hash}`;
    res.send(hashedUrl);
  } else {
    const hashValue = (await generateHash(originalUrl)).slice(0, 6);
    // console.log(hashValue);

    let data = {
      hash: hashValue.slice(0, 6),
      originalUrl: originalUrl,
      expireAt: new Date("July 22, 2013 14:00:00"),
      expiryDays: expiry,
      count: 0,
    };
    insertQuery(data);

    let hashedUrl = `http://localhost:8000/${hashValue}`;
    res.send(hashedUrl);
  }
});

app.get("/:hash", async (req, res) => {
  const { hash } = req.params;
  const query = {
    hash,
  };
  try {
    const starttime = Date.now();
    const { originalUrl } = await select(query);
    // console.log('hello');
    const countQuery = {
      hash,
    };
    let countValue = { $inc: { count: 1 } };
    await updateQuery(countQuery, countValue).catch(err=>err);
    // console.log('hello adafc');
    console.log("time taken for query ", (Date.now() - starttime) / 1000);
    res.redirect(originalUrl);
  }
  catch (error) {
    console.log('error aaya');
  }
});

//  let query = {
//         hash : 'a49a10'
//   };
// select(query);
// selectAll();
// TODO: keep a count clicked on a link, check  for valid url
// let query = { creationDate : new Date().toLocaleDateString};
// deleteOne(query)

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
