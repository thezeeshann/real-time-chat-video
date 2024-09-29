import friendInvitationSchema from "../lib/validations/friend.js";
import friendInvitationDecisionSchema from "../lib/validations/friendInvitations.js";
import FriendModel from "../models/friend.js";
import UserModel from "../models/user.js";
import friendsPendingInvitations from "../socketHandler/updates/friends.js";

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

    friendsPendingInvitations(targetUser._id.toString());

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

export const acceptFriendInvitation = async (req, res) => {
  try {
    const body = await friendInvitationDecisionSchema.validate(req.body);
    const { id } = body;

    const invitation = await FriendModel.findById(id);
    if (invitation) {
      return res.status(401).json({
        success: false,
        message: "Something went wrong. please try again",
      });
    }

    const { receiverId, senderId } = invitation;

    // add friends to both users
    const senderUser = await UserModel.findById(senderId);
    senderUser.friends = [...senderUser.friends, receiverId];

    const receiverUser = await UserModel.findById(receiverId);
    receiverUser.friends = [...receiverUser.friends, senderId];

    await senderUser.save();
    await receiverUser.save();

    // delete invitations
    await FriendModel.findOneAndDelete(id);

    // update list of friends pending invitations
    friendsPendingInvitations(receiverId);

    return res.status(201).json({
      success: true,
      message: "Friend Successfully added",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const rejectFriendInvitation = async (req, res) => {
  try {
    const body = await friendInvitationDecisionSchema.validate(req.body);
    const { id } = body.value;
    const { userId } = req.existUser;
    const existInvitation = await FriendModel.findById(id);

    if (!existInvitation) {
      return res.status(404).json({
        success: false,
        message: "Invitation not found",
      });
    }

    await FriendModel.findByIdAndDelete(id);
    friendsPendingInvitations(userId);

    return res.status(201).json({
      success: true,
      message: "Invitation has been rejected",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
