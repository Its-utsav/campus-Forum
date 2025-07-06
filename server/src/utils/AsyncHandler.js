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
			next(error);
		}
	};
};

export default asyncHandler;
