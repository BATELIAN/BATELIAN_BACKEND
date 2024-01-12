import express from "express";
import {
    createBasic,
    createCertfication,
    createEducation,
    createExpierence,
    createPortfolio,
    createSkills,
    getProfiles,
    showProfile,
    myProfile,
    updateEducation,
    updatecertfication,
    updateportfolio,
    addImage,
    addCertImage,
    addPortImage,
    deleteImage,
    deleteeduImage,
    deleteportImage,
    deleteEdu,
    deleteCert,
    deletePort,
    updateExpierence,
    deleteExpierence,
    addprofileImage,
    addinterest, 
    updateInterest, 
    deleteSkill,
    showInerest, 
    deleteInterest,
    verified
} from "../../controller/profile/index.profile.controller";
import { AdminauthJWT, ClientauthJWT, CAauthJWT } from "../../middleware/authJWT";

import { upload } from "../../config/mutler";
import { Unverified } from "../../controller/profile/update/update.status.controller";
const router = express.Router();

//CREATE API FOR CLIENT PROFILE BUILDING
router.post("/create-basic", ClientauthJWT, upload.array("files", 10), createBasic);
router.post("/create-cert", ClientauthJWT, upload.array("files", 10), createCertfication);
router.post("/create-edu", ClientauthJWT, upload.array("files", 10), createEducation);
router.post("/create-exp", ClientauthJWT, createExpierence);
router.post("/create-port", ClientauthJWT, upload.array("files", 10), createPortfolio);
router.post("/create-skill", ClientauthJWT, createSkills);
router.post("/create-interest", ClientauthJWT, addinterest)
router.post("/verify/:id", AdminauthJWT, verified)
router.post("/invalidate/:id", AdminauthJWT, Unverified)

//UPDATE API FOR CLIENT PROFILE BUILDING
router.post("/update-edu/:id", ClientauthJWT, updateEducation);
router.post("/update-cert/:id", ClientauthJWT, updatecertfication);
router.post("/update-port/:id", ClientauthJWT, updateportfolio);
router.post("/update-exp/:id", ClientauthJWT, updateExpierence);
router.post("/update-interest/:id", ClientauthJWT, updateInterest);

//ADD IMAGE API FOR CLIENT PROFILE BUILDING
router.post("/add-profile", ClientauthJWT, upload.array("files", 10), addprofileImage);
router.post("/add-eduimage/:id", ClientauthJWT, upload.array("files", 10), addImage);
router.post("/add-portimage/:id", ClientauthJWT, upload.array("files", 10), addPortImage);
router.post("/add-certimage/:id", ClientauthJWT, upload.array("files", 10), addCertImage);


//DELETE IMAGE API FOR CLIENT PROFILE BUILDING
router.delete("/delete-eduimage/:eduId/:id", ClientauthJWT, deleteeduImage);
router.delete("/delete-portimage/:portId/:id", ClientauthJWT, deleteportImage);
router.delete("/delete-certimage/:certId/:id", ClientauthJWT, deleteImage);


//DELETE API FOR CLIENT PROFILE BUILDING 
router.delete("/delete-edu/:id", ClientauthJWT, deleteEdu);
router.delete("/delete-cert/:id", ClientauthJWT, deleteCert);
router.delete("/delete-port/:id", ClientauthJWT, deletePort);
router.delete("/delete-exp/:id", ClientauthJWT, deleteExpierence);
router.delete("/delete-skill/:id", ClientauthJWT, deleteSkill);

router.delete("/delete-interest/:id", ClientauthJWT, deleteInterest);


// GET API FOR CLIENT PROFILE
router.get("/get",  getProfiles);
router.get("/show/:id", ClientauthJWT, showProfile);
router.get("/my", ClientauthJWT, myProfile);

export default router;
