import asyncHandler from "../utils/AsyncHandler.js";

const signUp = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;



});

const login = asyncHandler(async (req, res) => { });
const logout = asyncHandler(async (req, res) => { });
const getUserInfo = asyncHandler(async (req, res) => { });

export { signUp, login, logout, getUserInfo };
