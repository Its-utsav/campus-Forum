import { Router } from "express";
import {
	createAPost,
	getAllPost,
	getPost,
} from "../controllers/post.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
const router = Router();

router.use(authMiddleware);
router.route("/").post(createAPost).get(getAllPost);
router.get("/:postId", getPost);

export default router;
