const express = require('express');
const { getUsers, createUser } = require('../controllers/userController');
const router = express.Router();

// Route GET - Lấy tất cả người dùng
router.get('/', getUsers);   // GET /api/users

// Route POST - Tạo người dùng mới
router.post('/', createUser); // POST /api/users

module.exports = router;
