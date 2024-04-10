// routes/bins.js

const express = require('express');
const router = express.Router();

module.exports = (db) => {
    // Get all bins
    router.get('/', (req, res) => {
        db.query('SELECT * FROM bins', (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(200).json(results);
        });
    });

    // Get a single bin by ID
    router.get('/:id', (req, res) => {
        const { id } = req.params;
        db.query('SELECT * FROM bins WHERE bin_id = ?', [id], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.length === 0) return res.status(404).json({ message: 'Bin not found' });
            res.status(200).json(results[0]);
        });
    });

    // Add a new bin
    router.post('/', (req, res) => {
        const newBin = req.body;
        db.query('INSERT INTO bins SET ?', newBin, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Bin added successfully', binId: result.insertId });
        });
    });

    // Update a bin
    router.put('/:id', (req, res) => {
        const { id } = req.params;
        const updateData = req.body;
        db.query('UPDATE bins SET ? WHERE bin_id = ?', [updateData, id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Bin not found' });
            res.status(200).json({ message: 'Bin updated successfully' });
        });
    });

    // Delete a bin
    router.delete('/:id', (req, res) => {
        const { id } = req.params;
        db.query('DELETE FROM bins WHERE bin_id = ?', [id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Bin not found' });
            res.status(200).json({ message: 'Bin deleted successfully' });
        });
    });

    return router;
};
