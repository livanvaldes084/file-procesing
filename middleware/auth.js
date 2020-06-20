const config = require("config");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const auth = async (req, res, next) => {
  const token = req.header("x-auth-token");
  // Check for token
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    const user = decoded.id; // do not cache this query;
    if (user != process.env.USER_DEMO)
      return res
        .status(401)
        .json({ msg: "Authorization denied, the user no't exist" });
    next();
  } catch (e) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = auth;
