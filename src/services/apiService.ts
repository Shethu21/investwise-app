const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export interface AdvisorSubmitPayload {
  fullName: string;
  email: string;
  age: number;
  amount: number;
  currency: string;
  riskAppetite: 'Very Low' | 'Low' | 'Medium' | 'High' | 'Very High';
  timeline: '1 Year' | '3 Years' | '5 Years' | '10+ Years';
  goal: string;
  hasInvestedBefore: 'Yes' | 'No';
  industryPreference: string;
  detailedReport?: boolean;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface ResendOtpPayload {
  email: string;
}

export interface LoginOtpPayload {
  email: string;
}

export async function submitAdvisorForm(payload: AdvisorSubmitPayload) {
  const response = await fetch(`${API_BASE_URL}/advisor/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok || data.status === 'failed') {
    throw new Error(data.message || 'Failed to submit investment profile.');
  }

  return data;
}

export async function verifyOtp(payload: VerifyOtpPayload) {
  const response = await fetch(`${API_BASE_URL}/advisor/verify-otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok || data.status === 'failed') {
    throw new Error(data.message || 'OTP verification failed.');
  }

  return data;
}

export async function resendOtp(payload: ResendOtpPayload) {
  const response = await fetch(`${API_BASE_URL}/advisor/resend-otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok || data.status === 'failed') {
    throw new Error(data.message || 'Failed to resend verification code.');
  }

  return data;
}

export async function loginOtp(payload: LoginOtpPayload) {
  const response = await fetch(`${API_BASE_URL}/auth/login-otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok || data.status === 'failed') {
    throw new Error(data.message || 'Failed to initiate authentication.');
  }

  return data;
}

export async function sendReportToEmail(email: string, reportData: any) {
  const response = await fetch(`${API_BASE_URL}/advisor/send-report`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, reportData }),
  });

  const data = await response.json();
  if (!response.ok || data.status === 'failed') {
    throw new Error(data.message || 'Failed to send report to email.');
  }

  return data;
}
