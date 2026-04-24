import axios from "axios";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

function PostIndex() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<Omit<User, "id">>({
    name: "",
    email: "",
    password: "",
  });
  const [editId, setEditId] = useState<number | null>(null);

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.password) return;

    if (editId !== null) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editId ? { ...u, ...form } : u)),
      );
      setEditId(null);
    } else {
      const newUser: User = {
        id: Date.now(),
        ...form,
      };
      setUsers((prev) => [...prev, newUser]);
    }

    setForm({ name: "", email: "", password: "" });
  };

  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleEdit = (user: User) => {
    setForm({
      name: user.name,
      email: user.email,
      password: user.password,
    });
    setEditId(user.id);
  };

  const fetchUsers = () => {
    axios.get("http://localhost:8000/api/posts").then((res) => {
      setUsers(res.data);
    });
  };

useEffect(() => {
  fetchUsers(); 

  const interval = setInterval(() => {
    fetchUsers(); 
  }, 3000);

  return () => clearInterval(interval); 
}, []);

  console.log("user data", users);
  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
        CRUD Table UI 🚀
      </h2>

      {/* FORM */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-6 space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
        />

        <button
          onClick={handleSubmit}
          className={`w-full py-2 rounded-md text-white font-semibold transition ${
            editId
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {editId ? "Update User" : "Add User"}
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Password</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-6 text-gray-500">
                  No users yet
                </td>
              </tr>
            ) : (
              users.map((u, index) => (
                <tr
                  key={u.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-indigo-50 transition`}
                >
                  <td className="p-3">{u?.id}</td>
                  <td className="p-3 font-medium">{u?.name}</td>
                  <td className="p-3">{u?.email}</td>
                  <td className="p-3">{u?.password}</td>

                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(u)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(u.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PostIndex;
