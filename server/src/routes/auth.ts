import express from "express";
import { z } from "zod";
import { fromError } from "zod-validation-error";
import argon from "argon2";
import prisma from "../db/connect";

const UserSchema = z.object({
  username: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(8),
});

const LoginUserSchema = UserSchema.omit({ username: true });

const router = express.Router();

router.get("/login", (req, res) => {
  res.send("Response");
});

router.post("/signin", async (req, res): Promise<any> => {
  const { success, error, data } = UserSchema.safeParse(req.body);
  if (!success)
    return res.status(400).json({ error: fromError(error).toString() });

  data.password = await argon.hash(data.password);
  const user = await prisma.user.create({
    data,
  });
  user.password = "";

  return res.status(200);
});

export default router;
