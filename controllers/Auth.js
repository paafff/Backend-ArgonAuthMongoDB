import userDB from "../models/UserModel.js";
import argon2 from "argon2";
import { v4 as uuidv4 } from "uuid";

export const register = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;
  if (password !== confPassword)
    return res.status(400).json({ msg: "passwordnya gasama..." });

  try {
    const user = await userDB.findOne({ email: email }); // mencari user berdasarkan email
    if (user) {
      return res.status(400).json({ msg: "email sudah digunakan" }); // jika user ditemukan, kirimkan respon dengan pesan email sudah digunakan
    }
    const hashPassword = await argon2.hash(password);

    await userDB.create({
      uuid: uuidv4(),
      name: name,
      email: email,
      password: hashPassword,
      role: role,
    });
    res.status(201).json({ msg: "registrasi sukses..." });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// ##################
export const logIn = async (req, res) => {
  const user = await userDB.findOne({
    email: req.body.email,
  });

  if (!user) return res.status(404).json({ msg: "user tidak ditemukan..." });

  const match = await argon2.verify(user.password, req.body.password);
  if (!match) return res.status(400).json({ msg: "maaf, password salah" });

  req.session.userId = user.uuid;
  const uuid = user.uuid;
  const name = user.name;
  const email = user.email;
  const role = user.role;

  res.status(200).json({ uuid, name, email, role });
};

// ##################
export const saya = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "login dulu yah..." });
  }

  const user = await userDB
    .findOne({
      uuid: req.session.userId,
    })
    .select("-_id uuid name email role");

  res.status(200).json(user);
  if (!user) return res.status(404).json({ msg: "maaf, user tidak ditemukan" });
};

// ##################
export const logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "gabisa logoooutttt" });
    res.status(200).json({ msg: "suksess logoouttt" });
  });
};
