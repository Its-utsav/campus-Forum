import mongoose, { isValidObjectId } from "mongoose";
import Post from "../models/post.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { checkEmpty, validLength } from "../utils/validation.js";

/**
 * @typedef {import("express").Request} Req
 * @typedef {import("express").Response} Res
 * @typedef {import("express").NextFunction} Next
 */

/** @param {Req} req @param {Res} res @param {Next} next */
const createAPost = asyncHandler(async (req, res) => {
	/**
	 * @type {{body:string}}
	 */
	let { body } = req.body;

	if (!body || checkEmpty(body)) {
		throw new ApiError(400, "post is required");
	}
	body = body?.trim();

	if (!validLength(body, 10)) {
		throw new ApiError(400, "post must have atleast 10 characters");
	}
	const userId = req.user?._id;

	const newPost = await Post.create({
		body,
		authorId: userId,
	});

	return res.status(201).json(new ApiResponse(201, newPost, "post created"));
});

/** @param {Req} req @param {Res} res @param {Next} next */
const getAllPost = asyncHandler(async (req, res) => {
	const allPost = await Post.find({});

	if (!allPost || allPost.length === 0) {
		throw new ApiError(404, "no post are found");
	}

	return res.status(200).json(new ApiResponse(200, allPost, "post found"));
});

/** @param {Req} req @param {Res} res @param {Next} next */
const getPost = asyncHandler(async (req, res) => {
	const postId = req.params.postId;

	if (!postId) {
		throw new ApiError(400, "postid is required");
	}
	if (!isValidObjectId(postId)) {
		throw new ApiError(404, "invalid post id");
	}

	// const post = await Post.findById(postId);

	// if (!post) {
	// 	throw new ApiError(404, "no post found");
	// }
	// TODO : complete it
	const post = await Post.aggregate([
		{
			$match: {
				_id: new mongoose.Types.ObjectId(postId),
			},
		},
		{
			$lookup: {
				from: "answers",
				as: "answers",
				localField: "_id",
				foreignField: "postId",
				pipeline: [
					{
						$project: {
							authorId: 1,
							postId: 1,
							content: 1,
						},
					},
				],
			},
		},
	]);
	console.log(post[0]);
	return res.status(200).json(new ApiResponse(200, post[0], "post found"));
});
/** @param {Req} req @param {Res} res @param {Next} next */
const deletePost = asyncHandler(async (req, res) => {
	return res.json({
		msg: "Implementation is pending",
	});
});

export { createAPost, deletePost, getAllPost, getPost };
