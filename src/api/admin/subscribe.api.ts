import express from "express";
import {
 create, 
 getContact, 
 getContacts
} from "../../controller/subscribe/index.contact.controller";
// import { authJWT } from "../../middleware/authJWT";
import { AdminauthJWT } from "../../middleware/authJWT";

const router = express.Router();

router.post("/create", create);
router.get("/get", AdminauthJWT, getContacts);
router.get("/show/:id", AdminauthJWT, getContact);


export default router;
