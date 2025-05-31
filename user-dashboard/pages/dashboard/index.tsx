"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "../../components/UserCard";
import SearchBar from "../../components/SearchBar";
import { User } from "../../types/user";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Search, Bell, Sun, Moon, Plus } from "lucide-react";
import Link from "next/link";

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUsers(res.data);
        setFilteredUsers(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch users.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.address.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"} min-h-screen flex`}>      
      <aside className="w-64 bg-gray-700 p-6 text-white flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
          <nav className="space-y-4">
            <button className="flex items-center space-x-2 hover:text-purple-400">
              <Home size={20} />
              <span>Home</span>
            </button>
          </nav>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>

          <div className="flex items-center space-x-4">
            <button onClick={toggleDarkMode} className="hover:text-purple-400">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="relative hover:text-purple-400">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 h-2 w-2 rounded-full" />
            </button>
            <img
              src="https://i.pravatar.cc/40"
              alt="Profile"
              className="h-8 w-8 rounded-full border border-white"
            />
            <Link
              href="/dashboard/add"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded flex items-center space-x-2"
            >
              <Plus size={18} />
              <span>Add User</span>
            </Link>
          </div>
        </div>

        <div className="mb-6 relative">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        {loading && <p className="p-4 animate-pulse text-gray-500">Loading users...</p>}
        {error && <p className="p-4 text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredUsers.map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <UserCard user={user} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
