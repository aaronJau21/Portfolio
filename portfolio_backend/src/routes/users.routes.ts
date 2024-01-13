import { Router } from "express";
import { login, register } from "../controller/User.controller";
import {
  validationsRegister,
  validationLogin,
} from "../services/validators.helpers";

const userRouter = Router();

userRouter.post("/create", validationsRegister, register);
userRouter.post("/login", validationLogin, login);

export default userRouter;
