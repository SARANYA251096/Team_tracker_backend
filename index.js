require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db/connections");
const {userRouter} = require("./routes/user.routes");
const {cardRouter} = require("./routes/card.routes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
db();

app.use("/api/user", userRouter);
app.use("/api/card", cardRouter);


app.get("/", (req, res) => {
  res.send("Hello Everyone! This is my Team tracker app");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
