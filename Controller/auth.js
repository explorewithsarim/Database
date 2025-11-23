const jwt = require("jsonwebtoken");
const userValue = require("../config/userSchema");
const bcrypt = require("bcrypt");
const saltRounds = 10;
      
async function signUp(req, res) {
  try {
    const { fName, lName, email, password, role } = req.body;
    console.log(fName,lName,email,password,role);
    

    const existingUser = await userValue.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new userValue({
      fName,
      lName,
      email,
      password: hashedPassword,
      role,
    });
    console.log(user);

    const result = await user.save();

    return res.status(200).json({
      message: "Signup successfully",
      result,
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userValue.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWTSECRETKEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token: token,
      role: user.role,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

const home = async (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).json({ message: "Not Authorized" });

  if (user.role === "admin") {
    return res.status(200).json({ message: `Welcome Admin ${user.email}` });
  }

  return res.status(200).json({ message: `Welcome User ${user.email}` });
};

module.exports = { signUp, login, home };
