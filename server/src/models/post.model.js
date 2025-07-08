import mongoose, { model, Schema } from "mongoose";
const schema = new Schema(
	{
		body: {
			type: String,
			required: true,
			trim: true,
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{
		timestamps: true,
	},
);

const Post = model("Post", schema);

export default Post;
