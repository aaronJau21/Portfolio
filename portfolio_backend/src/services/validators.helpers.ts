import { body } from "express-validator";
import requestError from "../helpers/request-Error.helpers";

export const validationsRegister = [
  body("name", "The name is small").trim().isLength({ min: 10 }),
  body("email", "Enter a valid email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .toLowerCase(),
  body("password", "El password es muy pequeño")
    .trim()
    .isLength({ min: 6 })
    .toLowerCase(),
  requestError,
];

export const validationLogin = [
  body("email", "Enter a valid email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .toLowerCase(),
  body("password", "El password es muy pequeño")
    .trim()
    .isLength({ min: 6 })
    .toLowerCase(),
  requestError,
];
