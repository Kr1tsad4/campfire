require("dotenv").config();
const connectDB = require("./src/config/db.js");
const app = require("./src/app.js");

connectDB();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
