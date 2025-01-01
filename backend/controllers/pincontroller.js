import { Pin } from "../model/pin.js";
import getDataUrl from "../utils/dataUrigenerator.js";
import cloudinary from "cloudinary";

export const createPin = async (req, res) => {
  try {
    const { name, discription } = req.body;
    const file = req.file.path;

    try {
      console.log(file);
      const uploadResult = await cloudinary.v2.uploader.upload(file);
      const pin = await Pin.create({
        name,
        discription,
        user: req.user._id,
        image: {
          url: uploadResult.secure_url,
        },
      });
    } catch (error) {
      console.log(error);
    }

    res.json({
      message: "pin is created",
    });
  } catch (error) {
    res.status(500).json({
      massage: "something went wrong",
      error: error.message,
    });
  }
};
