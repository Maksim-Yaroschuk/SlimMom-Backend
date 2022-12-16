const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const { HOST_DB, PORT } = process.env;

const main = async () => {
  try {
    await mongoose.connect(HOST_DB);
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log("Server running. Use our API on port: 3001");
    });
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

main();