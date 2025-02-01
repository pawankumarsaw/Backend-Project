import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  accessRefreshToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateAvatar,
  updateCoverImage,
  getUserChannelProfile,
  getWatchHistory,
} from "../controllers/user.controllers.js";
import { upload } from "../middleweres/multer.middlewere.js";
import { verifyJwt } from "../middleweres/auth.middlewere.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

// secured routs
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/refresh-token").post(accessRefreshToken);
router.route("/change-password").post(verifyJwt, changeCurrentPassword);
router.route("/current-user").get(verifyJwt, getCurrentUser);
router.route("/update-account").patch(verifyJwt, updateAccountDetails);
router.route("/avatar").patch(verifyJwt, upload.single("avatar"), updateAvatar);
router.route("/cover-image").patch(verifyJwt,upload.single("coverImage"),updateCoverImage);
router.route("/c/:username").get(verifyJwt,getUserChannelProfile);
router.route("/history").get(verifyJwt,getWatchHistory)

export default router;
