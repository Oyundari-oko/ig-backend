const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  if (!token) res.json({ message: "no token in header" });
  console.log(token);

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.json({ message: "invalid token" });
  }
};
module.exports = authMiddleware;
