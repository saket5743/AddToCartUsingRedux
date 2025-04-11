import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  userGet,
  userById
} from "../controller/user.controller.js";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/allUsers").get(userGet);
router.route("/userById/:id").get(userById);

export default router;
