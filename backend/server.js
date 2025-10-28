const express = require('express');
const cors = require('cors'); // Cài cors nếu bạn cần cho frontend gọi API
const mongoose = require('mongoose');
const routes = require('./routes');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const { port, nodeEnv, mongodbUri } = require('./config/env'); // mongodbUri sẽ được lấy từ file env

const app = express();

// Middlewares nền tảng
app.use(cors());                 // Cho phép frontend gọi API
app.use(express.json());         // Parse JSON body
app.use(express.urlencoded({ extended: true }));

// Kết nối MongoDB
mongoose.connect(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

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
