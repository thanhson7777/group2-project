import { useEffect, useState } from "react";
import api from "../services/api";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/users"); // GET /api/users
      setUsers(res.data);
      setErr("");
    } catch (e) {
      setErr(e?.response?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  if (loading) return <p>Đang tải...</p>;
  if (err) return <p style={{ color: "red" }}>Lỗi: {err}</p>;

  return (
    <div>
      <h2>Danh sách User</h2>
      <ul>
        {users.map(u => (
          <li key={u.id}><b>{u.name}</b> — {u.email}</li>
        ))}
      </ul>
      <button onClick={load}>Tải lại</button>
    </div>
  );
}
