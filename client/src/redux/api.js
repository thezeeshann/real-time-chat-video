const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const SIGNUP_API = BASE_URL + "auth/register";
export const SIGNIN_API = BASE_URL + "auth/login";
export const FRIEND_INVITATION_API = BASE_URL + "friend/invitation";
export const FRIEND_INVITATION_ACCEPT_API = BASE_URL + "friend/accept";
export const FRIEND_INVITATION_REJECT_API = BASE_URL + "friend/reject";
