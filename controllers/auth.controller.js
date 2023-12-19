import { validationResult } from "express-validator";

export const home = (req, res) => {
  res.json({ ok: true });
};

export const register = (req, res) => {
  console.log(req.body);
  res.json({ ok: "register" });
};

export const login = (req, res) => {
  res.json({ ok: "login" });
};
