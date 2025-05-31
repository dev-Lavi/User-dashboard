"use client"; 

import { useState, useEffect } from "react";
import { useAddUser } from "@/context/AddUserContext";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const Step1BasicInfo = () => {
  const { formData, setFormData, setIsStep1Valid } = useAddUser();
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [darkMode, setDarkMode] = useState(true);

  const nameRegex = /^[a-zA-Z\s-]{2,}$/;
  const emailRegex = /\S+@\S+\.\S+/;

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!formData.name?.trim()) {
      newErrors.name = "Name is required";
    } else if (!nameRegex.test(formData.name.trim())) {
      newErrors.name = "Name is invalid (only letters, spaces, hyphens, min 2 chars)";
    }

    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Email is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const valid = validate();
    setIsStep1Valid(valid);
  }, [formData.name, formData.email]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Prevent default form submission behavior
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 rounded-xl shadow-lg mt-6">      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold mb-6 text-purple-600 dark:text-purple-400">Step 1: Basic Info</h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="max-w-xl mx-auto bg-gray-800 dark:bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        {/* Wrap inputs in a form to enable Enter submission */}
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Name</label>
            <input
              type="text"
              value={formData.name || ""}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border border-gray-600 bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              value={formData.email || ""}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border border-gray-600 bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>
          
          {/* Hidden submit button for Enter key functionality */}
          <button type="submit" className="hidden">Submit</button>
        </form>
      </motion.div>
    </div>
  );
};

export default Step1BasicInfo;