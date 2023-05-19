const admin = async (req, res, next) => {
  if (req.user.role != "admin") {
    return res.status(403).json({
      success: false,
      message: "access denied",
    });
  }

  next();
};

module.exports = admin;
