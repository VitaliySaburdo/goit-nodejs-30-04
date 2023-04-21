const {checkUser, addUser} = require('../models/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const register = async(req, res, next) => {
  try {
    const {name, email, password} = req.body;
    const result = await checkUser(email);
    if (!result) {
      return res.status(409).json({message: 'Email in use'});
    }
    const hashPassword = bcrypt.hashSync(password, bcrypt.SaltSync(10));
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
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '1d'});
    res.json({token , user: {email: result.email, subscription: result.subscription}});
  } catch (error) {
    next(error);
  };
};

module.exports = {
  register,
  login
};