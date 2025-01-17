import express, { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import Item from '../models/item';
import { Types } from 'mongoose';

const router = express.Router();

// Correct asyncHandler function with explicit return type
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>) => (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
};

router.get('/', asyncHandler(async (req: Request, res: Response) => {
    const query = req.query;
    const items = await Item.find(query);
    return res.json(items); // Explicit return
}));

router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Item ID' });
    }

    const item = await Item.findById(id);

    if (!item) {
        return res.status(404).json({ message: 'Item not found' });
    }

    return res.json(item); // Explicit return
}));

router.post('/',
    body('name').isString().notEmpty(),
    body('brand').isString().notEmpty(),
    asyncHandler(async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const newItem = new Item(req.body);
        const item = await newItem.save();
        return res.status(201).json(item); // Explicit return
    })
);

router.put('/:id', asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Item ID' });
    }

    const item = await Item.findByIdAndUpdate(id, req.body, { new: true });
    if (!item) {
        return res.status(404).json({ message: 'Item not found' });
    }
    return res.json(item); // Explicit return
}));

router.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Item ID' });
    }
    const item = await Item.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    return res.status(204).send(); // Explicit return
}));

export default router;