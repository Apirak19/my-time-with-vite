const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Connection error: ", err));

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/lol", (req, res) => {
  console.log("lol");
  return res.status(200).json({ message: "5555555 lol" });
});

const port = 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
