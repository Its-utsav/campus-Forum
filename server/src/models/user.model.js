import { model, Schema } from "mongoose";

const schema = new Schema(
	{
		username: {
			type: String,
			index: true,
			required: true,
			lowercase: true,
			trim: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			lowercase: true,
			trim: true,
			unique: true,
		},
		department: {
			type: String,
			unique: true,
			// required: true,
		},
		password: {
			type: String,
			required: true,
		},
		refreshToken: String,
	},
	{
		timestamps: true,
	},
);

const User = model("User", schema);

export default User;
