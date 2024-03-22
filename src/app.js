import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import MedicineRoute from "./route/medicineController.js";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

const app = express();
const port = 8080;

app.use(cors());
app.use(morgan("dev"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.use("/medicine", MedicineRoute);

app.listen(port, () => {
  console.log(`app is running on ${port} port`);
});
