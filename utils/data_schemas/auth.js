const Joi = require("@hapi/joi");
const LoginDataSchema = Joi.object({
  user: Joi.string().required(),
  password: Joi.string().required(),
});
module.exports = LoginDataSchema;
