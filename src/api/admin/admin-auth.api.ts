import express from "express";
import {
  register,
  getUsers,
  getuser,
  login,
  resetPasswordHandler,
  changePassword,
  forgetPassword,
  DeleteUser
} from "../../controller/auth/Admin/index.auth.controller";

import { AdminauthJWT } from "../../middleware/authJWT";
import { forgotPassword } from "../../controller/auth/Client/forget.auth.controller";
const router = express.Router();

router.post("/create", AdminauthJWT, register);
router.get("/get", AdminauthJWT, getUsers);
router.get("/show/:id", AdminauthJWT, getuser);
router.post("/login", login);
router.post("/change", AdminauthJWT, changePassword);
router.delete("/delete/:id", AdminauthJWT, DeleteUser);
router.post("/forgotPassword", forgetPassword)
router.post("/resetPassword", resetPasswordHandler)
export default router;



 
