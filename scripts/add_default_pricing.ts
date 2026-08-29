import { connectDB } from "../src/lib/db";
import { Service } from "../src/models/Service";
import { Package } from "../src/models/Package";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

async function run() {
  try {
    await connectDB();
    console.log("Connected to DB");

    // Update Services
    const serviceResult = await Service.updateMany(
      { $or: [{ price: { $exists: false } }, { price: "" }] },
      { $set: { price: "Starting at ₹999" } }
    );
    console.log(`Updated ${serviceResult.modifiedCount} services with default pricing.`);

    // Update Packages
    const packageResult = await Package.updateMany(
      { $or: [{ price: { $exists: false } }, { price: "" }] },
      { $set: { price: "Starting at ₹2,499" } }
    );
    console.log(`Updated ${packageResult.modifiedCount} packages with default pricing.`);

  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.connection.close();
  }
}

run();
