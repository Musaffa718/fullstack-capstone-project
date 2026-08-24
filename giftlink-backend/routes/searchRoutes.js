const express = require('express');
const connectToDatabase = require('../util/import-mongo/db');
const logger = require('../logger');

const router = express.Router();

// GET /api/search?name=&category=&condition=&age_years=
router.get('/', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('gifts');

        const { name, category, condition, age_years } = req.query;
        const query = {};

        if (name) {
            query.name = { $regex: name, $options: 'i' };
        }
        if (category) {
            query.category = category;
        }
        if (condition) {
            query.condition = condition;
        }
        if (age_years) {
            query.age_years = { $lte: Number(age_years) };
        }

        const results = await collection.find(query).toArray();
        res.json(results);
    } catch (e) {
        logger.error('Error searching gifts', e);
        next(e);
    }
});

module.exports = router;
