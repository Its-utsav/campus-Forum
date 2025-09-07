import asyncHandler from "../utils/AsyncHandler.js";
import User from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { isValidObjectId } from "mongoose";
import { isValidEmail, validLength } from "../utils/validation.js";
import { generateAccessTokenForAdmin } from "../utils/common.js";

const ADMIN_EMAIL = "admin@cf.edu";
const ADMIN_PASSWORD = "1234";

const handleLogin = asyncHandler(async (req, res) => {
	if (!req.body) {
		throw new ApiError(
			400,
			"email and password are require for authentication",
		);
	}
	const { email, password } = req.body;
	if (!isValidEmail(email)) {
		throw new ApiError(400, "Invalid email address");
	}

	if (!validLength(password, 4)) {
		throw new ApiError(400, "Password must be eight character long");
	}

	if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
		throw new ApiError(401, "Invalid credentials please try again");
	}

	const token = generateAccessTokenForAdmin(email);
	return res
		.status(200)
		.cookie("accessToken", token, {
			httpOnly: true,
			secure: true,
			maxAge: 60 * 60 * 1000, // valid for one hour only
		})
		.json(
			new ApiResponse(
				200,
				{
					email: ADMIN_EMAIL,
				},
				"Admin logged in successfully",
			),
		);
});

const handleLogout = asyncHandler(async (req, res) => {
	const incommingToken = req.cookies?.accessToken;

	if (!incommingToken) {
		throw new ApiError(401, "Token missing failed ");
	}
	return res
		.status(200)
		.clearCookie("accessToken")
		.set("Clear-Site-Data", '"cookies", "storage", "cache"')
		.json(new ApiResponse(200, {}, "admin logout successfully"));
});

const getAllUsers = asyncHandler(async (req, res) => {
	const allUsers = await User.aggregate([
		{
			$facet: {
				users: [
					{
						$project: {
							refreshToken: 0,
							password: 0,
						},
					},
				],
				totalUsers: [
					{
						$count: "count",
					},
				],
			},
		},
	]);
	return res
		.status(200)
		.json(new ApiResponse(200, allUsers[0], "user found successfully"));
});

const getUser = asyncHandler(async (req, res) => {
	const userId = req.params.userId;
	if (!userId) {
		throw new ApiError(400, "user id not found");
	}

	if (!isValidObjectId(userId)) {
		throw new ApiError(400, "invalid user id");
	}

	const user = await User.findById(userId);
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

export { getAllUsers, getUser, getAllPost, getPost, handleLogin, handleLogout };
