import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogIn, 
  Mail, 
  ArrowRight, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { loginOtp } from '../services/apiService';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('investor@investwise.ai');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await loginOtp({ email });
      localStorage.setItem('user_email', email);
      navigate('/otp');
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl border border-slate-200 dark:border-slate-700/60 space-y-8">
        
        {/* Header Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
            <LogIn className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            InvestWise Security Portal
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Enter your email to receive a 2FA verification passkey
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="investor@investwise.ai"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 mt-6 disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Sending OTP Code...' : 'Send Verification OTP'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-400 flex items-center justify-center gap-1">
          <ShieldCheck className="w-4 h-4 text-emerald-500" /> Encrypted with AES-256 Protocol
        </div>

      </div>
    </div>
  );
};

export default Auth;
