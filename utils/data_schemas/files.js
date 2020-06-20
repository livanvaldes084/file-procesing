const Joi = require("@hapi/joi");
const FindAllDataSchema = Joi.object({
  humanreadable: Joi.boolean().optional().default(false),
});
module.exports = FindAllDataSchema;
