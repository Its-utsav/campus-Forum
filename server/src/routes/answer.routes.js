import { Router } from "express";
import { deleteAnswer } from "../controllers/answer.controller.js";
const router = Router();

router.delete("/:answerId", deleteAnswer);

export default router;
