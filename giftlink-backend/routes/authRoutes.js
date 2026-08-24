const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const connectToDatabase = require('../util/import-mongo/db');
const logger = require('../logger');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

// POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('users');

        const { firstName, lastName, email, password } = req.body;

        const existingEmail = await collection.findOne({ email });
        if (existingEmail) {
            logger.error('Email id already exists');
            return res.status(400).json({ error: 'Email id already exists' });
        }

        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(password, salt);
        const newUser = {
            email,
            firstName,
            lastName,
            password: hash,
            createdAt: new Date()
        };

        const result = await collection.insertOne(newUser);

        const payload = { user: { id: result.insertedId } };
        const authtoken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        logger.info('User registered successfully');
        res.json({ authtoken, email, firstName, lastName });
    } catch (e) {
        logger.error(e);
        return res.status(500).send('Internal server error');
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('users');

        const { email, password } = req.body;
        const theUser = await collection.findOne({ email });

        if (!theUser) {
            logger.error('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await bcryptjs.compare(password, theUser.password);
        if (!isMatch) {
            logger.error('Passwords do not match');
            return res.status(404).json({ error: 'Wrong password' });
        }

        const payload = { user: { id: theUser._id.toString() } };
        const authtoken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        const userName = theUser.firstName;
        const userEmail = theUser.email;

        logger.info('User logged in successfully');
        res.json({ authtoken, userName, userEmail });
    } catch (e) {
        logger.error(e);
        return res.status(500).send('Internal server error');
    }
});

// PUT /api/auth/update - requires email in header
router.put(
    '/update',
    [body('firstName').optional().isString(), body('lastName').optional().isString()],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                logger.error('Validation errors in update request', errors.array());
                return res.status(400).json({ errors: errors.array() });
            }

            const email = req.headers.email;
            if (!email) {
                logger.error('Email not found in the request headers');
                return res.status(400).json({ error: 'Email not found in the request headers' });
            }

            const db = await connectToDatabase();
            const collection = db.collection('users');
            const existingUser = await collection.findOne({ email });

            if (!existingUser) {
                logger.error('User not found');
                return res.status(404).json({ error: 'User not found' });
            }

            existingUser.updatedAt = new Date();

            const updatedUser = await collection.findOneAndUpdate(
                { email },
                { $set: { firstName: req.body.firstName, lastName: req.body.lastName, updatedAt: existingUser.updatedAt } },
                { returnDocument: 'after' }
            );

            const payload = { user: { id: updatedUser._id ? updatedUser._id.toString() : existingUser._id.toString() } };
            const authtoken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

            logger.info('User updated successfully');
            res.json({ authtoken });
        } catch (e) {
            logger.error(e);
            return res.status(500).send('Internal server error');
        }
    }
);

module.exports = router;
