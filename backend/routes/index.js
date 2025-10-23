// routes/index.js
const express = require('express');
const healthRoute = require('./health.route');
const userRoute = require('./user');

const router = express.Router();

router.use('/health', healthRoute);
router.use('/users', userRoute); 

module.exports = router;
