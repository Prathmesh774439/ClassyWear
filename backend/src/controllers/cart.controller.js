import cartModel from "../models/cart.model.js"
import productModel from "../models/product.model.js"

const getUserId = (req) => req.user?.userId || req.user?.id || req.user?._id;

const buildCartResponse = async (cart) => {
    const populatedCart = await cart.populate({
        path: 'products.productId',
        select: 'title description images price sizes seller published'
    });

    const items = populatedCart.products.map((item) => {
        const selectedSize = item.selectedSize || item.size || 'M';
        const product = item.productId || null;
        const unitPrice = product?.price?.amount || 0;

        return {
            _id: item._id,
            productId: product?._id || item.productId,
            selectedSize,
            quantity: item.quantity,
            product,
            subtotal: unitPrice * item.quantity
        };
    });

    const total = items.reduce((sum, item) => sum + item.subtotal, 0);

    return {
        _id: populatedCart._id,
        userId: populatedCart.userId,
        items,
        totalPrice: total,
        itemCount: items.length
    };
};

export async function addToCart(req, res) {
    try {
        const userId = getUserId(req);
        if (!userId) {
            return res.status(401).json({ success: false, message: 'User is not authenticated' });
        }

        const { productId, quantity, size, selectedSize } = req.body;
        const chosenSize = selectedSize || size;
        const requestedQuantity = Number(quantity || 1);

        if (!productId) {
            return res.status(400).json({ success: false, message: 'Product id is required' });
        }

        if (!chosenSize) {
            return res.status(400).json({ success: false, message: 'Size is required' });
        }

        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        const sizeEntry = product.sizes.find((item) => item.size === chosenSize);
        if (!sizeEntry) {
            return res.status(400).json({ success: false, message: 'Invalid size selected' });
        }

        if (requestedQuantity < 1 || !Number.isInteger(requestedQuantity)) {
            return res.status(400).json({ success: false, message: 'Quantity must be a positive integer' });
        }

        if (sizeEntry.stock < requestedQuantity) {
            return res.status(400).json({ success: false, message: 'Insufficient stock for the selected size' });
        }

        let cart = await cartModel.findOne({ userId });
        if (!cart) {
            cart = await cartModel.create({ userId, products: [] });
        }

        const existingItem = cart.products.find(
            (item) => item.productId.toString() === productId && (item.selectedSize || item.size) === chosenSize
        );

        if (existingItem) {
            const nextQuantity = existingItem.quantity + requestedQuantity;
            if (nextQuantity > sizeEntry.stock) {
                return res.status(400).json({
                    success: false,
                    message: 'Requested quantity exceeds available stock for this size'
                });
            }

            existingItem.quantity = nextQuantity;
            await cart.save();

            return res.status(200).json({
                success: true,
                message: 'Cart item quantity updated successfully',
                cart: await buildCartResponse(cart)
            });
        }

        cart.products.push({
            productId,
            selectedSize: chosenSize,
            quantity: requestedQuantity
        });
        await cart.save();

        return res.status(200).json({
            success: true,
            message: 'Product added to cart successfully',
            cart: await buildCartResponse(cart)
        });
    } catch (error) {
        console.error('Add to cart error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to add product to cart',
            error: error.message
        });
    }
}

export async function getCart(req, res) {
    try {
        const userId = getUserId(req);
        if (!userId) {
            return res.status(401).json({ success: false, message: 'User is not authenticated' });
        }

        let cart = await cartModel.findOne({ userId }).populate({
            path: 'products.productId',
            select: 'title description images price sizes published'
        });

        if (!cart) {
            cart = await cartModel.create({ userId, products: [] });
        }

        const cartResponse = await buildCartResponse(cart);

        return res.status(200).json({
            success: true,
            message: 'Cart retrieved successfully',
            cart: cartResponse
        });
    } catch (error) {
        console.error('Get cart error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch cart',
            error: error.message
        });
    }
}

export async function updateCartItem(req, res) {
    try {
        const userId = getUserId(req);
        const { itemId } = req.params;
        const { quantity, selectedSize } = req.body;

        if (!userId) {
            return res.status(401).json({ success: false, message: 'User is not authenticated' });
        }

        const cart = await cartModel.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        const item = cart.products.id(itemId);
        if (!item) {
            return res.status(404).json({ success: false, message: 'Cart item not found' });
        }

        if (quantity !== undefined) {
            const nextQty = Number(quantity);
            if (!Number.isInteger(nextQty) || nextQty < 1) {
                return res.status(400).json({ success: false, message: 'Quantity must be a positive integer' });
            }
            item.quantity = nextQty;
        }

        if (selectedSize) {
            item.selectedSize = selectedSize;
        }

        await cart.save();

        return res.status(200).json({
            success: true,
            message: 'Cart item updated successfully',
            cart: await buildCartResponse(cart)
        });
    } catch (error) {
        console.error('Update cart item error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to update cart item',
            error: error.message
        });
    }
}

export async function removeCartItem(req, res) {
    try {
        const userId = getUserId(req);
        const { itemId } = req.params;

        if (!userId) {
            return res.status(401).json({ success: false, message: 'User is not authenticated' });
        }

        const cart = await cartModel.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        const itemExists = cart.products.some((item) => item._id.toString() === itemId);
        if (!itemExists) {
            return res.status(404).json({ success: false, message: 'Cart item not found' });
        }

        cart.products = cart.products.filter((item) => item._id.toString() !== itemId);
        await cart.save();

        return res.status(200).json({
            success: true,
            message: 'Cart item removed successfully',
            cart: await buildCartResponse(cart)
        });
    } catch (error) {
        console.error('Remove cart item error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to remove cart item',
            error: error.message
        });
    }
}

export async function clearCart(req, res) {
    try {
        const userId = getUserId(req);
        if (!userId) {
            return res.status(401).json({ success: false, message: 'User is not authenticated' });
        }

        const cart = await cartModel.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        cart.products = [];
        await cart.save();

        return res.status(200).json({
            success: true,
            message: 'Cart cleared successfully',
            cart: await buildCartResponse(cart)
        });
    } catch (error) {
        console.error('Clear cart error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to clear cart',
            error: error.message
        });
    }
}
