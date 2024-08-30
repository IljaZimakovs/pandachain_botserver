import dotenv from "dotenv";
import app from "./app.mjs";
import dbConnect from "./utils/dbconnect.mjs";
import startTGBot from "./Controllers/botController.mjs";

dotenv.config();

dbConnect()
  .then(() => {
    console.log("Database connected successfully");
    // startTGBot();
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });

export default app; // Ensure this line is present
