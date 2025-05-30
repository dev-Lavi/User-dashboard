import React, { createContext, useContext, useState } from 'react';
import { User } from '../types/user';

interface AddUserContextType {
  user: Partial<User>;
  setUser: React.Dispatch<React.SetStateAction<Partial<User>>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const AddUserContext = createContext<AddUserContextType | undefined>(undefined);

export const AddUserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Partial<User>>({
    name: '',
    email: '',
    address: {
      street: '',
      city: '',
      zipcode: ''
    }
  });

  const [step, setStep] = useState<number>(1);

  return (
    <AddUserContext.Provider value={{ user, setUser, step, setStep }}>
      {children}
    </AddUserContext.Provider>
  );
};

export const useAddUser = () => {
  const context = useContext(AddUserContext);
  if (!context) {
    throw new Error('useAddUser must be used within an AddUserProvider');
  }
  return context;
};
