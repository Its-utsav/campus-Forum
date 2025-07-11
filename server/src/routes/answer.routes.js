import { Router } from "express";
import { deleteAnswer, getAnswer } from "../controllers/answer.controller.js";
const router = Router();

router.get(getAnswer).delete("/:answerId", deleteAnswer);

export default router;
