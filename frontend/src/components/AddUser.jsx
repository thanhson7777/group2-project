import { useState } from "react";
import api from "../services/api";

export default function AddUser({ onAdded }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      await api.post("/users", { name, email }); // POST /api/users
      setMsg("Tạo thành công!");
      setName(""); setEmail("");
      onAdded?.();              // gọi reload bên ngoài (App)
    } catch (e) {
      setMsg(e?.response?.data?.error || e.message);
    }
  };

  return (
    <form onSubmit={submit} style={{ marginTop: 16 }}>
      <h3>Thêm User</h3>
      <div>
        <label>Họ tên</label><br/>
        <input value={name} onChange={e=>setName(e.target.value)} required />
      </div>
      <div>
        <label>Email</label><br/>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
      </div>
      <button type="submit">Thêm</button>
      {msg && <p style={{ color: msg.startsWith("Tạo thành công") ? "green" : "red" }}>{msg}</p>}
    </form>
  );
}
