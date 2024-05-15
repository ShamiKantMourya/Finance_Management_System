const fs = require("fs");
const mongoose = require("mongoose");

const Income = require("../models/income");
const jsonData = fs.readFileSync("./data/income.json");
const incomeData = JSON.parse(jsonData);

const seedIncomeDatabase = async () => {
  try {
    for (const income of incomeData) {
      const newIncome = new Income(income);
      await newIncome.save();
      console.log(`${newIncome.description} income seeded`);
    }
    console.log("Income database seeding complete");
  } catch (error) {
    console.error("Error seeding income database:", error);
  } finally {
    mongoose.disconnect();
  }
};

// seedIncomeDatabase();

//Get all incomes
exports.getAllIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({});
    if (incomes) {
      res.status(200).json({
        success: true,
        incomes: incomes,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No incomes found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to get incomes",
    });
  }
};

//Add new income
exports.addNewIncome = async (req, res) => {
  try {
    const income = req.body;
    const newIncome = new Income(income);
    const savedIncome = await newIncome.save();
    console.log(savedIncome, "income added");
    if (savedIncome) {
      res.status(201).json({
        success: true,
        income: savedIncome,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Failed to add income",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to add new income",
    });
  }
};
