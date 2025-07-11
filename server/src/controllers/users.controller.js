import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { generateAccessAndRefreshToken } from "../utils/common.js";
import { checkEmpty, isValidEmail, validLength } from "../utils/validation.js";

const signUp = asyncHandler(async (req, res) => {
	/**
	 * @type {{username:string,email:string,password:string}}
	 */
	if (!req.body) {
		throw new ApiError(400, "All fields are reqired");
	}
	const { username, email, password } = req.body;

	if (
		!username ||
		!email ||
		!password ||
		checkEmpty(username) ||
		checkEmpty(email) ||
		checkEmpty(password)
	) {
		throw new ApiError(400, "All fields are reqired");
	}

	if (!isValidEmail(email)) {
		throw new ApiError(400, "Invalid email address");
	}

	if (!validLength(password, 8)) {
		throw new ApiError(400, "Password must be eight character long");
	}

	const existingUser = await User.findOne({
		$or: [
			{
				username,
			},
			{
				email,
			},
		],
	});
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
	const userObj = newUser.toObject();
	delete userObj.password;

	return res
		.status(201)
		.json(new ApiResponse(201, userObj, "User create successfully"));
});

const login = asyncHandler(async (req, res) => {
	/**
	 * @type {{email:string,password:string}}
	 */
	const { email, password } = req.body;

	if (checkEmpty(email) || checkEmpty(password) || email || password) {
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

	const userObj = user.toObject();

	delete userObj.password;
	delete userObj?.refreshToken;

	return res
		.status(200)
		.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: true,
			maxAge: 5 * 24 * 60 * 60 * 1000,
		})
		.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: true,
			maxAge: 30 * 24 * 60 * 60 * 1000,
		})
		.json(new ApiResponse(200, userObj, "user Logged in successfully"));
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

	const user = await User.findById(userId)
		.select("-password -refreshToken")
		.lean();

	if (!user) {
		throw new ApiError(400, "user not found");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, user, "user data fetch successfully"));
});

const newRefreshToken = asyncHandler(async (req, res) => {
	// get old refresh token based on that token generate new refresh token

	try {
		const incommingRefreshToken =
			req.cookies?.refreshToken ||
			req.headers.authorization?.replace("Bearer", "");

		if (!incommingRefreshToken) {
			throw new ApiError(
				401,
				"Unauthorized access , refresh token is missing",
			);
		}

		// invalid -> throw error
		const userInfo = jwt.verify(
			incommingRefreshToken,
			process.env.REFRESH_TOKEN,
		);

		if (!userInfo) {
			throw new ApiError(
				401,
				"Unauthorized access , invalid refresh token",
			);
		}
		const user = await User.findById(userInfo._id);

		if (!user) {
			throw new ApiError(404, "user not found");
		}

		if (user.refreshToken !== incommingRefreshToken) {
			throw new ApiError(
				404,
				"Invalid Refresh token or Refresh token is already used",
			);
		}

		const { accessToken, refreshToken } =
			await generateAccessAndRefreshToken(user._id);

		return res
			.status(200)
			.cookie("accessToken", accessToken, {
				httpOnly: true,
				secure: true,
				maxAge: 5 * 24 * 60 * 60 * 1000,
			})
			.cookie("refreshToken", refreshToken, {
				httpOnly: true,
				secure: true,
				maxAge: 30 * 24 * 60 * 60 * 1000,
			})
			.json(new ApiResponse(200, {}, "New Refresh token created"));
	} catch (error) {
		console.error(`Error while generating new refresh token`);
		console.log(error);
	}
});

export { getUserInfo, login, logout, newRefreshToken, signUp };
