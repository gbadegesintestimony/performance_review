// Backend/testSubmission.js - Run this to create test submissions
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const submissionSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reviewPeriod: String,
    department: String,
    goals: [String],
    status: {
      type: String,
      enum: ["pending", "reviewed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

const Submission = mongoose.model("Submission", submissionSchema);

async function deleteAllSubmissions() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Delete all submissions
    const result = await Submission.deleteMany({});
    console.log(`✅ Deleted ${result.deletedCount} submissions from database`);

    // Check remaining submissions
    const totalSubmissions = await Submission.countDocuments();
    console.log(`Total submissions remaining: ${totalSubmissions}`);

    await mongoose.connection.close();
    console.log("Done!");
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

deleteAllSubmissions();
