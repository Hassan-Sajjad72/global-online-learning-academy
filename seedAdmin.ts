import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { Admin } from "./backend/models/admins";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

async function seedAdmin() {
    try {
        // Check required environment variables
        if (!MONGODB_URI) {
            throw new Error("MONGODB_URI is not configured in .env");
        }

        if (!ADMIN_PASSWORD) {
            throw new Error("ADMIN_PASSWORD is not configured in .env");
        }

        console.log("Connecting to MongoDB...");

        await mongoose.connect(MONGODB_URI);

        console.log("Connected successfully.");

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({
            username: "admin"
        });

        if (existingAdmin) {
            console.log("Admin already exists.");
            await mongoose.disconnect();
            process.exit(0);
        }

        // Hash password from environment variable
        const hashedPassword = await bcrypt.hash(
            ADMIN_PASSWORD,
            10
        );

        // Create admin
        const admin = new Admin({
            username: "admin",
            password: hashedPassword,
            role: "SuperAdmin"
        });

        await admin.save();

        console.log("Admin created successfully.");

        await mongoose.disconnect();
        process.exit(0);

    } catch (error) {
        console.error("Error creating admin:", error);

        await mongoose.disconnect();
        process.exit(1);
    }
}

seedAdmin();