import express from "express";
import { Banker } from "../entities/Banker";
const router = express.Router();

router.get("/api/bankers", async (req, res) => {
  const client = await Banker.find();
  return res.json(client);
});

export { router as fetchBankerRouter };
