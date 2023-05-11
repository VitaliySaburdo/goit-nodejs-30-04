const Joi = require('joi');

function validateUserRegister(req, res, next) {
  console.log('val', req.body);
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  const validationResult = schema.validate(req.body)
  if (validationResult.error) {
    return res.status(400).json({message: `missing required ${validationResult.error.details[0].path} field`})
  };
  next();
};

function validateUserLogin(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const validationResult = schema.validate(req.body)
  if (validationResult.error) {
    return res.status(400).json({message: `missing required ${validationResult.error.details[0].path} field`})
  };
  next();
};

// function validateUserSub(req, res, next) {
//   const schema = Joi.object({
//     subscription: Joi.string().email().required(),
//     password: Joi.string().required(),
//   });
//   const validationResult = schema.validate(req.body)
//   if (validationResult.error) {
//     return res.status(400).json({message: `missing required ${validationResult.error.details[0].path} field`})
//   };
//   next();
// };

module.exports = {
  validateUserRegister,
  validateUserLogin
};