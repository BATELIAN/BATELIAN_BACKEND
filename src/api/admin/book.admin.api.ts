import express from "express";
import {
    getRequest, 
    assign, 
    Myclients, 
    Scheduled, 
    Ongoing, 
    success, 
    getCalbooking,
    fail
} from "../../controller/booking/index.booking.controller";
import { AdminauthJWT } from "../../middleware/authJWT";
const router = express.Router();

router.post("/assign/:id", AdminauthJWT, assign);
router.post("/scheduled/:id", AdminauthJWT, Scheduled);
router.post("/ongoing/:id", AdminauthJWT, Ongoing);
router.post("/success/:id", AdminauthJWT, success);
router.post("/failed/:id", AdminauthJWT, fail);

router.get("/my-cal-bookings", AdminauthJWT, getCalbooking)
router.get("/get", AdminauthJWT, getRequest), 
router.get("/my-client", AdminauthJWT, Myclients )

// router.get("/get-assigned", AdminauthJWT, getRequest)




export default router;
