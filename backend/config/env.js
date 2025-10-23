// config/env.js
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3001,
};

module.exports = config;