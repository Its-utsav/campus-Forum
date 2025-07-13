import { Router } from "express";
import { deleteAnswer, getAnswer } from "../controllers/answer.controller.js";
const router = Router();

router.route("/:answerId").get(getAnswer).delete(deleteAnswer);

export default router;
