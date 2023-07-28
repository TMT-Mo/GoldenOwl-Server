import { ValidationChain, check } from "express-validator";

export const createProductValidator = (): ValidationChain[] => [
  check("name").notEmpty().withMessage("name is required"),
  check("description").notEmpty().withMessage("description is required"),
  check("color").notEmpty().withMessage("color is required"),
  check("price").notEmpty().withMessage("price is required"),
  check("image").notEmpty().withMessage("image is required"),
];
