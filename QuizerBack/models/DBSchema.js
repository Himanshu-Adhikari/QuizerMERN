const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  category: { type: String, required: true },
  activity: { type: String, required: true },
  question: { type: String, required: true },
  option1: { type: String, required: true },
  option2: { type: String, required: true },
  option3: { type: String, required: true },
  option4: { type: String, required: true },
  answer: { type: String, required: true }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
