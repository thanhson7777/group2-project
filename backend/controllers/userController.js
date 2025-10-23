// controllers/userController.js

// MẢNG TẠM (giữ trong bộ nhớ khi server đang chạy)
let users = [
  { id: 1, name: 'Nguyễn Văn A', email: 'a@gmail.com' },
  { id: 2, name: 'Trần Thị B', email: 'b@gmail.com' }
];

// GET /api/users
const getUsers = (req, res) => {
  res.json(users);
};

// POST /api/users
const createUser = (req, res) => {
  const { name, email } = req.body;

  // Validate tối thiểu
  if (!name || !email) {
    return res.status(400).json({ error: 'name và email là bắt buộc' });
  }

  // Check trùng email
  if (users.some(u => u.email.toLowerCase() === String(email).toLowerCase())) {
    return res.status(409).json({ error: 'Email đã tồn tại' });
  }

  // Tạo id đơn giản (demo): timestamp
  const newUser = {
    id: Date.now(),
    name: String(name).trim(),
    email: String(email).trim()
  };

  users.push(newUser);

  // Chuẩn REST: trả 201 + Location
  res.status(201)
     .location(`/api/users/${newUser.id}`)
     .json(newUser);
};

module.exports = { getUsers, createUser };