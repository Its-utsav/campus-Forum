import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(
	express.json({
		limit: "10KB",
	}),
);

app.use(
	express.urlencoded({
		extended: true,
		limit: "10KB",
	}),
);

app.use(cookieParser());

import usersRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import answerRoutes from "./routes/answer.routes.js";

app.use("/api/users", usersRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/answer", answerRoutes);

export default app;
