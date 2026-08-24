require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pinoHttp = require('pino-http');

const logger = require('./logger');
const authRoutes = require('./routes/authRoutes');
const giftRoutes = require('./routes/giftRoutes');
const searchRoutes = require('./routes/searchRoutes');

const app = express();
const PORT = process.env.PORT || 3060;

app.use(cors());
app.use(express.json());
app.use(pinoHttp({ logger }));

app.use('/api/auth', authRoutes);
app.use('/api/gifts', giftRoutes);
app.use('/api/search', searchRoutes);

app.get('/', (req, res) => {
    res.send('GiftLink API is running');
});

// Basic error handler
app.use((err, req, res, next) => {
    logger.error(err);
    res.status(500).send('Internal server error');
});

app.listen(PORT, () => {
    logger.info(`GiftLink backend listening on port ${PORT}`);
});

module.exports = app;
