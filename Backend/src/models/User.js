// Backend/src/models/User.js - SIMPLIFIED (NO VALIDATION ERRORS)
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    department: String,
    role: {
      type: String,
      enum: ["IC", "SeniorIC", "Manager"],
      default: "IC",
    },
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    isRegistered: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Virtual field for full name
userSchema.virtual("name").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Hash password before saving - SIMPLIFIED (no validation)
userSchema.pre("save", async function () {
  // Only hash if password was modified
  if (!this.isModified("password")) return;

  // Hash password
  this.password = await bcrypt.hash(this.password, 12);
});

// Method to compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
