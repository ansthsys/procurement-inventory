const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const app = express();
const forms = multer();

const authRouter = require("./routes/auth");

app.use(forms.array());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(authRouter);

module.exports = app;
