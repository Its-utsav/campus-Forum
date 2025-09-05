import asyncHandler from "../utils/AsyncHandler.js";
import User from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { isValidObjectId } from "mongoose";
const getAllUsers = asyncHandler(async (req, res) => {
	const allUsers = await User.aggregate({
		$match: {},
		$project: {
			refreshToken: 0,
			password: 0,
		},
	});
	return res
		.status(200)
		.json(new ApiResponse(200, allUsers, "user found successfully"));
});

const getUser = asyncHandler(async (req, res) => {
	const userId = req.params.userId;
	if (!userId) {
		throw new ApiError(400, "user id not found");
	}

	if (!isValidObjectId(userId)) {
		throw new ApiError(400, "invalid user id");
	}

	const user = await User.findById(userId).lean();
	if (!user) {
		throw new ApiError(404, "User not found");
	}

	const userObj = user.toObject();
	delete userObj.password;
	delete userObj.refreshToken;

	return res
		.status(200)
		.json(new ApiResponse(200, userObj, "user data fetch successfully"));
});

const getAllPost = asyncHandler((req, res) => {
	return res.status(200).json({
		message: "Hi",
	});
});

const getPost = asyncHandler((req, res) => {
	return res.status(200).json({
		message: "Hi",
	});
});

export { getAllUsers, getUser, getAllPost, getPost };
