const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const cors = require("cors");
const port = process.env.PORT || 5001;

connectDB();

const app = express();

// Get req.body in json format
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/commitments", require("./routes/commitmentRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
