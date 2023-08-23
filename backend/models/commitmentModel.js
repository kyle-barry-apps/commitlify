const mongoose = require("mongoose");

const commitmentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    commitmentType: String,
    endDate: Date,
    success: Boolean,
    progressPercentage: Number,
    moneyCommitted: Number,
    timeCommitted: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Commitment", commitmentSchema);
