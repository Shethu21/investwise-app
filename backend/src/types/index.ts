export interface AdvisorSubmissionInput {
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

export interface VerifyOtpInput {
  email: string;
  otp: string;
}

export interface ResendOtpInput {
  email: string;
}

export interface LoginOtpInput {
  email: string;
}

export interface RecommendedInstrument {
  name: string;
  type: string;
  allocation: string;
}

export interface AIRecommendationResponse {
  riskClassification: string;
  explanation: string;
  strategy: string;
  instruments: RecommendedInstrument[];
  trendingAssets: string[];
  risksAndOpportunities: string;
  pdfUrl?: string;
}

export interface ApiResponse<T = any> {
  status: 'success' | 'failed';
  message: string;
  data?: T;
}
