import express from "express";
import { verifyJwt } from "../lib/middleware/auth.js";
import {
  sendFriendInvitation,
  acceptFriendInvitation,
  rejectFriendInvitation,
} from "../controllers/friend-invitation.js";

const router = express.Router();

router.post("/invitation", verifyJwt, sendFriendInvitation);
router.post("/accept", verifyJwt, acceptFriendInvitation);
router.post("/reject", verifyJwt, rejectFriendInvitation);

export default router;
