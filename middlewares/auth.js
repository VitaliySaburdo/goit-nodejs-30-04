const jwt = require('jsonwebtoken');
const {checkUser} = require('../models/auth');

const {SECRET_KEY} = process.env;

const auth = async(req, res, next) => {
  const {authorization = ''} = req.headers;
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    return res.status(401).json({
      message: "Not authorized"
    });
  };
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log('dId', decoded.id)

    const user = await checkUser({_id: decoded.id});
    console.log(user);

    if (!user || !user.token) {
      return res.status(401).json({
        message: "Not authorized"
      });
    }
    req.user = decoded;
    console.log('next')
  } catch (error) {
    console.log('err', error)
    next(error);
  };
  next();
};

module.exports = auth;