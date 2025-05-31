"use client";

import { useState } from "react";
import { AddUserProvider, useAddUser } from "../../context/AddUserContext";
import Step1BasicInfo from "../../components/add-user/Step1BasicInfo";
import Step2Address from "../../components/add-user/Step2Address";
import Step3Review from "../../components/add-user/Step3Review";
import Link from "next/link";

const StepRenderer = () => {
  const {
    currentStep,
    setCurrentStep,
    formData,
    isStep1Valid,
    isStep2Valid,
  } = useAddUser();

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    console.log("Submitted user data:", formData);
    alert("User data submitted! Check console for output.");
    setSubmitted(true); 
  };

  const canProceed =
    (currentStep === 1 && isStep1Valid) || (currentStep === 2 && isStep2Valid);

  return (
    <div className="relative p-4 max-w-xl mx-auto">
    
    {submitted && currentStep === 3 && (
      <Link
        href="/dashboard"
        className="absolute top-4 right-4 text-sm text-blue-600 hover:text-blue-800 font-medium underline"
      >
        ← Back to Dashboard
      </Link>
    )}

    <h1 className="text-2xl font-bold mb-4">Add New User</h1>

    {currentStep === 1 && <Step1BasicInfo />}
    {currentStep === 2 && <Step2Address />}
    {currentStep === 3 && <Step3Review />}

    <div className="mt-4 flex justify-between">
      <button
        className="px-4 py-2 bg-gray-500 rounded"
        onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
        disabled={currentStep === 1}
      >
        Back
      </button>

      {currentStep < 3 && (
        <button
          className={`px-4 py-2 rounded text-white ${
            canProceed ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={() => canProceed && setCurrentStep((prev) => Math.min(prev + 1, 3))}
          disabled={!canProceed}
        >
          Next
        </button>
      )}

      {currentStep === 3 && !submitted && (
        <button
          className="px-4 py-2 bg-green-600 text-white rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
      )}
    </div>
  </div>
  );
};

const AddUserPage = () => (
  <AddUserProvider>
    <StepRenderer />
  </AddUserProvider>
);

export default AddUserPage;