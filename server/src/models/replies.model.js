import { model, Schema } from "mongoose";

const schema = new Schema(
	{
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		postId: {
			type: Schema.Types.ObjectId,
			ref: "Post",
		},
	},
	{
		timestamps: true,
	},
);

const Replies = model("Replies", schema);

export default Replies;
