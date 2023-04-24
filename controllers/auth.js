const {checkUser, addUser} = require('../models/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {SECRET_KEY} = process.env;


const register = async(req, res, next) => {
  try {
    const {name, email, password} = req.body;
    const result = await checkUser(email);
    // console.log('result', result);
    // console.log('result', Boolean(result));
    if (result) {
      return res.status(409).json({message: 'Email in use'});
    }
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const newUser = await addUser({name, email, password: hashPassword});
    res.status(201).json({user: {email: newUser.email, subscription: newUser.subscription}});
  } catch (error) {
    next(error);
  }
};

const login = async(req, res, next) => {
  try {
    const {email, password} = req.body;
    const result = await checkUser(email);
    if (!result) {
      return res.status(401).json({message: 'Email or password is wrong'});
    };
    const passCompare = bcrypt.compareSync(password, result.password);
    if (!passCompare) {
      return res.status(401).json({message: 'Email or password is wrong'});
    };
    const payload = {id: result._id, name: result.name};
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '1d'});
    res.json({token , user: {email: result.email, subscription: result.subscription}});
  } catch (error) {
    next(error);
  };
};

const logout = async(req, res, next) => {
  try {
    const result = checkUser(req.user.id);
    if (!result) {
      res.status(401).json({
        message: "Not authorized"
      });
    };
    req.user = null;
    res.status(204);
  } catch (error) {
    
  }
}

module.exports = {
  register,
  login,
  logout
};