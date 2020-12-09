const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const logger = require('watch-api')

const connectDB = require('./config/db');
const router = require('./routes/index');

const authRoutes=require("./routes/auth")

const app = express();
const PORT = 8000;

require('dotenv').config();

connectDB();

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.use(logger);
app.use(bodyParser.json());
app.use(cors());

app.use('/', express.static(path.join(__dirname, 'public')));


//routes

app.use(router);
app.use(authRoutes)



app.listen(PORT, () => {
  console.log(`Server Listening on ${PORT}`);
});


