import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const sharedEmail = async (email: string) => {
  const userExist = await prisma.user.findFirst({
    where: { email },
  });

  return userExist;
};
