const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5001;

connectDB();

const app = express();

// Get json body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/commitments", require("./routes/commitmentRoutes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
