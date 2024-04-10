// routes/items.js

const express = require('express');
const router = express.Router();

module.exports = (db) => {
    // Get all items
    router.get('/', (req, res) => {
        db.query('SELECT * FROM items', (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(200).json(results);
        });
    });

    // Get a single item by ID
    router.get('/:id', (req, res) => {
        const { id } = req.params;
        db.query('SELECT * FROM items WHERE item_id = ?', [id], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.length === 0) return res.status(404).json({ message: 'Item not found' });
            res.status(200).json(results[0]);
        });
    });

    // Add a new item
    router.post('/', (req, res) => {
        const newItem = req.body;
        db.query('INSERT INTO items SET ?', newItem, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Item added successfully', itemId: result.insertId });
        });
    });

    // Update an item
    router.put('/:id', (req, res) => {
        const { id } = req.params;
        const updateData = req.body;
        db.query('UPDATE items SET ? WHERE item_id = ?', [updateData, id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Item not found' });
            res.status(200).json({ message: 'Item updated successfully' });
        });
    });

    // Delete an item
    router.delete('/:id', (req, res) => {
        const { id } = req.params;
        db.query('DELETE FROM items WHERE item_id = ?', [id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Item not found' });
            res.status(200).json({ message: 'Item deleted successfully' });
        });
    });

    return router;
};
