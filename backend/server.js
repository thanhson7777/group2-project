// server.js
const express = require('express');
const cors = require('cors'); // nếu không cài, xóa dòng này và app.use(cors())
const routes = require('./routes');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const { port, nodeEnv } = require('./config/env');

const app = express();
    
// Middlewares nền tảng
app.use(cors());                 // cho frontend gọi API
app.use(express.json());         // parse JSON body
app.use(express.urlencoded({ extended: true }));

// Health check nhanh ở root (tiện kiểm tra)
app.get('/', (req, res) => {
  res.json({ message: 'Backend OK', env: nodeEnv });
});

// Prefix API
app.use('/api', routes);

// 404 + error handler
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
