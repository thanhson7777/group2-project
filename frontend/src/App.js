import { useState } from "react";
import "./App.css";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";

function App() {
  // “k” chỉ để trigger re-render UserList sau khi thêm user
  const [k, setK] = useState(0);

  return (
    <div className="App" style={{ padding: 24, textAlign: "left" }}>
      <h1>Users – React Frontend</h1>
      <UserList key={k} />
      <AddUser onAdded={() => setK(x => x + 1)} />
    </div>
  );
}

export default App;
