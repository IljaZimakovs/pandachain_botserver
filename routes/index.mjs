import express from "express";
import {
  fetchUserInfo,
  updateConnectWallet,
  followTwitter
  // fetchFriendLists,
  // userSubscription,
  // fetchSubscriptionById,
  // inviteSubscription,
  // premiumSubscription,
  // fetchCurrentSubscriptoinById,
  // fetchAllUserInfo,
  // fetchAllSubscriptionInfo,
} from "../Controllers/UserController.mjs";
// import {
//   getLocation,
//   createLocation,
//   deleteLocation,
//   getWallet,
//   updateLocation,
//   updateWallet,
// } from "../Controllers/LocationController.mjs";

const router = express.Router();

// admin panel
// router.get("/get-all-users", fetchAllUserInfo);
// router.get("/get-all-subscriptions", fetchAllSubscriptionInfo);
// router.get("/get-location", getLocation);
// router.post("/create-location", createLocation);
// router.get("/delete-location/:id", deleteLocation);
// router.post("/update-location/:id", updateLocation);
// router.get("/get-wallet-address", getWallet);
// router.post("/update-wallet-address/:id", updateWallet);

// user panel
router.get("/get-user/:id", fetchUserInfo);
// router.get("/get-friends/:id", fetchFriendLists);
// router.post("/user-subscription", userSubscription);
// router.post("/invite-subscription", inviteSubscription);
// router.post("/premium-subscription", premiumSubscription);
// router.get("/get-subscription/:id", fetchSubscriptionById);
// router.get("/get-current-subscription/:id", fetchCurrentSubscriptoinById);

router.post("/connect-wallet", updateConnectWallet);
router.post("/follow_twitter", followTwitter);

export default router;
