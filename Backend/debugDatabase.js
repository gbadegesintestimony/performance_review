// Backend/debugDatabase.js - Check what's in your database
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function debugDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB\n");

    const User = mongoose.model(
      "User",
      new mongoose.Schema({}, { strict: false }),
    );
    const Submission = mongoose.model(
      "Submission",
      new mongoose.Schema({}, { strict: false }),
    );

    // Check users
    const users = await User.find({});
    console.log("=== USERS IN DATABASE ===");
    console.log(`Total users: ${users.length}\n`);
    users.forEach((user, i) => {
      console.log(`User ${i + 1}:`);
      console.log(`  - Email: ${user.email}`);
      console.log(`  - Role: ${user.role}`);
      console.log(`  - Employee ID: ${user.employeeId}`);
      console.log(`  - First Name: ${user.firstName}`);
      console.log(`  - Last Name: ${user.lastName}`);
      console.log();
    });

    // Check submissions
    const submissions = await Submission.find({}).populate("employee");
    console.log("=== SUBMISSIONS IN DATABASE ===");
    console.log(`Total submissions: ${submissions.length}\n`);
    submissions.forEach((sub, i) => {
      console.log(`Submission ${i + 1}:`);
      console.log(`  - Status: ${sub.status}`);
      console.log(`  - Review Period: ${sub.reviewPeriod}`);
      console.log(`  - Department: ${sub.department}`);
      console.log(`  - Employee: ${sub.employee ? sub.employee.email : "N/A"}`);
      console.log(`  - Created: ${sub.createdAt}`);
      console.log();
    });

    await mongoose.connection.close();
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

debugDatabase();
