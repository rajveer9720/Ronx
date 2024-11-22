
'use client';

import { useState } from 'react';
import Button from '@/components/ui/button/button';
import Input from '@/components/ui/forms/input';
import { useRouter } from 'next/navigation';
import WalletStatus from '@/components/walletstatus/walletstatus';
import { useWallet } from '@/app/context/WalletContext';


export default function SignUpForm() {
  const { walletAddress, balance } = useWallet();
  const router = useRouter();

  // Initialize the form data with default UplineId of '1'
  const [formData, setFormData] = useState({
    UplineId: '1',
  });

  const [errors, setErrors] = useState({
    UplineId: '',
  });

  // Function to validate the Upline ID field
  function validateField(name: string, value: string) {
    const newErrors = { ...errors };

    switch (name) {
      case 'UplineId':
        if (!value) {
          newErrors.UplineId = 'Upline ID is required';
        } else if (!/^\d+$/.test(value)) {
          newErrors.UplineId = 'Only numbers are allowed';
        } else {
          newErrors.UplineId = '';
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  }

  // Handle input changes and validate the field in real-time
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    // Only allow numbers in the UplineId field
    if (name === 'UplineId' && !/^\d*$/.test(value)) return;

    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  }

  // Handle form submission
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Check if there are no validation errors and the form is filled
    if (Object.values(errors).every((x) => x === '') && formData.UplineId) {
      console.log('Form submitted:', formData);
      router.push('/retro');
    }
  }

  return (
    <>
      <form noValidate onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3">
          {/* Upline ID Input Field */}
          <Input
            name="UplineId"
            type="text"
            placeholder="Upline ID"
            value={formData.UplineId}
            onChange={handleChange}
            inputClassName="focus:!ring-0 placeholder:text-[#6B7280]"
          />
          {errors.UplineId && (
            <p className="text-red-500 text-xs">{errors.UplineId}</p>
          )}
        </div>

        {/* Wallet Status Component */}
        <WalletStatus />

        {/* Sign Up Button */}
        <Button
          type="submit"
          className="mt-5 rounded-lg !text-sm uppercase tracking-[0.04em]"
        >
          Sign Up
        </Button>
      </form>
    </>
  );
}
