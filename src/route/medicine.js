import express from "express";
import MedicineService from "../service/medicine.js";

const route = express.Router();
const medicineService = new MedicineService();

route.get("/", async (req, res) => {
  const result = await medicineService.getMedicineInfo();
  if (!result) return res.sendStatus(400);
  return res.send(result);
});

export default route;
