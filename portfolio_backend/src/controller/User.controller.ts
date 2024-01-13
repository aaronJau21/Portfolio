import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { comparePassword, hashPassword } from "../services/bcrypt.services";
import { sharedEmail } from "../services/shared-user.helpers";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const userExist = await sharedEmail(email);

  if (userExist) {
    return res.status(400).json({
      msg: "User already exists",
    });
  }

  try {
    const hash = hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hash,
      },
    });

    return res.json({
      msg: "Created User",
      user,
    });
  } catch (error) {
    return res.status(500).send({
      msg: "Error Server",
      error,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const userExist = await sharedEmail(email);

    if (!userExist) {
      return res.status(404).send({
        msg: "Not found User",
      });
    }
    const compare = comparePassword(password, userExist.password);
    if (!compare) {
      return res.status(404).send({
        msg: "Not found User",
      });
    }

    return res.send({
      msg: "Welcome",
      user: {
        name: userExist.name,
        email: userExist.email
      },
    });
  } catch (error) {}
};
