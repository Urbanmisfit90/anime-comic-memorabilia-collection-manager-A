const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Item = require('../models/item'); // Import the Item model

// GET all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// GET a single item by ID
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(item);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') { // Check if it's an invalid ObjectId
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(500).send('Server Error');
    }
});

// POST a new item
router.post(
    '/',
    body('name').isString().notEmpty(),
    body('price').isNumeric().isFloat({ gt: 0 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const newItem = new Item(req.body);
            const item = await newItem.save();
            res.status(201).json(item);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// PUT (update) an item by ID
router.put('/:id', async (req, res) => {
    try {
        let item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true }); // new: true returns the updated document

        res.json(item);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(500).send('Server Error');
    }
});

// DELETE an item by ID
router.delete('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        await Item.findByIdAndRemove(req.params.id);

        res.status(204).send();
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;