const mongoose = require("mongoose");

async function connectDB() {
  try {
    // await mongoose.connect(process.env.MONGO_URI);
    await mongoose.connect("mongodb+srv://developer:BatpFTXVFg0Cg75J@cluster0.o0nlmen.mongodb.net/?appName=Cluster0");
    console.log("DATABASE CONNECTED");
  } catch (err) {
    console.log("DB CONNECTION FAILED:", err.message);
  }
}

module.exports = connectDB;
