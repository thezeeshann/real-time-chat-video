import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string()
    .email({
      tlds: { allow: ["com"] },
    })
    .required(),

  password: Joi.string().min(6).max(12).required(),
});

export default loginSchema;
