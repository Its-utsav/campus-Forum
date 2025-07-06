import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { checkEmpty, isValidEmail, validLength } from "../utils/validation.js";
import User from "../models/user.model.js";

const signUp = asyncHandler(async (req, res) => {
	/**
	 * @type {{username:string,email:string,password:string}}
	 */
	const { username, email, password } = req.body;

	if (
		!username ||
		!email ||
		!password ||
		checkEmpty(username) ||
		checkEmpty(email) ||
		checkEmpty(password)
	) {
		console.log("fail");
		throw new ApiError(400, "All fields are reqired");
	}

	if (!isValidEmail(email)) {
		throw new ApiError(400, "Invalid email address");
	}

	const existingUser = await User.findOne({ email, username });
	let findBy = "";

	if (existingUser) {
		if (existingUser.username) findBy = "username";
		if (existingUser.email) findBy = "email";

		throw new ApiError(400, `user already exists with ${findBy}`);
	}

	if (!validLength(password, 8)) {
		throw new ApiError(400, "Password must be eight character long");
	}
	const newUser = await User.create({ username, email, password });

	if (!newUser) {
		throw new ApiError(400, "Unable to create user");
	}

	return res
		.status(201)
		.json(new ApiResponse(201, newUser, "User create successfully"));
});

const login = asyncHandler(async (req, res) => {});
const logout = asyncHandler(async (req, res) => {});
const getUserInfo = asyncHandler(async (req, res) => {});

export { getUserInfo, login, logout, signUp };
