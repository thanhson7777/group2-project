const User = require('../models/User'); // Import model User

// GET /api/users - Lấy tất cả người dùng
const getUsers = async (req, res) => {
  try {
    const users = await User.find();  // Lấy tất cả người dùng từ MongoDB
    res.json(users);  // Trả về danh sách người dùng dưới dạng JSON
  } catch (err) {
    res.status(500).json({ message: err.message });  // Trả về lỗi nếu có
  }
};

// POST /api/users - Tạo người dùng mới
const createUser = async (req, res) => {
  const { name, email } = req.body;

  // Validate tối thiểu
  if (!name || !email) {
    return res.status(400).json({ error: 'name và email là bắt buộc' });
  }

  // Check trùng email
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    return res.status(409).json({ error: 'Email đã tồn tại' });
  }

  // Tạo người dùng mới
  const newUser = new User({
    name: name.trim(),
    email: email.trim()
  });

  try {
    const savedUser = await newUser.save();  // Lưu người dùng vào MongoDB
    res.status(201)  // Trả về mã trạng thái 201 (Created)
       .location(`/api/users/${savedUser.id}`)
       .json(savedUser);  // Trả về thông tin người dùng mới tạo
  } catch (err) {
    res.status(400).json({ message: err.message });  // Trả về lỗi nếu có
  }
};

module.exports = { getUsers, createUser };
