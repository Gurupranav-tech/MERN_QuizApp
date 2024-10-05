import type { Request, Response, NextFunction } from "express";
import prisma from "../db/connect";

export default async function authUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  if (!req.cookies || !req.cookies["auth:id"])
    return res.status(401).json({ error: "Not authenticated!" });

  const id = req.cookies["auth:id"];

  try {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        id,
      },
    });

    req.user = user;
  } catch (error: any) {
    return res.status(401).json({ error: "Not authenticated!" });
  }

  next();
}
