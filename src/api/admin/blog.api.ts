import express from "express";
import {
  create,
  update,
  addImage,
  deleteImage,
  getBlogs,
  showBlogs,
  deleteblog,
} from "../../controller/blog/index.blog.controller";
import { AdminauthJWT } from "../../middleware/authJWT";

import { upload } from "../../config/mutler";
const router = express.Router();

router.post("/create", AdminauthJWT, upload.array("files", 10), create);
router.post("/add-image/:id", AdminauthJWT, upload.array("files", 10), addImage);
router.delete("/delete-image/:blogId/:id", AdminauthJWT, deleteImage);

router.get("/get", getBlogs);
router.get("/show/:id", showBlogs);
router.put("/update/:id", AdminauthJWT, update);
router.delete("/delete/:id", AdminauthJWT, deleteblog);


export default router;
