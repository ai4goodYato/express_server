import express from "express";
import MedicineService from "../service/medicineService.js";

const route = express.Router();
const medicineService = new MedicineService();

route.get("/", async (req, res) => {
  const result = await medicineService.getMedicineInfo();
  if (!result) return res.sendStatus(400);
  return res.send(result);
});

route.get("/:name", async (req, res) => {
  const name = req.params.name;
  const result = await medicineService.getMedicineInfoByName(name);
  if (!result) return res.sendStatus(400);
  return res.send(result);
});

export default route;
