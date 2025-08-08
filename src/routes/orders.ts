import express from "express";
import crypto from "crypto";
import { ddb } from "../db/dyClient";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { Order } from "../types";
import { requireUser } from "../middleware/requreUser";

const router = express.Router();

router.post("/", requireUser, async (req, res) => {
  const user = (req as any).user;
  const { items, totalPrice } = req.body;

  const order: Order = {
    orderId: crypto.randomUUID(),
    userId: user.userId,
    items,
    totalPrice,
    status: "Pending",
    createdAt: new Date().toISOString(),
  };
  await ddb.send(new PutCommand({ TableName: "orders", Item: order }));
});
export default router;
