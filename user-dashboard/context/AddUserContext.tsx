import React, { createContext, useContext, useState } from "react"; 
import { User } from "../types/user";

interface AddUserContextType {
  formData: Partial<User>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<User>>>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  isStep1Valid: boolean;
  setIsStep1Valid: React.Dispatch<React.SetStateAction<boolean>>;
  isStep2Valid: boolean;
  setIsStep2Valid: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddUserContext = createContext<AddUserContextType | undefined>(undefined);

export const AddUserProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<Partial<User>>({
    name: "",
    email: "",
    address: {
      street: "",
      city: "",
      zipcode: "",
    },
  });

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isStep1Valid, setIsStep1Valid] = useState<boolean>(false);
  const [isStep2Valid, setIsStep2Valid] = useState<boolean>(false);

  return (
    <AddUserContext.Provider
      value={{
        formData,
        setFormData,
        currentStep,
        setCurrentStep,
        isStep1Valid,
        setIsStep1Valid,
        isStep2Valid,
        setIsStep2Valid,
      }}
    >
      {children}
    </AddUserContext.Provider>
  );
};

export const useAddUser = () => {
  const context = useContext(AddUserContext);
  if (!context) {
    throw new Error("useAddUser must be used within an AddUserProvider");
  }
  return context;
};
