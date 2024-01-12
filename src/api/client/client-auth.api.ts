import express from "express";
import {
  registerUser,
  getUsers,
  getuser,
  login, 
  forgotPassword,
  changePassword, 
  resetPasswordHandler, 
  activateUser
} from "../../controller/auth/Client/index.auth.controller";

import { ClientauthJWT,  AdminauthJWT, CAauthJWT } from "../../middleware/authJWT";
const router = express.Router();

router.post("/register", registerUser);
router.get("/get",  AdminauthJWT, getUsers);
router.get("/show/:id",  CAauthJWT, getuser);
router.post("/login", login);
router.post("/change",  ClientauthJWT, changePassword);
router.post("/forgotPassword", forgotPassword)
router.post("/resetPassword", resetPasswordHandler)
router.post("/activate", activateUser);

export default router;