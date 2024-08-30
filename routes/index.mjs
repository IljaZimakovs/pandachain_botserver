import express from "express";
import {
  fetchUserInfo,
  updateConnectWallet,
  followTwitter
} from "../Controllers/UserController.mjs";

const router = express.Router();

router.get("/get-user/:id", fetchUserInfo);
router.post("/connect-wallet", updateConnectWallet);
router.post("/follow_twitter", followTwitter);

export default router;
