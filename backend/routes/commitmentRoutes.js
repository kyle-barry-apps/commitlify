const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  getCommitments,
  setCommitment,
  updateCommitment,
  deleteCommitment,
} = require("../controllers/commitmentController");

router.route("/").get(protect, getCommitments).post(protect, setCommitment);
router
  .route("/:id")
  .put(protect, updateCommitment)
  .delete(protect, deleteCommitment);

module.exports = router;
