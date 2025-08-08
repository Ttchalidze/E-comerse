import experess from "express";
import crypto from "crypto";
import { ddb } from "../db/dyClient";
import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { Product, User } from "../types";
import { requireUser } from "../middleware/requreUser";

const router = experess.Router();

router.get("/", async (_req, res) => {
  const result = await ddb.send(new ScanCommand({ TableName: "Products" }));
  res.json(result.Items as Product[]);
});

router.post("/", requireUser, async (req, res) => {
  const user = (req as any).user;

  const product: Product = {
    ...req.body,
    productid: crypto.randomUUID(),
    sellerId: user.userId,
  };
  await ddb.send(new PutCommand({ TableName: "Produvts", Item: product }));
  res.status(201).json(product);
});

router.get("/seller", requireUser, async (req, res) => {
  const user = (req as any).user;
  const result = await ddb.send(
    new ScanCommand({
      TableName: "Products",
      FilterExpression: "sellderid = :sid",
      ExpressionAttributeValues: { ":sid": user.userId },
    })
  );

  res.json(result.Items);
});

export default router;
