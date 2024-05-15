const express = require("express");

const {
  getAllIncomes,
  addNewIncome,
} = require("../controllers/income.controller");

const router = express.Router();

//Get all expenses route
router.route("/").get(getAllIncomes);

//Add new income
router.route("/add-income").post(addNewIncome);

module.exports = router;
