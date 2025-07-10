const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/error-handler");
const partyRouter = require("./routes/party-route");
const tagRouter = require("./routes/tag-route");
const userRouter = require("./routes/user-route");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/real-time-party/party", partyRouter);
app.use("/api/v1/real-time-party/tags", tagRouter);
app.use("/api/v1/real-time-party/users", userRouter);
app.use(errorHandler);

module.exports = app;
