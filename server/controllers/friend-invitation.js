import friendInvitationSchema from "../lib/validations/friend.js";
import FriendModel from "../models/friend.js";
import UserModel from "../models/user.js";

export const sendFriendInvitation = async (req, res) => {
  try {
    const { userId, userEmail } = req.existUser;
    const body = await friendInvitationSchema.validateAsync(req.body);
    const { email } = body;

    if (userEmail.toLowerCase() === email.toLowerCase()) {
      return res.status(404).json({
        success: false,
        message: "You cannot become friend with yourself",
      });
    }

    const targetUser = await UserModel.findOne({
      email: email.toLowerCase(),
    });

    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: `Friend of ${email} has been not found. check you email address`,
      });
    }

    const invitationAlredySend = await FriendModel.findOne({
      senderId: userId,
      receiverId: targetUser._id,
    });

    if (invitationAlredySend) {
      return res.status(409).json({
        success: false,
        message: `Invitation alredy has been send`,
      });
    }

    const userAlredyFriend = await targetUser.friends.find(
      (friendId) => friendId.toString() === userId.toString()
    );

    if (userAlredyFriend) {
      return res.status(409).json({
        success: false,
        message: `Friend alredy added `,
      });
    }

    const newInvitation = await FriendModel.create({
      senderId: userId,
      receiverId: targetUser._id,
    });

    return res.status(201).json({
      success: true,
      message: "Invitation has been send",
      newInvitation,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
