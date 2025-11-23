const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

console.log("secret key", process.env.JWTSECRETKEY);

const auth = (req, res, next) => {
  const header = req.headers["authorization"];
  if (!header) return res.status(401).json({ message: "Token missing" });

  const token = header.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRETKEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token invalid or expired" });
  }
};


module.exports = auth;