import express from "express";
import { createPin } from "../controllers/pincontroller.js";
import { isAuth } from "../middlewares/isAuth.js";
import uploadFile from "../middlewares/multer.js";

const router = express.Router();

router.post("/create", isAuth, uploadFile, createPin);

export default router;
