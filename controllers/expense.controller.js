const fs = require("fs");
const mongoose = require("mongoose");

const Expense = require("../models/expenses");
const jsonData = fs.readFileSync("./data/expense.json");
const expenseData = JSON.parse(jsonData);

const seedExpenseDatabase = async () => {
  try {
    for (const expense of expenseData) {
      const newExpense = new Expense(expense);
      await newExpense.save();
      console.log(`${newExpense.description} expense seeded`);
    }
    console.log("Expense database seeding complete");
  } catch (error) {
    console.error("Error seeding income database:", error);
  } finally {
    mongoose.disconnect();
  }
};

// seedExpenseDatabase();

//Get all expenses
exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({});
      res.status(200).json({
        success: true,
        expenses: expenses,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to get expenses",
    });
  }
};

//Add new expenses
exports.addNewExpense = async (req, res) => {
  try {
    const expense = new Expense(req.body);
    const savedExpense = await expense.save();
    // console.log(savedExpense, "expense added");
      res.status(201).json({
        success: true,
        expense: savedExpense,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to add new expense",
    });
  }
};

//Sort expenses by amount
exports.sortExpensesByAmount = async (req, res) => {
  try {
    const sortedExpenses = await Expense.find({}).sort({ amount: -1 });
      res.status(200).json({
        success: true,
        expenses: sortedExpenses,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to sort expenses by amount",
    });
  }
};

//Filter expenese by category
exports.filterExpensesByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const filteredExpenses = await Expense.find({ category: category });
      res.status(200).json({
        success: true,
        expenses: filteredExpenses,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to filter expenses by category",
    });
  }
};
