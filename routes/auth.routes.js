import express from "express";
import { home, login, register } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validationResultMiddle } from "../middlewares/validationResult.js";
const router = express.Router();

router.get("/", home);

router.post(
  "/register",
  [
    body("email", "Formato de email incorrecto")
      .trim()
      .isEmail()
      .normalizeEmail(),
    body("password", "Minimo 6 caracteres").trim().isLength({ min: 6 }),
    body("password", "Formato de password incorrecta").custom(
      (value, { req }) => {
        if (value !== req.body.repassword) {
          throw new Error("No coinciden las contraseñas");
        }
        return value;
      }
    ),
  ],
  validationResultMiddle,
  register
);

router.get(
  "/login",
  [
    body("email", "Formato de email incorrecto")
      .trim()
      .isEmail()
      .normalizeEmail(),
    body("password", "Minimo 6 caracteres").trim().isLength({ min: 6 }),
  ],
  validationResultMiddle,
  login
);

export default router;
