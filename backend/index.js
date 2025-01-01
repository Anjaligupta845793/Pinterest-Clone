import cookieParser from "cookie-parser";
import express from "express";
import connectDb from "./database/db.js";
import userrouter from "./routes/user.js";
import PinRouter from "./routes/pin.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.cloud_apikey,
  api_secret: process.env.cloud_apisecret,
});

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userrouter);
app.use("/api/pin", PinRouter);

connectDb();

app.listen(5000, () => {
  console.log("server is listening on port 5000");
});
