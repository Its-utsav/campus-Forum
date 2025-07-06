import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(
	express.urlencoded({
		extended: true,
		limit: "10KB",
	}),
);

app.use(cookieParser());

import postRoutes from "./routes/post.routes.js";
import usersRoutes from "./routes/users.routes.js";

app.use("/api/users", usersRoutes);
app.use("/api/posts", postRoutes);

export default app;
