import { Router } from "express";
import {
	createAPost,
	getAllPost,
	getPost,
	deletePost,
} from "../controllers/post.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { answerToTheQuestion } from "../controllers/answer.controller.js";
const router = Router();

router.use(authMiddleware);

router.route("/").post(createAPost).get(getAllPost);

router
	.route("/:postId")
	.get(getPost)
	.post(answerToTheQuestion)
	.delete(deletePost);

router.route("/answer/:postId").post(answerToTheQuestion);

export default router;
