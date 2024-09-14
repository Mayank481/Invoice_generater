require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const logger = require("./logger/logger");

const connectDatabase = require("./config/database");
connectDatabase();

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/invoices", express.static("invoices"));

app.get("/", (req, res) => {
  res.send({
    message: "Welcome to the Product Invoice Generate :)",
  });
});

app.use("/api/v1", require("./routes"));

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
