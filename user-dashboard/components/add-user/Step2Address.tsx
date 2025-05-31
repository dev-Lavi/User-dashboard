"use client";

import { useState, useEffect } from "react";
import { useAddUser } from "@/context/AddUserContext";
import { motion } from "framer-motion";
import { Home, MapPin, Mailbox, Sun, Moon } from "lucide-react";

const Step2Address = () => {
  const { formData, setFormData, setIsStep2Valid } = useAddUser();
  const [errors, setErrors] = useState<{
    street?: string;
    city?: string;
    zipcode?: string;
  }>({});

  const zipRegex = /^[1-9][0-9]{5}$/;

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!formData.address?.street?.trim()) {
      newErrors.street = "Street is required";
    }

    if (!formData.address?.city?.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.address?.zipcode?.trim()) {
      newErrors.zipcode = "Zip code is required";
    } else if (!zipRegex.test(formData.address.zipcode.trim())) {
      newErrors.zipcode = "Invalid Indian zip code (6 digits, cannot start with 0)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const valid = validate();
    setIsStep2Valid(valid);
    
  }, [
    formData.address?.street,
    formData.address?.city,
    formData.address?.zipcode,
  ]);

  const updateAddressField = (
    field: keyof NonNullable<typeof formData.address>,
    value: string
  ) => {
    setFormData({
      ...formData,
      address: {
        street: formData.address?.street ?? "",
        city: formData.address?.city ?? "",
        zipcode: formData.address?.zipcode ?? "",
        [field]: value,
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
      className="max-w-xl mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 rounded-xl shadow-lg mt-6"
    >
      <h2 className="text-2xl font-bold mb-6 text-purple-600 dark:text-purple-400">
        Step 2: Address
      </h2>

      <div className="mb-5">
        <label className="block font-semibold mb-1 flex items-center gap-2">
          <Home size={18} /> Street
        </label>
        <input
          type="text"
          value={formData.address?.street || ""}
          onChange={(e) => updateAddressField("street", e.target.value)}
          className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errors.street && (
          <p className="text-red-500 text-sm mt-1">{errors.street}</p>
        )}
      </div>

      <div className="mb-5">
        <label className="block font-semibold mb-1 flex items-center gap-2">
          <MapPin size={18} /> City
        </label>
        <input
          type="text"
          value={formData.address?.city || ""}
          onChange={(e) => updateAddressField("city", e.target.value)}
          className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errors.city && (
          <p className="text-red-500 text-sm mt-1">{errors.city}</p>
        )}
      </div>

      <div className="mb-5">
        <label className="block font-semibold mb-1 flex items-center gap-2">
          <Mailbox size={18} /> Zip Code
        </label>
        <input
          type="text"
          value={formData.address?.zipcode || ""}
          onChange={(e) => updateAddressField("zipcode", e.target.value)}
          className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errors.zipcode && (
          <p className="text-red-500 text-sm mt-1">{errors.zipcode}</p>
        )}
      </div>
    </motion.div>
  );
};

export default Step2Address;
