import Post from "../models/post.model.js";
import Replies from "../models/replies.model.js";
import asyncHandler from "../utils/AsyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
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
	if (checkEmpty(body)) {
		throw new ApiError(400, "post is required");
	}
	body.trim();

	if (!validLength(body, 10)) {
		throw new ApiError(400, "post must have atleast 10 characters");
	}
	const userId = req.user?._id;

	const newPost = await Post.create({
		body,
		author: userId,
	});

	return res.status(201).json(new ApiResponse(201, newPost, "post created"));
});

/** @param {Req} req @param {Res} res @param {Next} next */
const getAllPost = asyncHandler(async (req, res) => {
	const allPost = await Post.find({});

	if (!allPost) {
		throw new ApiError(404, "no post are found");
	}

	return res.status(200).json(new ApiResponse(200, allPost, "post created"));
});

/** @param {Req} req @param {Res} res @param {Next} next */
const getPost = asyncHandler(async (req, res) => {
	const postId = req.params.postId;

	if (!postId) {
		throw new ApiError(400, "postid is required");
	}

	const post = await Replies.findOne({ postId });

	if (!post) {
		throw new ApiError(404, "no post found");
	}

	return res.status(200).json(new ApiResponse(200, post, "post found"));
});

export { createAPost, getAllPost, getPost };
