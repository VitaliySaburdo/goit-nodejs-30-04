const Joi = require('joi');

function validateData(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });
  const validationResult = schema.validate(req.body)
  if (validationResult.error) {
    return res.status(400).json({message: `missing required ${validationResult.error.details[0].path} field`})
  }
  next();
}

module.exports = validateData;