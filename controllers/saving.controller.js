const fs = require("fs");
const mongoose = require("mongoose");

const Saving = require("../models/savings");
const jsonData = fs.readFileSync("./data/saving.json");
const savingData = JSON.parse(jsonData);

const seedSavingDatabase = async () => {
  try {
    for (const saving of savingData) {
      const newSaving = new Saving(saving);
      await newSaving.save();
      console.log(`${newSaving.description} saving seeded`);
    }
    console.log("Saving database seeding complete");
  } catch (error) {
    console.error("Error seeding saving database:", error);
  } finally {
    mongoose.disconnect();
  }
};

// seedSavingDatabase();

//Get all savings
exports.getAllSavings = async (req, res) => {
  try {
    const savings = await Saving.find({});
    res.status(200).json({
      success: true,
      savings: savings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to get savings",
    });
  }
};

//Add new saving
exports.addNewSaving = async (req, res) => {
  try {
    const saving = req.body;
    const newSaving = new Saving(saving);
    const savedSaving = await newSaving.save();
    // console.log(savedSaving, "saving added");
    res.status(201).json({
      success: true,
      saving: savedSaving,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to add new saving",
    });
  }
};

//Sort saving by amount
exports.sortSavingsByAmount = async (req, res) => {
  try {
    const sortedSavings = await Saving.find({}).sort({ amount: -1 });
    res.status(200).json({
      success: true,
      savings: sortedSavings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to sort savings by amount",
    });
  }
};

//Filter savings by category
exports.filterSavingsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const savings = await Saving.find({ category: category });
    res.status(200).json({
      success: true,
      savings: savings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to filter savings by category",
    });
  }
};
