const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const app = express();
const forms = multer();

const authRouter = require("./routes/auth");
const adminRoute = require("./routes/admin");
const memberRoute = require("./routes/member");

app.use(forms.array());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(authRouter);
app.use(adminRoute);
app.use(memberRoute);

module.exports = app;
