import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";

const authMiddleware = asyncHandler(async (req, _, next) => {
	try {
		const incommingAccessToken = req.cookies?.accessToken;

		if (!incommingAccessToken) {
			throw new ApiError(401, "unautorized access token not found");
		}

		const user = jwt.verify(incommingAccessToken, process.env.ACCESS_TOKEN);
		const isUser = await User.findById(user._id)
			.select("-password -refreshToken")
			.lean();
		if (!isUser) {
			throw new ApiError(404, "user not found");
		}
		req.user = user;
		next();
	} catch (error) {
		throw new ApiError(401, error.message || "invalid refresh token");
	}
});

export default authMiddleware;
