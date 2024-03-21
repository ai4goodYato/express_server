import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import MedicineRoute from "./route/medicine.js";

dotenv.config();

const app = express();
const port = 8080;

app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  return res.send("hello world");
});

app.use("/medicine", MedicineRoute);

app.listen(port, () => {
  console.log(`app is running on ${port} port`);
});
