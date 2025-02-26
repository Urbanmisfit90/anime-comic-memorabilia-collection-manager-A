import express, { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import Item from '../models/item.js';
import { Types } from 'mongoose';

const router = express.Router();

// Async handler function for cleaner try-catch
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<Response>) =>
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

// Helper function to validate ObjectId
const isValidObjectId = (id: string): boolean => Types.ObjectId.isValid(id);

// Get all items with optional query filters
router.get('/', asyncHandler(async (req: Request, res: Response) => {
    const items = await Item.find(req.query);
    return res.json(items);
}));

// Get a single item by ID
router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid Item ID' });
    }

    const item = await Item.findById(id);
    if (!item) {
        return res.status(404).json({ message: 'Item not found' });
    }

    return res.json(item);
}));

// Create a new item with validation
router.post('/',
    [
        body('name').isString().notEmpty().withMessage('Name is required and must be a string'),
        body('brand').isString().notEmpty().withMessage('Brand is required and must be a string')
    ],
    asyncHandler(async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const item = new Item(req.body);
        const savedItem = await item.save();
        return res.status(201).json(savedItem);
    })
);

// Update an existing item by ID
router.put('/:id', asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid Item ID' });
    }

    const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedItem) {
        return res.status(404).json({ message: 'Item not found' });
    }

    return res.json(updatedItem);
}));

// Delete an item by ID
router.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid Item ID' });
    }

    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
        return res.status(404).json({ message: 'Item not found' });
    }

    return res.status(204).send();
}));

export default router;