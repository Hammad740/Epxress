require('dotenv').config();
const jwt = require('jsonwebtoken');

const authUserMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  const decodedToken = jwt.verify(token, process.env.JWT_USER);

  if (decodedToken) {
    req.userId = decodedToken.id;
    return next();
  }
  return res.json({
    success: false,
    message: 'Invalid Token',
  });
};

module.exports = { authUserMiddleware };
