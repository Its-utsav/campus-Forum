import { Router } from "express";
import {
	login,
	logout,
	signUp,
	getUserInfo,
} from "../controllers/users.controller.js";

const router = Router();

router.post("/singup", signUp);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", getUserInfo);

export default router;
