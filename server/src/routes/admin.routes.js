import { Router } from "express";
import { getAllUsers, getUser } from "../controllers/admin.controller.js";
import { getAllPost, getPost } from "../controllers/post.controller.js";

const router = Router();

router.get("/users", getAllUsers);
router.get("/users/:userID", getUser);

router.get("/post", getAllPost);
router.get("/posts/:postId", getPost);

export default router;
