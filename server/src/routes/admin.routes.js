import { Router } from "express";
import {
	getAllUsers,
	getUser,
	handleLogin,
	handleLogout,
} from "../controllers/admin.controller.js";
import { getAllPost, getPost } from "../controllers/post.controller.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const router = Router();

router.route("/login").post(handleLogin);

router.route("/logout").post(adminMiddleware, handleLogout);

router.get("/users", adminMiddleware, getAllUsers);
router.get("/users/:userId", adminMiddleware, getUser);

router.get("/posts", adminMiddleware, getAllPost);
router.get("/posts/:postId", adminMiddleware, getPost);

export default router;
