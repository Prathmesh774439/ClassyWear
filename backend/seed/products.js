import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import productModel from "../src/models/product.model.js";
import { userModel } from "../src/models/user.model.js";

dotenv.config();

const products = [
  // =========================
  // MEN - 10 PRODUCTS
  // =========================

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
  },

  {
    title: "Men's Casual Denim Shirt",
    description: "Classic blue denim shirt for casual everyday styling",
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 1199,
      currency: "INR"
    },
    sizes: [
      { size: "S", stock: 8 },
      { size: "M", stock: 14 },
      { size: "L", stock: 12 },
      { size: "XL", stock: 7 }
    ],
    published: true
  },

  {
    title: "Men's Polo T-Shirt",
    description: "Smart cotton polo t-shirt for casual and semi-formal occasions",
    images: [
      "https://images.unsplash.com/photo-1625910513413-5fc45f0c0f6a?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 899,
      currency: "INR"
    },
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 17 },
      { size: "L", stock: 14 },
      { size: "XL", stock: 8 }
    ],
    published: true
  },

  {
    title: "Men's Slim Fit Chinos",
    description: "Stretch cotton chinos with a comfortable slim fit",
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 1299,
      currency: "INR"
    },
    sizes: [
      { size: "S", stock: 9 },
      { size: "M", stock: 15 },
      { size: "L", stock: 13 },
      { size: "XL", stock: 8 }
    ],
    published: true
  },

  {
    title: "Men's Blue Straight Jeans",
    description: "Classic straight-fit blue denim jeans for everyday wear",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 1499,
      currency: "INR"
    },
    sizes: [
      { size: "S", stock: 11 },
      { size: "M", stock: 16 },
      { size: "L", stock: 14 },
      { size: "XL", stock: 7 }
    ],
    published: true
  },

  {
    title: "Men's Cargo Pants",
    description: "Relaxed cargo pants with multiple utility pockets",
    images: [
      "https://images.unsplash.com/photo-1517445312882-3f8a6f3a4a1a?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 1399,
      currency: "INR"
    },
    sizes: [
      { size: "S", stock: 8 },
      { size: "M", stock: 14 },
      { size: "L", stock: 17 },
      { size: "XL", stock: 9 }
    ],
    published: true
  },

  {
    title: "Men's Grey Hoodie",
    description: "Soft fleece hoodie designed for everyday comfort",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 1599,
      currency: "INR"
    },
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 13 },
      { size: "L", stock: 18 },
      { size: "XL", stock: 11 }
    ],
    published: true
  },

  {
    title: "Men's Casual Shorts",
    description: "Lightweight cotton shorts for summer and casual outings",
    images: [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 699,
      currency: "INR"
    },
    sizes: [
      { size: "S", stock: 9 },
      { size: "M", stock: 12 },
      { size: "L", stock: 16 },
      { size: "XL", stock: 10 }
    ],
    published: true
  },

  {
    title: "Men's Formal Cotton Shirt",
    description: "Elegant solid cotton shirt for office and formal occasions",
    images: [
      "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 1099,
      currency: "INR"
    },
    sizes: [
      { size: "S", stock: 7 },
      { size: "M", stock: 14 },
      { size: "L", stock: 15 },
      { size: "XL", stock: 9 }
    ],
    published: true
  },

  // =========================
  // WOMEN - 10 PRODUCTS
  // =========================

  {
    title: "Women's Floral Summer Dress",
    description: "Lightweight floral dress designed for comfortable summer wear",
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 1299,
      currency: "INR"
    },
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 18 },
      { size: "L", stock: 13 },
      { size: "XL", stock: 7 }
    ],
    published: true
  },

  {
    title: "Women's White Casual T-Shirt",
    description: "Soft cotton relaxed-fit t-shirt for everyday styling",
    images: [
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 599,
      currency: "INR"
    },
    sizes: [
      { size: "S", stock: 14 },
      { size: "M", stock: 20 },
      { size: "L", stock: 15 },
      { size: "XL", stock: 8 }
    ],
    published: true
  },

  {
    title: "Women's Denim Jacket",
    description: "Classic blue denim jacket with a relaxed modern fit",
    images: [
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 1799,
      currency: "INR"
    },
    sizes: [
      { size: "S", stock: 9 },
      { size: "M", stock: 15 },
      { size: "L", stock: 12 },
      { size: "XL", stock: 6 }
    ],
    published: true
  },

  {
    title: "Women's Ribbed Crop Top",
    description: "Stretchable ribbed crop top with a comfortable fitted design",
    images: [
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 699,
      currency: "INR"
    },
    sizes: [
      { size: "XS", stock: 8 },
      { size: "S", stock: 16 },
      { size: "M", stock: 19 },
      { size: "L", stock: 11 }
    ],
    published: true
  },

  {
    title: "Women's High Waist Jeans",
    description: "Comfortable high-waisted denim jeans with a flattering fit",
    images: [
      "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 1499,
      currency: "INR"
    },
    sizes: [
      { size: "S", stock: 8 },
      { size: "M", stock: 15 },
      { size: "L", stock: 17 },
      { size: "XL", stock: 9 }
    ],
    published: true
  },

  {
    title: "Women's Wide Leg Trousers",
    description: "Elegant wide-leg trousers made from lightweight fabric",
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 1199,
      currency: "INR"
    },
    sizes: [
      { size: "S", stock: 9 },
      { size: "M", stock: 17 },
      { size: "L", stock: 14 },
      { size: "XL", stock: 7 }
    ],
    published: true
  },

  {
    title: "Women's Casual Hoodie",
    description: "Warm fleece hoodie with a relaxed fit for casual days",
    images: [
      "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 1499,
      currency: "INR"
    },
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 16 },
      { size: "L", stock: 13 },
      { size: "XL", stock: 8 }
    ],
    published: true
  },

  {
    title: "Women's Pleated Skirt",
    description: "Stylish pleated midi skirt for casual and semi-formal looks",
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 999,
      currency: "INR"
    },
    sizes: [
      { size: "S", stock: 7 },
      { size: "M", stock: 14 },
      { size: "L", stock: 12 },
      { size: "XL", stock: 6 }
    ],
    published: true
  },

  {
    title: "Women's Linen Shirt",
    description: "Breathable linen shirt perfect for warm weather",
    images: [
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 1099,
      currency: "INR"
    },
    sizes: [
      { size: "S", stock: 11 },
      { size: "M", stock: 17 },
      { size: "L", stock: 14 },
      { size: "XL", stock: 7 }
    ],
    published: true
  },

  {
    title: "Women's Yoga Leggings",
    description: "Stretchable high-rise leggings for workouts and daily comfort",
    images: [
      "https://images.unsplash.com/photo-1506629905607-d9c297d4b8f2?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 899,
      currency: "INR"
    },
    sizes: [
      { size: "S", stock: 13 },
      { size: "M", stock: 20 },
      { size: "L", stock: 16 },
      { size: "XL", stock: 9 }
    ],
    published: true
  },

  // =========================
  // TEENAGERS - 10 PRODUCTS
  // =========================

  {
    title: "Teen Graphic T-Shirt",
    description: "Trendy graphic cotton t-shirt designed for teenagers",
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 599,
      currency: "INR"
    },
    sizes: [
      { size: "XS", stock: 12 },
      { size: "S", stock: 18 },
      { size: "M", stock: 15 },
      { size: "L", stock: 8 }
    ],
    published: true
  },

  {
    title: "Teen Oversized Hoodie",
    description: "Comfortable oversized hoodie with modern streetwear styling",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 1199,
      currency: "INR"
    },
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 17 },
      { size: "L", stock: 14 },
      { size: "XL", stock: 6 }
    ],
    published: true
  },

  {
    title: "Teen Denim Jacket",
    description: "Trendy denim jacket designed for everyday teenage fashion",
    images: [
      "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 1599,
      currency: "INR"
    },
    sizes: [
      { size: "S", stock: 8 },
      { size: "M", stock: 14 },
      { size: "L", stock: 13 },
      { size: "XL", stock: 7 }
    ],
    published: true
  },

  {
    title: "Teen Polo T-Shirt",
    description: "Classic breathable cotton polo t-shirt for teenagers",
    images: [
      "https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 749,
      currency: "INR"
    },
    sizes: [
      { size: "XS", stock: 9 },
      { size: "S", stock: 16 },
      { size: "M", stock: 18 },
      { size: "L", stock: 10 }
    ],
    published: true
  },

  {
    title: "Teen Cargo Pants",
    description: "Relaxed-fit cargo pants with multiple utility pockets",
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 1099,
      currency: "INR"
    },
    sizes: [
      { size: "XS", stock: 8 },
      { size: "S", stock: 15 },
      { size: "M", stock: 17 },
      { size: "L", stock: 9 }
    ],
    published: true
  },

  {
    title: "Teen Blue Jeans",
    description: "Comfortable straight-fit jeans for everyday teenage outfits",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 1299,
      currency: "INR"
    },
    sizes: [
      { size: "XS", stock: 10 },
      { size: "S", stock: 16 },
      { size: "M", stock: 14 },
      { size: "L", stock: 8 }
    ],
    published: true
  },

  {
    title: "Teen Jogger Pants",
    description: "Soft cotton joggers perfect for casual wear and travel",
    images: [
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 899,
      currency: "INR"
    },
    sizes: [
      { size: "S", stock: 11 },
      { size: "M", stock: 18 },
      { size: "L", stock: 15 },
      { size: "XL", stock: 7 }
    ],
    published: true
  },

  {
    title: "Teen Varsity Jacket",
    description: "Stylish varsity jacket with a sporty teenage look",
    images: [
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 1799,
      currency: "INR"
    },
    sizes: [
      { size: "S", stock: 7 },
      { size: "M", stock: 13 },
      { size: "L", stock: 15 },
      { size: "XL", stock: 6 }
    ],
    published: true
  },

  {
    title: "Teen Summer Shorts",
    description: "Lightweight casual shorts for summer and outdoor activities",
    images: [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 649,
      currency: "INR"
    },
    sizes: [
      { size: "S", stock: 12 },
      { size: "M", stock: 17 },
      { size: "L", stock: 14 },
      { size: "XL", stock: 8 }
    ],
    published: true
  },

  {
    title: "Teen Checked Shirt",
    description: "Casual checked shirt with a relaxed fit for teenagers",
    images: [
      "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 899,
      currency: "INR"
    },
    sizes: [
      { size: "XS", stock: 7 },
      { size: "S", stock: 14 },
      { size: "M", stock: 16 },
      { size: "L", stock: 9 }
    ],
    published: true
  },

  // =========================
  // KIDS - 10 PRODUCTS
  // =========================

  {
    title: "Kids Cartoon T-Shirt",
    description: "Soft cotton printed t-shirt with a fun cartoon design",
    images: [
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 499,
      currency: "INR"
    },
    sizes: [
      { size: "XS", stock: 14 },
      { size: "S", stock: 20 },
      { size: "M", stock: 18 },
      { size: "L", stock: 10 }
    ],
    published: true
  },

  {
    title: "Kids Denim Overalls",
    description: "Comfortable denim overalls designed for active kids",
    images: [
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 899,
      currency: "INR"
    },
    sizes: [
      { size: "XS", stock: 9 },
      { size: "S", stock: 15 },
      { size: "M", stock: 17 },
      { size: "L", stock: 8 }
    ],
    published: true
  },

  {
    title: "Kids Cotton Shorts",
    description: "Breathable cotton shorts for everyday summer activities",
    images: [
      "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 449,
      currency: "INR"
    },
    sizes: [
      { size: "XS", stock: 13 },
      { size: "S", stock: 19 },
      { size: "M", stock: 16 },
      { size: "L", stock: 9 }
    ],
    published: true
  },

  {
    title: "Kids Casual Hoodie",
    description: "Warm fleece hoodie designed for kids during cooler weather",
    images: [
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 999,
      currency: "INR"
    },
    sizes: [
      { size: "XS", stock: 10 },
      { size: "S", stock: 17 },
      { size: "M", stock: 15 },
      { size: "L", stock: 7 }
    ],
    published: true
  },

  {
    title: "Kids Polo T-Shirt",
    description: "Smart cotton polo t-shirt suitable for school and outings",
    images: [
      "https://images.unsplash.com/photo-1520975958225-8e3e0b6c6d87?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 599,
      currency: "INR"
    },
    sizes: [
      { size: "XS", stock: 12 },
      { size: "S", stock: 18 },
      { size: "M", stock: 16 },
      { size: "L", stock: 9 }
    ],
    published: true
  },

  {
    title: "Kids Jogger Pants",
    description: "Soft stretch cotton joggers made for active children",
    images: [
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 699,
      currency: "INR"
    },
    sizes: [
      { size: "XS", stock: 11 },
      { size: "S", stock: 17 },
      { size: "M", stock: 14 },
      { size: "L", stock: 8 }
    ],
    published: true
  },

  {
    title: "Kids Floral Dress",
    description: "Colorful floral cotton dress for girls",
    images: [
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 799,
      currency: "INR"
    },
    sizes: [
      { size: "XS", stock: 8 },
      { size: "S", stock: 15 },
      { size: "M", stock: 17 },
      { size: "L", stock: 9 }
    ],
    published: true
  },

  {
    title: "Kids Denim Jeans",
    description: "Durable straight-fit denim jeans designed for kids",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 899,
      currency: "INR"
    },
    sizes: [
      { size: "XS", stock: 9 },
      { size: "S", stock: 14 },
      { size: "M", stock: 18 },
      { size: "L", stock: 7 }
    ],
    published: true
  },

  {
    title: "Kids Printed Sweatshirt",
    description: "Warm printed sweatshirt made from soft fleece fabric",
    images: [
      "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 849,
      currency: "INR"
    },
    sizes: [
      { size: "XS", stock: 10 },
      { size: "S", stock: 16 },
      { size: "M", stock: 14 },
      { size: "L", stock: 8 }
    ],
    published: true
  },

  {
    title: "Kids Cotton Track Pants",
    description: "Comfortable cotton track pants for play and everyday activities",
    images: [
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 649,
      currency: "INR"
    },
    sizes: [
      { size: "XS", stock: 13 },
      { size: "S", stock: 18 },
      { size: "M", stock: 15 },
      { size: "L", stock: 7 }
    ],
    published: true
  },

  // =========================
  // ADULT / UNISEX - 10 PRODUCTS
  // =========================

  {
    title: "Classic Black Hoodie",
    description: "Unisex premium fleece hoodie for adults",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 1499,
      currency: "INR"
    },
    sizes: [
      { size: "S", stock: 12 },
      { size: "M", stock: 19 },
      { size: "L", stock: 17 },
      { size: "XL", stock: 9 }
    ],
    published: true
  },

  {
    title: "Unisex Oversized T-Shirt",
    description: "Heavyweight cotton oversized t-shirt for everyday streetwear",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 799,
      currency: "INR"
    },
    sizes: [
      { size: "S", stock: 11 },
      { size: "M", stock: 20 },
      { size: "L", stock: 18 },
      { size: "XL", stock: 10 }
    ],
    published: true
  },

  {
    title: "Unisex Denim Jacket",
    description: "Classic denim jacket suitable for everyday adult styling",
    images: [
      "https://images.unsplash.com/photo-1527010154944-f224f6e33b96?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 1699,
      currency: "INR"
    },
    sizes: [
      { size: "S", stock: 8 },
      { size: "M", stock: 14 },
      { size: "L", stock: 16 },
      { size: "XL", stock: 7 }
    ],
    published: true
  },

  {
    title: "Unisex Cotton Joggers",
    description: "Relaxed cotton joggers suitable for casual everyday wear",
    images: [
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 899,
      currency: "INR"
    },
    sizes: [
      { size: "S", stock: 12 },
      { size: "M", stock: 18 },
      { size: "L", stock: 16 },
      { size: "XL", stock: 8 }
    ],
    published: true
  },

  {
    title: "Adult Casual Sweatshirt",
    description: "Minimal everyday sweatshirt made from soft cotton fleece",
    images: [
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 1199,
      currency: "INR"
    },
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 17 },
      { size: "L", stock: 15 },
      { size: "XL", stock: 9 }
    ],
    published: true
  },

  {
    title: "Adult Relaxed Fit Jeans",
    description: "Classic relaxed-fit jeans designed for all-day comfort",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 1399,
      currency: "INR"
    },
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 16 },
      { size: "L", stock: 18 },
      { size: "XL", stock: 8 }
    ],
    published: true
  },

  {
    title: "Adult Linen Shirt",
    description: "Breathable linen shirt for relaxed summer styling",
    images: [
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 1199,
      currency: "INR"
    },
    sizes: [
      { size: "S", stock: 8 },
      { size: "M", stock: 15 },
      { size: "L", stock: 16 },
      { size: "XL", stock: 7 }
    ],
    published: true
  },

  {
    title: "Adult Cargo Trousers",
    description: "Utility cargo trousers with a relaxed comfortable fit",
    images: [
      "https://images.unsplash.com/photo-1517445312882-3f8a6f3a4a1a?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 1299,
      currency: "INR"
    },
    sizes: [
      { size: "S", stock: 9 },
      { size: "M", stock: 14 },
      { size: "L", stock: 17 },
      { size: "XL", stock: 10 }
    ],
    published: true
  },

  {
    title: "Adult Casual Shorts",
    description: "Lightweight casual shorts suitable for holidays and summer days",
    images: [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 699,
      currency: "INR"
    },
    sizes: [
      { size: "S", stock: 11 },
      { size: "M", stock: 17 },
      { size: "L", stock: 15 },
      { size: "XL", stock: 8 }
    ],
    published: true
  },

  {
    title: "Adult Premium Polo",
    description: "Premium pique cotton polo shirt with a clean classic design",
    images: [
      "https://images.unsplash.com/photo-1625910513413-5fc45f0c0f6a?auto=format&fit=crop&w=1000&q=80"
    ],
    price: {
      amount: 999,
      currency: "INR"
    },
    sizes: [
      { size: "S", stock: 7 },
      { size: "M", stock: 15 },
      { size: "L", stock: 18 },
      { size: "XL", stock: 9 }
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
    const productsWithSeller = products.map((product) => ({
      ...product,
      seller: seller._id
    }));

    await productModel.insertMany(productsWithSeller);

    console.log("Products seeded successfully");
    console.log("Total products:", productsWithSeller.length);
    console.log("Seller ID:", seller._id);

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Seed failed:", error);

    await mongoose.disconnect();
    process.exit(1);
  }
};

seed();