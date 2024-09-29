import Joi from "joi";

const friendInvitationDecisionSchema = Joi.object({
  id: Joi.string().required(),
  
});

export default friendInvitationDecisionSchema;
