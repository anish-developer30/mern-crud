const mongoose = require("mongoose");

const URL = process.env.DBURL;
const DB = async () => {
  try {
    await mongoose.connect(URL);
  } catch (error) {
    console.log("connection error", error);
    process.exit(0);
  }
};

module.exports = DB;
