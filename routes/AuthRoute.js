import express from "express";
import { logIn, logOut, register, saya } from "../controllers/Auth.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", logIn);
router.get("/saya", saya);
router.delete("/logout", logOut);

export default router;
