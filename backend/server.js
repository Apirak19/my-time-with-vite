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
  durationHours: Number,
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

app.get("/getStat", async (req, res) => {
  try {
    const totalByTimerType = await timerModel.aggregate([
      {
        $match: { deleted_at: null },
        // Filter out documents where deleted_at is not null
      },
      {
        $group: {
          _id: "$timerType",
          totalDuration: { $sum: "$durationHours" },
        },
      },
      {
        $project: {
          _id: 0,
          timerType: "$_id",
          totalDuration: 1,
        },
      },
    ]);

    const mostSpend = await timerModel
      .find({ deleted_at: null })
      .sort({ durationHours: -1 })
      .limit(10);

    // Time spent per day, week, and month
    const timeSpentByPeriod = await timerModel.aggregate([
      {
        $group: {
          _id: {
            month: { $dateToString: { format: "%Y-%m", date: "$startTime" } },
          },
          totalDuration: { $sum: "$durationHours" },
        },
      },
    ]);

    // Peak productivity hours
    const peakHour = await timerModel.aggregate([
      {
        $project: {
          hour24: { $hour: { $toDate: "$created_at" } }, // Extract 24-hour format hour
        },
      },
      {
        $project: {
          hour12: {
            $add: [{ $mod: [{ $add: ["$hour24", 11] }, 12] }, 1], // Correct 12-hour format conversion
          },
          period: {
            $cond: { if: { $lt: ["$hour24", 12] }, then: "AM", else: "PM" }, // Determine AM or PM
          },
        },
      },
      {
        $group: {
          _id: { hour: "$hour12", period: "$period" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 }, // Sort by highest count
      },
      {
        $limit: 1, // Get only the top 1 result
      },
    ]);

    console.log(peakHour);

    // Idle vs. Active time
    const idleVsActive = await timerModel.aggregate([
      {
        $group: {
          _id: null,
          totalActiveTime: { $sum: "$durationHours" },
        },
      },
      {
        $project: {
          _id: 0,
          totalActiveTime: 1,
          totalIdleTime: {
            $subtract: [24, { $sum: "$durationHours" }], // Assuming a max of 24h per day
          },
        },
      },
    ]);

    res.status(200).json({
      totalByTimerType,
      mostSpend,
      timeSpentByPeriod,
      peakHour,
      idleVsActive,
    });
  } catch (error) {
    console.error("error occured: ", error);
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
