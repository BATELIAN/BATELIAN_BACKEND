import express from "express";
import authclient from "./client/client-auth.api";
import profile from "./client/profile.api";
import booking from "./client/book.client.api"
const router = express.Router();

router.use("/auth", authclient);
router.use("/profile", profile);
router.use("/book", booking)

export default router;
