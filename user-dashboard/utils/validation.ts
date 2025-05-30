import { z } from 'zod';

export const step1Schema = z.object({
  name: z.string().min(1, 'Name required'),
  email: z.string().email('Invalid email'),
});

export const step2Schema = z.object({
  street: z.string().min(1, 'Street required'),
  city: z.string().min(1, 'City required'),
  zipcode: z.string().min(1, 'Zip required'),
});
