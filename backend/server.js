const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection URI (use IPv4 for compatibility)
const mongoUri = "mongodb://127.0.0.1:27017/my-timer";

// Connect to MongoDB
mongoose
  .connect(mongoUri)
  .then(() => console.log(`MongoDB connected: ${mongoUri}`))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the app if unable to connect
  });

// Schemas
const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  username: String,
  password: String,
});
const userModel = mongoose.model("User", userSchema);

const timersSchema = new mongoose.Schema({
  ownerId: String,
  timerName: String,
  timerType: String,
});
const timerModel = mongoose.model("Timer", timersSchema);

// Routes
app.get("/", (req, res) => {
  res.send("API is running");
});

// getUser

app.get("/getUser", async (req, res) => {
  const users = await userModel.find();
  try {
    res.status(200).json({ user: users });
  } catch {
    console.error("error occured");
  }
});

app.get("/getTimer", async (req, res) => {
  try {
    const result = await timerModel.aggregate([
      {
        $group: {
          _id: "$timerType",
          totalDuration: { $sum: "$durationHours" },
        },
      },
      {
        $project: {
          _id: 0,
          timerType: "$_id", // Renaming _id to timerType
          totalDuration: 1, // Keeping totalDuration as a number
        },
      },
    ]);
    res.status(200).json({ result: result });
  } catch {
    console.error("error occured");
  }
});

app.get("/lol", (req, res) => {
  console.log("lol");
  return res.status(200).json({ message: "5555555 lol" });
});

// Global error handler (optional)
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Something went wrong" });
});

// Start the server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Handle graceful shutdown
process.on("SIGINT", async () => {
  console.log("\nShutting down gracefully...");
  await mongoose.connection.close();
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection:", err);
  process.exit(1);
});
