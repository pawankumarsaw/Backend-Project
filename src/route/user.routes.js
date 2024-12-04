import { Router } from "express";
import {loginUser,logoutUser,registerUser,accessRefreshToken} from "../controllers/user.controllers.js";
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
router.route("/refresh-token").post(accessRefreshToken)

export default router;
