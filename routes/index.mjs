import express from "express";
import {
  fetchUserInfo,
  updateConnectWallet,
  followTwitter,
  fetchFriendLists,
  verifyUsername,
  verifyAccount
} from "../Controllers/UserController.mjs";
import { clickNewPoint, fetchPointById } from "../Controllers/PointController.mjs";

const router = express.Router();

router.get("/get-user/:id", fetchUserInfo);
router.get("/get-friends/:id", fetchFriendLists)
router.post("/connect-wallet", updateConnectWallet);
router.post("/follow_twitter", followTwitter);
router.post("/verify-username", verifyUsername);
router.post("/verify-account", verifyAccount);
router.post('/click-point', clickNewPoint);
router.get('/get-point/:id', fetchPointById)

export default router;
