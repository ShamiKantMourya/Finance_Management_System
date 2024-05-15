const express = require("express");

const {
  getAllSavings,
  addNewSaving,
  sortSavingsByAmount,
  filterSavingsByCategory
} = require("../controllers/saving.controller");

const router = express.Router();

//Get all savings
router.route("/").get(getAllSavings);

//Add new saving
router.route("/add-saving").post(addNewSaving);

//Sort savings by amount
router.route("/sort").get(sortSavingsByAmount);

//Filter savings by category
router.route("/:category").get(filterSavingsByCategory);

module.exports = router;