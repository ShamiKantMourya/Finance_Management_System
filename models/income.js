const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
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
        "Capital Gain",
        "Commission",
        "Dividend",
        "Gratuity",
        "Interest",
        "Investment",
        "Partnership",
        "Rent",
        "Royalties",
        "Salary",
        "Wages",
      ],
      default: "Salary",
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

const Income = mongoose.model("Income", incomeSchema);

module.exports = Income;
