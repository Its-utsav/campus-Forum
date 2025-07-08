import { Router } from "express";
import {
	login,
	logout,
	signUp,
	getUserInfo,
	newRefreshToken
} from "../controllers/users.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post("/singup", signUp);
router.post("/login", login);
router.get("/new-refresh-token", newRefreshToken)
router.use(authMiddleware);

router.post("/logout", logout);
router.get("/me", getUserInfo);

export default router;
