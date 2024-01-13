import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

const requestError = (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.array() });
  }

  next();
};

export default requestError;
