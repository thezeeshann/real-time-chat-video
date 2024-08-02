import Joi from "joi";

const friendInvitationSchema = Joi.object({
  email: Joi.string()
    .email({
      tlds: { allow: ["com"] },
    })
    .required(),
});

export default friendInvitationSchema;
