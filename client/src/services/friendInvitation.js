import axios from "axios";
import {
  FRIEND_INVITATION_ACCEPT_API,
  FRIEND_INVITATION_REJECT_API,
} from "../redux/api";
import toast from "react-hot-toast";

export const handleAcceptInvitations = async (invitationId, token) => {
  try {
    const response = await axios.post(
      `${FRIEND_INVITATION_ACCEPT_API}`,
      {
        id: invitationId,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response);
    if (response.data.success === true) {
      toast.success(response.data.message);
    } else {
      toast.error(response?.data.message);
    }
  } catch (error) {
    console.log("FRIEND INVITATION ACCEPT API ERROR", error);
    toast.error(error.response.data.message);
  }
};

export const handleRejectInvitations = async (invitationId, token) => {
  try {
    const response = await axios.post(
      `${FRIEND_INVITATION_REJECT_API}`,
      {
        id: invitationId,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response);
    if (response.data.success === true) {
      toast.success(response.data.message);
    } else {
      toast.error(response?.data.message);
    }
  } catch (error) {
    console.log("FRIEND INVITATION REJECT API ERROR", error);
    toast.error(error.response.data.message);
  }
};
