const jwt = require('jsonwebtoken');

const {SECRET_KEY} = process.env;

const auth = async(req, res, next) => {
  const {authorization = ''} = req.headers;
  // console.log('authorization', authorization);

  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    res.status(401).json({
      message: "Not authorized"
    });
  };
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    console.log('id', req.user.id);
  } catch (error) {
    res.status(401).json({
      message: "Not authorized"
    });
  }
  next();
};

module.exports = auth;