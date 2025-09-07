import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";

const ADMIN_EMAIL = "admin@cf.edu";
const ADMIN_PASSWORD = "1234";

const adminMiddleware = (req, res, next) => {
	console.log("at middleware", req.originalUrl, req.method);
	try {
		const incommingAccessToken =
			req.cookies?.accessToken ||
			req.headers.authorization?.replace("Bearer ", "");

		if (!incommingAccessToken) {
			throw new ApiError(401, "unautorized access token not found");
		}
		const user = jwt.verify(
			incommingAccessToken,
			process.env.REFRESH_TOKEN,
		);

		if (user.email !== ADMIN_EMAIL) {
			throw new ApiError(401, "unautorized access , invalid email");
		}
		next();
	} catch (error) {
		throw new ApiError(401, error.message || "invalid access token");
	}
};

export default adminMiddleware;
