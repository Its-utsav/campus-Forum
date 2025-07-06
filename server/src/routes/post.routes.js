import { Router } from "express";
import {
	createAPost,
	getAllPost,
	getPost,
} from "../controllers/post.controller.js";

const router = Router();

router.route("/").post(createAPost).get(getAllPost);
router.get("/:postId", getPost);

export default router;
