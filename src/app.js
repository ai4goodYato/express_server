import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import MedicineRoute from "./route/medicine.js";

import path from "path";

dotenv.config();

const app = express();
const port = 8080;

app.use(cors());
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.use("/medicine", MedicineRoute);

app.listen(port, () => {
  console.log(`app is running on ${port} port`);
});
