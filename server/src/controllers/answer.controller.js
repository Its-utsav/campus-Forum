import { isValidObjectId } from "mongoose";
import Post from "../models/post.model.js";
import Replies from "../models/replies.model.js";
import Answer from "../models/answer.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { checkEmpty, validLength } from "../utils/validation.js";
import ApiResponse from "../utils/ApiResponse.js";

const answerToTheQuestion = asyncHandler(async (req, res) => {
	const postId = req.params.postId;
	const userId = req.user?._id;

	if (!postId) {
		throw new ApiError(400, "postid is required");
	}
	if (!isValidObjectId(postId)) {
		throw new ApiError(404, "invalid post id");
	}
	/**
	 * @type {{body:string}}
	 */
	let { body } = req.body;
	body = body?.trim();

	if (checkEmpty(body) || !body) {
		throw new ApiError(400, "post can not be empty");
	}

	if (!validLength(body, 10)) {
		throw new ApiError(401, "post must have at least 10 characters");
	}

	const post = await Post.findById(postId);

	if (!post) {
		throw new ApiError(404, "no post found");
	}
	// post -> replies create

	const newPost = await Post.create({
		body,
		author: userId,
		type: "ANSWER",
	});

	const newReply = await Replies.create({
		author: userId,
		postId: newPost._id,
	});

	return res.status(201).json(new ApiResponse(201, newReply, "post created"));
});

const getAnswer = asyncHandler(async (req, res) => {
	const answerId = req.params.answerId;
	if (!answerId) {
		throw new ApiError(400, "answerId is required");
	}

	if (!isValidObjectId(answerId)) {
		throw new ApiError(400, "invalid answerId");
	}
	const answer = await Answer.findById(answerId);
	if (!answer) {
		throw new ApiError(400, "no answer found");
	}
	return res.status(200).json(new ApiResponse(200, answer, "answer found"));
});

const deleteAnswer = asyncHandler(async (req, res) => {
	const answerId = req.params.answerId;
	if (!answerId) {
		throw new ApiError(400, "answerId is required");
	}

	if (!isValidObjectId(answerId)) {
		throw new ApiError(400, "invalid answerId");
	}

	const answer = await Answer.findByIdAndDelete(answerId);
	if (!answer) {
		throw new ApiError(400, "no answer found");
	}
	return res
		.status(200)
		.json(new ApiResponse(200, {}, "answer successfully deleted"));
});

export { answerToTheQuestion, deleteAnswer, getAnswer };
