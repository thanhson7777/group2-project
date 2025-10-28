const mongoose = require('mongoose');

// Định nghĩa schema cho người dùng
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // yêu cầu name phải có giá trị
  },
  email: {
    type: String,
    required: true, // yêu cầu email phải có giá trị
    unique: true,   // email phải là duy nhất
    match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, // định dạng email hợp lệ
  },
});

// Tạo model từ schema
const User = mongoose.model('User', userSchema);

module.exports = User;
