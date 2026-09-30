import { z } from 'zod';

export const advisorSubmissionSchema = z.object({
  fullName: z.string().min(1, 'fullName is required'),
  email: z.string().email('email is required and must be valid'),
  age: z.number().min(18, 'age must be between 18 and 100').max(100, 'age must be between 18 and 100'),
  amount: z.number().min(100, 'amount must be greater than or equal to 100'),
  currency: z.string().min(1, 'currency is required'),
  riskAppetite: z.enum(['Very Low', 'Low', 'Medium', 'High', 'Very High'], {
    errorMap: () => ({ message: 'riskAppetite must be one of: Very Low, Low, Medium, High, Very High' }),
  }),
  timeline: z.enum(['1 Year', '3 Years', '5 Years', '10+ Years'], {
    errorMap: () => ({ message: 'timeline must be one of: 1 Year, 3 Years, 5 Years, 10+ Years' }),
  }),
  goal: z.string().min(1, 'goal is required'),
  hasInvestedBefore: z.enum(['Yes', 'No'], {
    errorMap: () => ({ message: 'hasInvestedBefore must be Yes or No' }),
  }),
  industryPreference: z.string().min(1, 'industryPreference is required'),
  detailedReport: z.boolean().optional().default(true),
});

export const verifyOtpSchema = z.object({
  email: z.string().email('valid email is required'),
  otp: z.string().length(6, 'otp must be exactly 6 digits'),
});

export const resendOtpSchema = z.object({
  email: z.string().email('valid email is required'),
});

export const loginOtpSchema = z.object({
  email: z.string().email('valid email is required'),
});
