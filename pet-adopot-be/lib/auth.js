const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
function sign(data) {
  return jwt.sign(data, secretKey, { expiresIn: 3600 });
}
exports.sign = sign;
