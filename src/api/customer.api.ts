import express from "express";
// import authtalent from "./customer/talent-auth.api";
import profile from "./customer/profile.api"
const router = express.Router();

router.use("/profile", profile);

export default router;
