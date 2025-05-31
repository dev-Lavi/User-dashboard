"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "../../components/UserCard";
import SearchBar from "../../components/SearchBar";
import { User } from "../../types/user";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Bell, Sun, Moon, Plus, Menu, X } from "lucide-react";
import Link from "next/link";

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div
      className={`${
        darkMode ? "bg-gray-1000 text-white" : "bg-gray-100 text-gray-900"
      } min-h-screen flex flex-col md:flex-row`}
    >
      {/* Mobile Menu Button - Now on left side */}
      <div className="md:hidden p-4 flex items-center bg-gray-800 text-white">
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-white focus:outline-none mr-4"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold">Dashboard</h1>
      </div>

      {/* Sidebar with Admin Profile */}
      <aside
        className={`${
          sidebarOpen
            ? "fixed inset-0 z-50 translate-x-0"
            : "fixed -translate-x-full"
        } md:flex md:translate-x-0 md:w-64 md:relative bg-gray-800 p-6 text-white flex-col justify-between transition-transform duration-300`}
      >
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-white"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="space-y-4 mb-8">
            <button className="flex items-center space-x-2 hover:text-purple-400 w-full p-2 rounded-lg">
              <Home size={20} />
              <span>Home</span>
            </button>
            <Link
              href="/dashboard/add"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded flex items-center space-x-2 w-full"
              onClick={() => setSidebarOpen(false)}
            >
              <Plus size={18} />
              <span>Add User</span>
            </Link>
          </nav>
        </div>

        {/* Admin Profile Section */}
        <div className="mt-auto pt-6 border-t border-gray-700">
          <div className="flex items-center space-x-3">
            <img
              src="https://i.pravatar.cc/40"
              alt="Admin Profile"
              className="h-10 w-10 rounded-full border-2 border-purple-500"
            />
            <div>
              <p className="font-medium">Admin User</p>
              <p className="text-sm text-gray-400">admin@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h1 className="text-2xl md:text-3xl font-bold hidden md:block">
            Dashboard
          </h1>

          <div className="flex items-center space-x-4 ml-auto">
            <button
              onClick={toggleDarkMode}
              className="hover:text-purple-500 transition-colors"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="relative hover:text-purple-500">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 h-2 w-2 rounded-full" />
            </button>
            <div className="hidden md:flex items-center space-x-2">
              <img
                src="https://i.pravatar.cc/40"
                alt="Profile"
                className="h-8 w-8 rounded-full border border-white"
              />
              <span>Admin</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        {loading && (
          <p className="p-4 animate-pulse text-gray-500 dark:text-gray-400">
            Loading users...
          </p>
        )}
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
                <UserCard user={user} darkMode={darkMode} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;