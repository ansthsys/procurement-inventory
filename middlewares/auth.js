const jwt = require("jsonwebtoken");
const { User } = require("../models");

const auth = async (req, res, next) => {
  const authorization = req.headers?.authorization?.split(" ");

  if (!authorization) {
    return res.status(400).json({
      success: false,
      message: "no token authorization",
    });
  }

  jwt.verify(authorization[1], process.env.JWT_KEY, async (err, data) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "invalid credentials",
      });
    }

    const user = await User.findOne({
      where: {
        id: data.id,
      },
    });

    req.user = user;
    next();
  });
};

module.exports = auth;
