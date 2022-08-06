import Joi from "joi";

const Schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
  basket: Joi.string(),
});

export default Schema;
