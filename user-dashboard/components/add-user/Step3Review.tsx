"use client";

import { useEffect } from "react";
import { useAddUser } from "@/context/AddUserContext";
import { motion } from "framer-motion";
import { ClipboardCheck } from "lucide-react";

const Step3Review = () => {
  const { formData } = useAddUser();

  useEffect(() => {
    console.log("Reviewing form data before submission:", formData);
  }, [formData]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 md:p-8 bg-white dark:bg-zinc-900 shadow-lg rounded-xl border border-gray-200 dark:border-zinc-700"
    >
      <div className="flex items-center gap-2 mb-6">
        <ClipboardCheck className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        <h2 className="text-xl font-bold text-zinc-800 dark:text-white">Step 3: Review & Confirm</h2>
      </div>

      <div className="mb-6 p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700">
        <h3 className="font-semibold text-lg text-purple-600 dark:text-purple-400 mb-2">Basic Info</h3>
        <p className="text-zinc-700 dark:text-zinc-300"><strong>Name:</strong> {formData.name}</p>
        <p className="text-zinc-700 dark:text-zinc-300"><strong>Email:</strong> {formData.email}</p>
      </div>

      <div className="mb-6 p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700">
        <h3 className="font-semibold text-lg text-purple-600 dark:text-purple-400 mb-2">Address</h3>
        <p className="text-zinc-700 dark:text-zinc-300"><strong>Street:</strong> {formData.address?.street}</p>
        <p className="text-zinc-700 dark:text-zinc-300"><strong>City:</strong> {formData.address?.city}</p>
        <p className="text-zinc-700 dark:text-zinc-300"><strong>Zip Code:</strong> {formData.address?.zipcode}</p>
      </div>

      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Please verify the above details before clicking submit.
      </p>
    </motion.div>
  );
};

export default Step3Review;
