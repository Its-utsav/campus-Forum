import { model, Schema } from "mongoose";

const schema = new Schema(
	{
		authorId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		postId: {
			type: Schema.Types.ObjectId,
			ref: "Post",
			required: true,
		},
		content: {
			type: String,
			minlength: [10, "Post must have atleast 10 characters"],
			required: true,
			trim: true,
		},
	},
	{
		timestamps: true,
	},
);

const Moderator = model("Moderator", schema);

export default Moderator;
