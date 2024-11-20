const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const transactionRoutes = require("./routes/transactionRoutes");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.error("Error connecting to MongoDB:", err));

app.use("/api", transactionRoutes);

module.exports = app;
