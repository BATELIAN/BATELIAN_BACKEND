import express from "express";
import {
    createBasic,
    addRequests,
    getRequests,
    showRequests
} from "../../controller/customers/index.cutomer.controller";
const router = express.Router();

router.post("/create", createBasic);
router.post("/addRequest/:id", addRequests);
router.get("/get",  getRequests);
router.get("/show/:id", showRequests);


export default router;

