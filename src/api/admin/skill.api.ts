import express from "express";
import {
 create,
 getSkill,
 getSkills, 
 deleteSkill 
} from "../../controller/skill/index.skill.controller";
import { AdminauthJWT } from "../../middleware/authJWT";
import { upload } from "../../config/mutler";

const router = express.Router();

router.post("/create",  AdminauthJWT, upload.array("files", 10), create);
router.get("/get",  getSkills);
router.get("/show/:id",  getSkill);
router.delete("/delete/:id", AdminauthJWT,  deleteSkill);

export default router;


