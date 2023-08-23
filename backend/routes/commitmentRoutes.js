const express = require("express");
const router = express.Router();

const {
  getCommitments,
  setCommitment,
  updateCommitment,
  deleteCommitment,
} = require("../controllers/commitmentController");

router.route("/").get(getCommitments).post(setCommitment);
router.route("/:id").put(updateCommitment).delete(deleteCommitment);

module.exports = router;
