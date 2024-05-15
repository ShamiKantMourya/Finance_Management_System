const express = require("express");

const {
  getAllExpenses,
  addNewExpense,
  sortExpensesByAmount,
  filterExpensesByCategory
} = require("../controllers/expense.controller");

const router = express.Router();

//Get all expenses route
router.route("/").get(getAllExpenses);

//Add expense route
router.route("/add-expense").post(addNewExpense);

//Sorted expenses by amount route
router.route("/sort").get(sortExpensesByAmount);

//Filter expenses by category route
router.route("/:category").get(filterExpensesByCategory);

module.exports = router;
