import mongoose from "mongoose";
import { config } from "./env.config.js";

export const connectToDb = async () => {
    if (!config.MONGO_URI) {
        throw new Error("MONGO_URI is not configured");
    }

    await mongoose.connect(config.MONGO_URI);
    console.log("Connected to MongoDB");
}
