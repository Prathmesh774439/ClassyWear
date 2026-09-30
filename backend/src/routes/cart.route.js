import express from 'express';
import { addToCart, clearCart, getCart, removeCartItem, updateCartItem } from '../controllers/cart.controller.js';
import { cartValidation } from '../validations/cart.validations.js';
import { authenticate } from '../middleware/auth.middleware.js';

const cartRouter = express.Router();

cartRouter.get('/', authenticate, getCart);
cartRouter.post('/add', authenticate, cartValidation, addToCart);
cartRouter.patch('/item/:itemId', authenticate, updateCartItem);
cartRouter.delete('/item/:itemId', authenticate, removeCartItem);
cartRouter.delete('/clear', authenticate, clearCart);

export default cartRouter;
