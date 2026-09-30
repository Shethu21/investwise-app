import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BrainCircuit, 
  Sparkles, 
  Loader2, 
  AlertCircle, 
  Sliders, 
  DollarSign, 
  User, 
  Mail, 
  Calendar, 
  TrendingUp, 
  Target, 
  Briefcase, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { submitAdvisorForm, AdvisorSubmitPayload } from '../services/apiService';

const Advisor: React.FC = () => {
  const navigate = useNavigate();

  // Form Inputs
  const [fullName, setFullName] = useState<string>('John Doe');
  const [email, setEmail] = useState<string>('john@example.com');
  const [age, setAge] = useState<number>(28);
  const [amount, setAmount] = useState<number>(5000);
  const [currency, setCurrency] = useState<string>('USD');
  const [riskAppetite, setRiskAppetite] = useState<'Very Low' | 'Low' | 'Medium' | 'High' | 'Very High'>('Medium');
  const [timeline, setTimeline] = useState<'1 Year' | '3 Years' | '5 Years' | '10+ Years'>('5 Years');
  const [goal, setGoal] = useState<string>('Wealth Growth');
  const [hasInvestedBefore, setHasInvestedBefore] = useState<'Yes' | 'No'>('No');
  const [industryPreference, setIndustryPreference] = useState<string>('Tech');
  const [detailedReport, setDetailedReport] = useState<boolean>(true);

  // States
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload: AdvisorSubmitPayload = {
      fullName,
      email,
      age,
      amount,
      currency,
      riskAppetite,
      timeline,
      goal,
      hasInvestedBefore,
      industryPreference,
      detailedReport,
    };

    try {
      await submitAdvisorForm(payload);
      localStorage.setItem('user_email', email);
      navigate('/otp');
    } catch (err: any) {
      setError(err.message || 'Failed to submit profile. Please check your network and inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-semibold uppercase tracking-wider">
          <BrainCircuit className="w-4 h-4" /> AI Advisory Engine
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Personalized Investment Portfolio Strategy
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base">
          Fill in your financial parameters below. Our AI engine will analyze market conditions to construct an optimal investment strategy.
        </p>
      </div>

      {/* Main Container styled with user's investment-container class */}
      <div className="investment-container shadow-2xl border border-slate-800 bg-slate-900 text-slate-100 rounded-3xl p-6 sm:p-10">
        <h2 className="flex items-center gap-2 text-2xl font-bold border-b border-slate-800 pb-4 text-white">
          <Sliders className="w-6 h-6 text-cyan-400" /> Investment Profile & Preference Controls
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 my-6">
          
          {/* User Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-300">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-medium focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-300">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-medium focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Age */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-300">Age</label>
              <div className="relative">
                <Calendar className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="number"
                  required
                  min={18}
                  max={100}
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-medium focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Financial Parameters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Amount */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-300">Investment Amount</label>
              <div className="relative">
                <DollarSign className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="number"
                  required
                  min={100}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-medium focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Currency */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-300">Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-medium focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="INR">INR (₹)</option>
                <option value="CAD">CAD ($)</option>
              </select>
            </div>
          </div>

          {/* Risk Appetite Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-300">
              Risk Appetite Profile
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {(['Very Low', 'Low', 'Medium', 'High', 'Very High'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRiskAppetite(r)}
                  className={`py-2.5 px-3 rounded-xl font-semibold text-xs transition-all border ${
                    riskAppetite === r
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline & Previous Investment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Timeline */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-300">Investment Timeline</label>
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-medium focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              >
                <option value="1 Year">1 Year</option>
                <option value="3 Years">3 Years</option>
                <option value="5 Years">5 Years</option>
                <option value="10+ Years">10+ Years</option>
              </select>
            </div>

            {/* Previous Investment Experience */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-300">Invested Before?</label>
              <div className="grid grid-cols-2 gap-3">
                {(['Yes', 'No'] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setHasInvestedBefore(opt)}
                    className={`py-2.5 px-4 rounded-xl font-semibold text-sm transition-all border ${
                      hasInvestedBefore === opt
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-md shadow-emerald-500/20'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Goal & Industry Preference */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Goal */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-300">Investment Goal</label>
              <input
                type="text"
                required
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="E.g., Wealth Growth, Retirement, Passive Income"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-medium focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>

            {/* Industry Preference */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-300">Industry Preference</label>
              <input
                type="text"
                required
                value={industryPreference}
                onChange={(e) => setIndustryPreference(e.target.value)}
                placeholder="E.g., Tech, Clean Energy, Real Estate, Healthcare"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-medium focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm font-semibold flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-emerald-500 to-teal-500 text-slate-950 font-extrabold text-base hover:opacity-95 transition-all shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                  Generating Verification Security Passkey...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-slate-950" />
                  Analyze with AI & Request Verification OTP
                </>
              )}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};

export default Advisor;
