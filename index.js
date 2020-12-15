const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
<<<<<<< HEAD
const logger = require("watch-api");
const passport = require("passport");
const passportSetup = require("./config/passport-setup");
const cookieSession = require("cookie-session");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const router = require("./routes/index");
=======
const logger = require('watch-api')
const connectDB = require('./config/db');
const router = require('./routes/index');
const dontenv=require("dotenv");
>>>>>>> 2b2d7ef6ae4d5222457c00e1d4b36ab69e632a2b

const app = express();
const PORT = 8000;

<<<<<<< HEAD
dotenv.config();
=======
dontenv.config();

>>>>>>> 2b2d7ef6ae4d5222457c00e1d4b36ab69e632a2b
connectDB();

// set up session cookies
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: process.env.cookieKey,
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.use(logger);
app.use(bodyParser.json());
app.use(cors());

app.use("/", express.static(path.join(__dirname, "public")));


//routes

app.use(router);




app.listen(PORT, () => {
  console.log(`Server Listening on ${PORT}`);
});
