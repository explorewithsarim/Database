
const express = require("express");
const { signUp, login, home } = require("../Controller/auth.js");
const auth  = require("../Middleware/authentication.js");
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/home", auth, home);

module.exports = router;
