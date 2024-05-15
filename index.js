const express = require("express");
const cors = require("cors");

const expense = require("./routes/expense.route");
const income = require("./routes/income.route");
const saving = require("./routes/saving.route");
const { dataBase } = require("./db/dataBase");

const app = express();

//Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

dataBase();

app.get("/", (req, res) => {
  res.send("Welcome to finance tracker");
});

//expense routes
app.use("/api/v1/expense", expense);
app.use("/api/v1/income", income);
app.use("/api/v1/saving", saving);

// handle error
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ error: "Error, Something went wrong" });
});

// global error for route not found
app.use((req, res) => {
  res.status(404).json({ error: "API Route Not Found" });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("server started on port", PORT);
});
