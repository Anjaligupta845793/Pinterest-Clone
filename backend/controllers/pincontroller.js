import { Pin } from "../model/pin.js";
import getDataUrl from "../utils/dataUrigenerator.js";
import cloudinary from "cloudinary";

export const createPin = async (req, res) => {
  try {
    const { name, discription } = req.body;
    const file = req.file;

    const fileUrl = getDataUrl(file);
    console.log("uploading");

    const cloud = await cloudinary.v2.uploader.upload(fileUrl.content);
    console.log("cloud", cloud.public_id);
    console.log(cloud);
    const pin = await Pin.create({
      name,
      discription,
      user: req.user._id,
      image: {
        id: cloud.public_id,
        url: cloud.secure_url,
      },
    });
    res.json({
      massage: "pin is created",
    });
  } catch (error) {
    res.status(500).json({
      massage: "something went wrong",
      error: error.message,
    });
  }
};
