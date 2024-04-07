const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  skills: {
    type: [String],
    required: true,
  },
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["Open", "Closed"],
    required: true,
    default: "Open",
  },
  screening_questions: {
    type: [
      {
        question: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: ["Multiple Choice", "Open Ended"],
          required: true,
        },
        options: {
          type: [String],
        },
        correct_answer: {
          type: String,
        },
      },
    ],
  },
  assessment_questions: {
    type: [
      {
        question: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: ["Multiple Choice", "Open Ended", "Skill Test"],
          required: true,
        },
        options: {
          type: [String],
        },
        correct_answer: {
          type: String,
        },
        skill: {
          type: String,
        },
      },
    ],
  },
});

module.exports = mongoose.model("Job", jobSchema);
