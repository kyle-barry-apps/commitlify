const aysncHandler = require("express-async-handler");

// import mongoose models
const Commitment = require("../models/commitmentModel");

// @desc Get commitments
// @route GET /api/commitments
// @access Private
const getCommitments = aysncHandler(async (req, res) => {
  const commitments = await Commitment.find();

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
  const commitmentToDelete = await Commitment.deleteOne({ _id: req.params.id });

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getCommitments,
  setCommitment,
  updateCommitment,
  deleteCommitment,
};
