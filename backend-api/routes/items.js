const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Item = require('../models/item');

router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json(item);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') return res.status(404).json({ message: 'Item not found' });
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post(
    '/',
    body('name').isString().notEmpty(),
    body('brand').isString().notEmpty(),
    async (req, res) => {
        console.log('Received POST request to /items');
        console.log('Request body:', req.body); // VERY IMPORTANT

        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        try {
            const newItem = new Item(req.body);
            const item = await newItem.save();
            console.log('Item saved to database:', item);
            res.status(201).json(item);
            console.log('Sent response:', item);
        } catch (err) {
            console.error('Error saving item:', err);
            res.status(500).json({ message: 'Server error: ' + err.message }); // Include error message
        }
    }
);

router.put('/:id', async (req, res) => {
    try {
        let item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(item);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') return res.status(404).json({ message: 'Item not found' });
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        await Item.findByIdAndRemove(req.params.id);
        res.status(204).send();
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') return res.status(404).json({ message: 'Item not found' });
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;