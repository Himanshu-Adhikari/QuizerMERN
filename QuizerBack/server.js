const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const Question = require("./models/DBSchema"); // Import the Question model

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const URI = process.env.DB_URI;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json
console.log("g");
// Connect to MongoDB
mongoose.connect(URI, { dbName: "quizer" })
  .then(() => console.log("MongoDB connection successful"))
  .catch((error) => console.error("MongoDB connection error:", error));

// API Route to fetch questions
app.get('/api/questions', async (req, res) => {
  const { category, activity } = req.query;
  // console.log('Received query:', { category, activity });
  try {
    const questions = await Question.find({ category, activity });
    // console.log('Questions found:', questions);
    // res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: error.message });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
