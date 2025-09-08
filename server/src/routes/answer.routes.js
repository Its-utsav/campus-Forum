import { Router } from "express";
import { deleteAnswer, getAnswer } from "../controllers/answer.controller.js";
import { getMyAnswers } from "../controllers/users.controller.js";
const router = Router();

router.route("/:answerId").get(getAnswer).delete(deleteAnswer);
router.route("/user/answer").get(getMyAnswers)

export default router;
