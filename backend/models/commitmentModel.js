const mongoose = require("mongoose");

const commitmentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    description: String,
    commitmentType: {
      timeframe: String,
      numberOfDays: Number,
      daysOfWeek: [String],
    },
    success: Boolean,
    progressPercentage: Number,
    moneyCommitted: Number,
    timeCommitted: Number,
    completionDates: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Commitment", commitmentSchema);
