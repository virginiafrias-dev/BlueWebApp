import { User } from "../models/User.js";

export const home = (req, res) => {
  res.json({ ok: true });
};

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    //Alternativa buscando por email
    let user = await User.findOne({ email });
    if (user) throw { code: 11000 };

    user = new User({ email, password });
    await user.save();

    // jwt token

    return res.status(201).json({ ok: true });
  } catch (error) {
    console.log(error);
    //Alternativa por defecto mongoose
    if (error.code === 11000) {
      return res.status(400).json({ error: "Este email ya esta registrado" });
    }
  }
};

export const login = async (req, res) => {
  res.json({ ok: "login" });
};
