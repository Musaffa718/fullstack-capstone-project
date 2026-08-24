const express = require('express');
const connectToDatabase = require('../util/import-mongo/db');
const logger = require('../logger');

const router = express.Router();

// GET /api/gifts - fetch all gifts
router.get('/', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('gifts');
        const gifts = await collection.find({}).toArray();
        res.json(gifts);
    } catch (e) {
        logger.error('Error fetching gifts', e);
        next(e);
    }
});

// GET /api/gifts/:id - fetch a single gift's details
router.get('/:id', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('gifts');
        const gift = await collection.findOne({ id: req.params.id });

        if (!gift) {
            logger.error('Gift not found');
            return res.status(404).json({ error: 'Gift not found' });
        }

        res.json(gift);
    } catch (e) {
        logger.error('Error fetching gift details', e);
        next(e);
    }
});

// POST /api/gifts - add a new gift
router.post('/', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('gifts');
        const result = await collection.insertOne(req.body);
        res.status(201).json(result);
    } catch (e) {
        logger.error('Error adding gift', e);
        next(e);
    }
});

module.exports = router;
