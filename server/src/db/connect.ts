import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function connect() {
  await prisma.$connect();
}

export default prisma;
