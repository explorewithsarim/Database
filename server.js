
const express = require("express");

const app = express();
const connectDB = require("./config/dbConnection");
const router = require("./Router/route");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const PORT = 3000;
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/api", router);

connectDB();
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
