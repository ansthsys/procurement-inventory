const jwt = require("jsonwebtoken");
const { access_tokens } = require("../models");

const auth = async (req, res, next) => {
  const authorization = req.headers?.authorization?.split(" ");

  if (!authorization) {
    return res.status(400).json({
      success: false,
      message: "no token authorization",
    });
  }

  const data = await access_tokens.findOne({
    where: { token: authorization[1] },
  });

  if (!data) {
    return res.status(401).json({
      success: false,
      message: "invalid token",
    });
  }

  jwt.verify(data.token, process.env.JWT_KEY, async (err, { user }) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "token expired",
      });
    }

    req.user = user;
    req.token = data.token;
    next();
  });
};

module.exports = auth;
