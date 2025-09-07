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

router.use(adminMiddleware);

router.route("/logout").post(handleLogout);

router.get("/users", getAllUsers);
router.get("/users/:userId", getUser);

router.get("/posts", getAllPost);
router.route("/posts/:postId").get(getPost);

export default router;
