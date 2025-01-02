import { Pin } from "../model/pin.js";
import { v2 as cloudinary } from "cloudinary";
export const createPin = async (req, res) => {
  try {
    const { name, discription } = req.body;
    const uploadResult = await cloudinary.uploader
      .upload(req.file.path)
      .catch((error) => {
        console.log(error);
      });

    console.log(uploadResult);

    /* const pin = await Pin.create({
      name,
      discription,
      user: req.user._id,
      image: req.file.path,
    });

    res.json({
      message: "pin is created",
      pin,
    }); */
  } catch (error) {
    res.status(500).json({
      massage: "something went wrong",
    });
  }
};

export const getAllPin = async (req, res) => {
  try {
    const pins = await Pin.find().sort({ createdAt: -1 });
    res.json({
      pins,
    });
  } catch (error) {
    res.json({
      message: "something went wrong",
    });
  }
};

export const getSinglePin = async (req, res) => {
  try {
    const pin = await Pin.find(req.params.id).populate("user", "-password");
    res.json({
      pin,
    });
  } catch (error) {
    res.json({
      message: "something went wrong",
    });
  }
};
/* export const deletepin = async (req, res) => {
  try {
    const pin = await Pin.find(req.params.id);
    if (!pin) {
      return res.status(402).json({
        message: "pin doesn't exit",
      });
    }
    if (pin.user !== req.user._id) {
      return res.status(403).json({
        message: "you are not the owner of this pin ",
      });
    }
    const pin = await Pin.deleteOne;
  } catch (error) {}
};
 */
