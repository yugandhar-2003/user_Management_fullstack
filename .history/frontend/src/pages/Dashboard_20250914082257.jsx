import React, { useMemo, useState } from "react";
import { useUsers } from "../context/UserContext";
import UserCard from "../components/UserCard";
import CreateUserModal from "./CreateUserModal";

export default function Dashboard() {
  const { users, loading } = useUsers();
  const [query, setQuery] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) => u.name.toLowerCase().includes(q));
  }, [users, query]);

  return (
    <div className="p-6">
      {/* Search + Create Section */}
      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center mb-6">
        <input
          className="w-full md:w-1/3 rounded-xl border border-gray-300 bg-white px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          placeholder="🔍 Search by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="ml-auto rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-5 py-2 text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-transform"
          onClick={() => setShowCreate(true)}
        >
          ➕ Create New User
        </button>
      </div>

      {/* User Cards Section */}
      {loading ? (
        <div className="text-center text-lg font-semibold text-gray-600 animate-pulse">
          Loading users...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((user) => (
            <div
              key={user.id}
              className="transition-transform hover:scale-105"
            >
              <UserCard user={user} />
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showCreate && <CreateUserModal onClose={() => setShowCreate(false)} />}
    </div>
  );
}
