require("dotenv").config();
const express = require("express");
const path = require("path");
const AllRouters = require("./routers/all_router");
const cors = require("cors");
const DB = require("./database/db");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, "./client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(AllRouters);
app.use(bodyParser());

DB().then(() => {
  app.listen(PORT, () => {});
});
