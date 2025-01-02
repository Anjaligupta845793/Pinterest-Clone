import express from "express";
import { createPin, getAllPin } from "../controllers/pincontroller.js";
import { isAuth } from "../middlewares/isAuth.js";
import { v4 as uuidv4 } from "uuid";

import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/create", isAuth, upload.single("file"), createPin);
router.get("/", getAllPin);

export default router;
