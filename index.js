const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const logger = require("watch-api");
const passport = require("passport");
const passportSetup = require("./config/passport-setup");
const cookieSession = require("cookie-session");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const router = require("./routes/index");

const app = express();
const PORT = 8000;

dotenv.config();
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

app.use(router);

app.listen(PORT, () => {
  console.log(`Server Listening on ${PORT}`);
});
