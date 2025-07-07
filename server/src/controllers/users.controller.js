import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { checkEmpty, isValidEmail, validLength } from "../utils/validation.js";
import User from "../models/user.model.js";
import { generateAccessAndRefreshToken } from "../utils/common.js";

const signUp = asyncHandler(async (req, res) => {
	/**
	 * @type {{username:string,email:string,password:string}}
	 */
	const { username, email, password } = req.body;

	if (checkEmpty(username) || checkEmpty(email) || checkEmpty(password)) {
		throw new ApiError(400, "All fields are reqired");
	}

	if (!isValidEmail(email)) {
		throw new ApiError(400, "Invalid email address");
	}

	if (!validLength(password, 8)) {
		throw new ApiError(400, "Password must be eight character long");
	}

	const existingUser = await User.findOne({ email, username });
	let findBy = "";

	if (existingUser) {
		if (existingUser.username) findBy = "username";
		if (existingUser.email) findBy = "email";
		throw new ApiError(400, `user already exists with ${findBy}`);
	}

	const newUser = await User.create({ username, email, password });

	if (!newUser) {
		throw new ApiError(400, "Unable to create user");
	}

	delete newUser.password;

	return res
		.status(201)
		.json(new ApiResponse(201, newUser, "User create successfully"));
});

const login = asyncHandler(async (req, res) => {
	/**
	 * @type {{email:string,password:string}}
	 */
	const { email, password } = req.body;

	if (checkEmpty(email) || checkEmpty(password)) {
		throw new ApiError(400, "All fields are reqired");
	}

	if (!isValidEmail(email)) {
		throw new ApiError(400, "Invalid email address");
	}

	if (!validLength(password, 8)) {
		throw new ApiError(400, "Password must be eight character long");
	}

	const user = await User.findOne({ email });

	if (!user) {
		throw new ApiError(404, "User does not exists");
	}

	const isValidPassword = await user.comparePassword(password);

	if (!isValidPassword) {
		throw new ApiError(401, "unautorized access , invalid password");
	}

	const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
		user._id,
	);

	delete user.password;
	delete user.refreshToken;

	return res
		.status(200)
		.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: true,
			maxAge: 5 * 24 * 60 * 1000,
		})
		.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: true,
			maxAge: 30 * 24 * 60 * 1000,
		})
		.json(new ApiResponse(200, user, "user Logged in successfully"));
});

const logout = asyncHandler(async (req, res) => {
	// only authentic users -> middlewares
	const userId = req.user?._id;

	if (!userId) {
		throw new ApiError(400, "userid is required");
	}

	const user = await User.findByIdAndUpdate(
		userId,
		{
			$set: {
				refreshToken: 1,
			},
		},
		{
			new: true,
		},
	);

	if (!user) {
		throw new ApiError(400, "User not found");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, {}, "user logout successfully"))
		.clearCookie("accessToken")
		.clearCookie("refreshToken");
});

const getUserInfo = asyncHandler(async (req, res) => {
	const userId = req.user?._id;

	if (!userId) {
		throw new ApiError(400, "userid is required");
	}

	const user = await User.findById(userId).select("-password").lean();

	if (!user) {
		throw new ApiError(400, "user not found");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, {}, "user data fetch successfully"));
});

const newRefreshToken = asyncHandler(async (req, res) => {});

export { getUserInfo, login, logout, signUp, newRefreshToken };
