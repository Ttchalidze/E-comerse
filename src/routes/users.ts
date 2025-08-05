import express from "express";
import bcrypt from "bcrypt";
import { ddb } from "../db/dyClient";
import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { createToken } from "../utilities/jwt";
import { User } from "../types";
import { error } from "console";

const router = express.Router();
//registration
router.post("/register", async (req, res) => {
  const { Name, Email, Password, Role } = req.body;
  const hashedPassword = await bcrypt.hash(Password, 7);

  const user: User = {
    UserId: Email,
    Name,
    Email,
    Password: hashedPassword,
    Role: "seller",
    CreatedAt: new Date().toISOString(),
  };
  await ddb.send(new PutCommand({ TableName: "User", Item: user }));
  res.status(201).json({ message: "user registered" });
});

//login
router.post("/login", async (req, res) => {
  const { Email, Password } = req.body;
  const result = await ddb.send(
    new GetCommand({ TableName: "User", Key: { UserId: Email } })
  );
  const user = result.Item as User;
  if (!user) return res.status(401).json({ error: "invalid email" });

  const userMatched = await bcrypt.compare(Password, user.Password);
  if (!userMatched) return res.status(401).json({ error: "invalid Password" });
  const token = createToken({
    UserID: user.UserId,
    Email: user.Email,
    Role: user.Role,
  });
  res.json(token);
});
export default router;
