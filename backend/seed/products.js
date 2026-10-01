import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import productModel from "../src/models/product.model.js";
import { userModel } from "../src/models/user.model.js";

dotenv.config();

const products = [
  {
    title: "Classic White T-Shirt",
    description: "Premium cotton regular fit t-shirt for men",
    images: [
      "https://images.unsplash.com/photo-1560941001-7fb591fb3d5a?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 799,
      currency: "INR"
    },
    sizes: [
      { size: "S", stock: 12 },
      { size: "M", stock: 15 },
      { size: "L", stock: 10 },
      { size: "XL", stock: 8 }
    ],
    published: true
  },

  {
    title: "Oversized Black T-Shirt",
    description: "Premium cotton oversized t-shirt for everyday wear",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 899,
      currency: "INR"
    },
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 15 },
      { size: "L", stock: 12 },
      { size: "XL", stock: 7 }
    ],
    published: true
  }
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB");

    // Find an existing seller
    let seller = await userModel.findOne({ role: "seller" });

    // Create seller if one doesn't exist
    if (!seller) {
      const passwordHash = await bcrypt.hash("Seller@123", 10);

      seller = await userModel.create({
        name: "CartBurster Seller",
        email: "seller@cartburster.com",
        passwordHash,
        role: "seller"
      });

      console.log("Seller created");
    } else {
      console.log("Existing seller found");
    }

    // Add seller ID to every product
    const productsWithSeller = products.map(product => ({
      ...product,
      seller: seller._id
    }));

    await productModel.insertMany(productsWithSeller);

    console.log("Products seeded successfully");
    console.log("Seller ID:", seller._id);

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");

  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
};

seed();