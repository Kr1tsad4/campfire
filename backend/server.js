require("dotenv").config();
const connectDB = require("./src/config/db.js");
const app = require("./src/app.js");
const userRoutes = require('./src/routes/user-routes.js');

connectDB();

const port = process.env.PORT;
app.use('/user', userRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
