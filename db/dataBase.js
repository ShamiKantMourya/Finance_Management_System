const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URL;

exports.dataBase = () => {
  mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
};
