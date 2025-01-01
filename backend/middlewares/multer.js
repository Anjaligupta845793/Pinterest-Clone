import multer from "multer";

const uploadFile = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 500000 },
}).single("file");

export default uploadFile;
