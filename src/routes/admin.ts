import express from "express";
import { ddb } from "../db/dyClient";
import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { requireUser } from "../middleware/requreUser";
import { requireAdmin } from "../middleware/requireAdmin";
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";

const router = express.Router();

router.get("/user", requireUser, requireAdmin, async (_req, res) => {
  const result = await ddb.send(new ScanCommand({ TableName: "User" }));
  res.json(result.Items);
});

router.get("/product", requireUser, requireAdmin, async (_req, res) => {
  const result = await ddb.send(new ScanCommand({ TableName: "Products" }));
  res.json(result.Items);
});

router.delete("/users/:userId", requireUser, requireAdmin, async (req, res) => {
  const { userId } = req.params;

  await ddb.send(
    new DeleteCommand({
      TableName: "User",
      Key: { userId },
    })
  );

  res.json({ message: "User deleted." });
});

router.delete(
  "/orders/:orderId",
  requireUser,
  requireAdmin,
  async (req, res) => {
    const { orderId } = req.params;

    await ddb.send(
      new DeleteCommand({
        TableName: "Orders",
        Key: { orderId },
      })
    );

    res.json({ message: "Order deleted." });
  }
);

router.delete(
  "/products/:productId",
  requireUser,
  requireAdmin,
  async (req, res) => {
    const { productId } = req.params;

    await ddb.send(
      new DeleteCommand({
        TableName: "Products",
        Key: { productId },
      })
    );

    res.json({ message: "Product deleted." });
  }
);

export default router;
