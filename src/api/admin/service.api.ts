import express from "express";
import {
  create,
   getService, 
   getServices, 
   deleteservice,
   update,
   addImage, 
   deleteImage
} from "../../controller/service/index.service.controller";
import { AdminauthJWT } from "../../middleware/authJWT";
import { upload } from "../../config/mutler";
const router = express.Router();

router.post("/create", AdminauthJWT,  upload.array("files", 10), create);
router.post("/add-image/:id", AdminauthJWT, upload.array("files", 10), addImage);
router.get("/get", getServices);
router.get("/show/:id", getService);
router.put("/update/:id",  AdminauthJWT, update);
router.delete("/delete/:id", AdminauthJWT, deleteservice);
router.delete("/delete-image/:serviceId/:id", AdminauthJWT, deleteImage);


// router.delete("/delete", deleteEmployee);

export default router;
