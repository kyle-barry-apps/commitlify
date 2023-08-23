// @desc Get commitments
// @route GET /api/commitments
// @access Private
const getCommitments = (req, res) => {
  res.status(200).json({
    message: "Getting goals",
  });
};

// @desc Set commitment
// @route POST /api/commitments
// @access Private
const setCommitment = (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Add a text field");
  }

  res.status(200).json({
    message: "Setting goal",
  });
};

// @desc Update commitment
// @route PUT /api/commitments/:id
// @access Private
const updateCommitment = (req, res) => {
  res.status(200).json({
    message: `Updating goal: ${req.params.id}`,
  });
};

// @desc Delete commitment
// @route DELETE /api/commitments/:id
// @access Private
const deleteCommitment = (req, res) => {
  res.status(200).json({
    message: `Deleting goal: ${req.params.id}`,
  });
};

module.exports = {
  getCommitments,
  setCommitment,
  updateCommitment,
  deleteCommitment,
};
