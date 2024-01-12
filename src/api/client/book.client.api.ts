import express from "express";
import {
    request, 
    singleRequest
} from "../../controller/booking/index.booking.controller";
import { AdminauthJWT, ClientauthJWT, CAauthJWT } from "../../middleware/authJWT";
const router = express.Router();

router.post("/request", ClientauthJWT, request);
router.get("/my-booking", ClientauthJWT, singleRequest);
export default router;



