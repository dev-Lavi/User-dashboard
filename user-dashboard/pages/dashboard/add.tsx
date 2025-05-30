import { AddUserProvider, useAddUser } from '../../context/AddUserContext';
import Step1BasicInfo from '../../components/add-user/Step1BasicInfo';
import Step2Address from '../../components/add-user/Step2Address';
import Step3Review from '../../components/add-user/Step3Review';
import Link from 'next/link';

const StepRenderer = () => {
  const { step, setStep } = useAddUser();

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New User</h1>

      {step === 1 && <Step1BasicInfo />}
      {step === 2 && <Step2Address />}
      {step === 3 && <Step3Review />}

      <div className="mt-4 flex justify-between">
        <button
          className="px-4 py-2 bg-gray-200 rounded"
          onClick={() => setStep(prev => Math.max(prev - 1, 1))}
          disabled={step === 1}
        >
          Back
        </button>

        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setStep(prev => Math.min(prev + 1, 3))}
          disabled={step === 3}
        >
          Next
        </button>
      </div>

      <Link href="/dashboard" className="text-blue-500 underline mt-6 block">
        ← Back to Dashboard
      </Link>
    </div>
  );
};

const AddUserPage = () => (
  <AddUserProvider>
    <StepRenderer />
  </AddUserProvider>
);

export default AddUserPage;
