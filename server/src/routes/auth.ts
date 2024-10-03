import express from "express";
import { z } from "zod";
import { fromError } from "zod-validation-error";
import argon from "argon2";
import prisma from "../db/connect";
import { NODE_ENV } from "src/config";

const UserSchema = z.object({
  username: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(8),
});

const LoginUserSchema = UserSchema.omit({ username: true });

const router = express.Router();

router.get("/me", async (req, res): Promise<any> => {
  const auth = req.cookies["auth:id"];
  if (!auth) return res.status(401).json({ error: "User not logged in." });

  try {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        id: auth,
      },
    });
    user.password = "";
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(401).json({ error: "User not logged in." });
  }
});

router.post("/login", async (req, res): Promise<any> => {
  const { success, error, data } = LoginUserSchema.safeParse(req.body);
  if (!success)
    return res.status(400).json({ error: fromError(error).toString() });

  try {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        email: data.email,
      },
    });

    if (!(await argon.verify(user.password, data.password)))
      return res.status(401).json({ error: "Invalid email id or password" });

    user.password = "";
    res
      .cookie("auth:id", user.id, {
        secure: NODE_ENV !== "deveopment",
        httpOnly: true,
      })
      .status(200)
      .json({ data: user });
  } catch (error) {
    return res.status(401).json({ error: error.toString() });
  }
});

router.post("/signin", async (req, res): Promise<any> => {
  const { success, error, data } = UserSchema.safeParse(req.body);
  if (!success)
    return res.status(400).json({ error: fromError(error).toString() });

  const exisitingUsers = await prisma.user.findMany({
    where: {
      email: data.email,
    },
  });
  if (exisitingUsers.length)
    return res.status(400).json({ error: "User with email id already exists" });

  data.password = await argon.hash(data.password);
  const user = await prisma.user.create({
    data,
  });
  user.password = "";

  return res.status(200).json({ data: "success" });
});

export default router;
