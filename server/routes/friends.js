import express from "express";
import { verifyJwt } from "../lib/middleware/auth.js";
import { sendFriendInvitation } from "../controllers/friend-invitation.js";

const router = express.Router();

router.post("/invitation", verifyJwt, sendFriendInvitation);

export default router;
