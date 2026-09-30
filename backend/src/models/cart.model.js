import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
        min: 1
    },
    selectedSize: {
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        required: function () {
            return !this.size;
        }
    },
    size: {
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        required: function () {
            return !this.selectedSize;
        }
    }
}, { _id: true });

const cartSchema = new mongoose.Schema({
    products: [cartItemSchema],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
}, { timestamps: true });

const cartModel = mongoose.model('cart', cartSchema);

export default cartModel;