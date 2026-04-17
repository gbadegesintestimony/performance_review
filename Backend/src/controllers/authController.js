// Backend/src/controllers/authController.js - FIXED VERSION
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const register = async (req, res) => {
  console.log("Data received from frontend", req.body);

  try {
    const {
      firstName,
      lastName,
      email,
      password,
      role,
      employeeId,
      department,
    } = req.body;

    if (!firstName || !lastName || !email || !password || !employeeId) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { employeeId }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          existingUser.email === email
            ? "User with this email already exists"
            : "Employee ID already exists",
      });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role: role || "IC",
      employeeId,
      department,
      isRegistered: true,
    });

    // Convert to object to include virtuals
    const userObject = user.toObject();

    res.status(201).json({
      success: true,
      data: {
        _id: userObject._id,
        name: userObject.name, // ✅ Virtual field included
        firstName: userObject.firstName,
        lastName: userObject.lastName,
        email: userObject.email,
        role: userObject.role,
        employeeId: userObject.employeeId,
        department: userObject.department,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors).map((val) => val.message)[0],
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "User with this email or employee ID already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error during registration",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, employeeId } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Find user and select password
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      console.log(`Failed login attempt for email: ${email}`);
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if employeeId matches (if provided)
    if (employeeId && user.employeeId !== employeeId) {
      return res.status(401).json({
        success: false,
        message: "Employee ID does not match",
      });
    }

    // Verify password
    const isPasswordMatch = await user.matchPassword(password);

    if (!isPasswordMatch) {
      console.log(`Failed login attempt (wrong password) for email: ${email}`);
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    console.log(`Successful login for user: ${user._id} (${email})`);

    // Convert to object to include virtuals
    const userObject = user.toObject();

    res.json({
      success: true,
      data: {
        _id: userObject._id,
        name: userObject.name, // ✅ Virtual field included
        firstName: userObject.firstName,
        lastName: userObject.lastName,
        email: userObject.email,
        role: userObject.role,
        employeeId: userObject.employeeId,
        department: userObject.department,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    console.error(`Login error: ${error.message}`, error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
      error: error.message,
    });
  }
};
