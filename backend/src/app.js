const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/error-handler");
const partyRouter = require("./routes/party-route");
const tagRouter = require("./routes/tag-route");
const userRouter = require("./routes/user-route");
const authRouter = require("./routes/auth-route");
const invitationRouter = require("./routes/invitation-route");
const postRouter = require("./routes/post-route");
const friendRouter = require("./routes/friend-route");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/campfire-app/party", partyRouter);
app.use("/api/v1/campfire-app/tags", tagRouter);
app.use("/api/v1/campfire-app/users", userRouter);
app.use("/api/v1/campfire-app/friends", friendRouter);
app.use("/api/v1/campfire-app/auth", authRouter);
app.use("/api/v1/campfire-app/invitations", invitationRouter);
app.use("/api/v1/campfire-app/posts", postRouter);
app.use(errorHandler);

module.exports = app;
