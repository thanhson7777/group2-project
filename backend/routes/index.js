// routes/index.js
const express = require('express');
const healthRoute = require('./health.route');

const router = express.Router();

router.use('/health', healthRoute);
// sau này: router.use('/users', usersRoute)

module.exports = router;
