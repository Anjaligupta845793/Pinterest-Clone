import cookieParser from "cookie-parser";
import express from "express";
import connectDb from "./database/db.js";
import userrouter from "./routes/user.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userrouter);

connectDb();

app.listen(5000, () => {
  console.log("server is listening on port 5000");
});
