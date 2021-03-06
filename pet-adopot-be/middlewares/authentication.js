const jwt = require("jsonwebtoken");

const authenticate = () => {
  const secretKey = process.env.SECRET_KEY;
  //console.log("authruned");
  return (req, res, next) => {
    try {
      const token = req.headers.authorization.replace("Bearer ", "");
      const decoded = jwt.verify(token, secretKey);
      req.decoded = decoded;
      next();
    } catch (error) {
      console.log("not ok");
      console.log(error);
      res.status(401).send({ message: "Failed to authenticate", error });
    }
  };
};
module.exports = authenticate;
