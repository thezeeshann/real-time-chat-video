import Joi from "joi";

const registerSchema = Joi.object({
  name: Joi.string().min(4).max(15).required(),
  email: Joi.string()
    .email({
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().min(6).max(12).required(),
});

export default registerSchema;
