const aysncHandler = require("express-async-handler");

// import mongoose models
const Commitment = require("../models/commitmentModel");
const User = require("../models/userModel");

// @desc Get commitments
// @route GET /api/commitments
// @access Private
const getCommitments = aysncHandler(async (req, res) => {
  const commitments = await Commitment.find({ user: req.user.id });

  res.status(200).json(commitments);
});

// @desc Set commitment
// @route POST /api/commitments
// @access Private
const setCommitment = aysncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Add a name field");
  }

  const commitment = await Commitment.create({
    name: req.body.name,
    description: req.body.description,
    commitmentType: req.body.commitmentType,
    endDate: req.body.endDate,
    success: false,
    progressPercentage: 0,
    moneyCommitted: req.body.moneyCommitted,
    timeCommitted: req.body.timeCommitted,
    user: req.user.id,
  });

  res.status(200).json(commitment);
});

// @desc Update commitment
// @route PUT /api/commitments/:id
// @access Private
const updateCommitment = aysncHandler(async (req, res) => {
  const commitment = await Commitment.findById(req.params.id);

  if (!commitment) {
    res.status(400);
    throw new Error("Commitment not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make user can only update their own commitments
  if (commitment.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedCommitment = await Commitment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedCommitment);
});

// @desc Delete commitment
// @route DELETE /api/commitments/:id
// @access Private
const deleteCommitment = aysncHandler(async (req, res) => {
  const commitment = await Commitment.findById(req.params.id);

  if (!commitment) {
    res.status(400);
    throw new Error("Commitment not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make user can only update their own commitments
  if (commitment.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await commitment.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getCommitments,
  setCommitment,
  updateCommitment,
  deleteCommitment,
};
