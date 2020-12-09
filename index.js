const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const cors = require("cors");
const path = require("path");
const logger = require('watch-api')
const connectDB = require('./config/db');
const router = require('./routes/index');
require('dotenv').config()

const userRouter= require('./routes/user');
const PORT = 8000;

connectDB();

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.use(logger);
app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors());
app.use(router);
app.use(userRouter);

app.use('/', express.static(path.join(__dirname, 'public')));



app.listen(PORT, () => {
  console.log(`Server Listening on ${PORT}`);
});


