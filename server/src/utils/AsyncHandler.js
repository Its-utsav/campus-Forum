/**
 *
 * @param {import("express").RequestHandler} requestHandler
 * @returns {(req:import("express").Request,res:import("express").Response,next:import("express").NextFunction)=>Promise<void>}
 */

const asyncHandler = (requestHandler) => {
	return async (req, res, next) => {
		try {
			await Promise.resolve(requestHandler(req, res, next));
		} catch (error) {
			// next(error);
			// OR

			res.status(error.status || 500).json({
				message: error.message || "Internal server error",
				success: false,
			});
		}
	};
};

export default asyncHandler;
