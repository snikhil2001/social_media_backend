const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(404).send({ message: "token is required" });
  }

  try {
    const decoded = jwt.verify(token, "secretPassword");

    if (!decoded) {
      return res.status(403).send({ message: "not authorized" });
    }

    const userId = decoded._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(403).send({ message: "user not authenticated" });
    }

    req.userId = userId;
    next();
  } catch (error) {
    return res.status(401).send({ error: error.message });
  }
};

module.exports = authMiddleware;
