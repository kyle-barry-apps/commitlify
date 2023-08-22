// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = (req, res) => {
  res.status(200).json({
    message: "Getting goals",
  });
};

// @desc Set goal
// @route POST /api/goals
// @access Private
const setGoal = (req, res) => {
  res.status(200).json({
    message: "Setting goal",
  });
};

// @desc Update goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal = (req, res) => {
  res.status(200).json({
    message: `Updating goal: ${req.params.id}`,
  });
};

// @desc Delete goal
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = (req, res) => {
  res.status(200).json({
    message: `Deleting goal: ${req.params.id}`,
  });
};

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
