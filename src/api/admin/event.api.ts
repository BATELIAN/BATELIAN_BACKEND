import express from "express";
import {
  create,
  update,
  addImage,
  deleteImage,
  getevents,
  showevents,
  deleteevent,
} from "../../controller/event/index.event.controller";
import { AdminauthJWT } from "../../middleware/authJWT";

import { upload } from "../../config/mutler";
const router = express.Router();

router.post("/create", AdminauthJWT, upload.array("files", 10), create);
router.post("/add-image/:id", AdminauthJWT, upload.array("files", 10), addImage);
router.delete("/delete-image/:eventId/:id", AdminauthJWT, deleteImage);

router.get("/get", getevents);
router.get("/show/:id", showevents);
router.put("/update/:id", AdminauthJWT, update);
router.delete("/delete/:id", AdminauthJWT, deleteevent);
// router.delete("/delete-image/:eventId/:id", deleteImage);


// router.delete("/delete", deleteEmployee);

export default router;
