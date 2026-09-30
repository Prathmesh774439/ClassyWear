import {body, validationResult} from 'express-validator';


export const cartValidation = [
    body('productId')
    .exists().withMessage('Product id is required').bail()
    .isString().withMessage('Product id must be a string').bail()
    .isMongoId().withMessage('Invalid product id').bail(),

    body('quantity')
    .exists().withMessage('Quantity is required').bail()
    .isNumeric().withMessage('Quantity must be a number').bail()
    .isInt({min: 1}).withMessage('Quantity must be a positive integer').bail(),

    body(['size', 'selectedSize'])
    .custom((value, { req }) => {
        const selectedSize = req.body.selectedSize || req.body.size;
        if (!selectedSize) {
            throw new Error('Size is required');
        }
        if (!['XS', 'S', 'M', 'L', 'XL', 'XXL'].includes(selectedSize)) {
            throw new Error('Invalid size');
        }
        return true;
    }),

    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                errors: errors.array().map((error) => ({
                    field: error.path,
                    message: error.msg
                }))
            });
        }
        next();
    }
]
    