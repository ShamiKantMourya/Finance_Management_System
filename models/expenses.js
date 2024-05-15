const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Cost of Goods Sold",
        "Depreciation",
        "Entertainment",
        "Health Insurance",
        "Housing",
        "Insurance",
        "Marketing",
        "Office Expenses and Supplies",
        "Office Supplies",
        "Rent",
        "Transportation",
        "Utilities",
      ],
      default: "Rent",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
