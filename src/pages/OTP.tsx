import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw, 
  Lock, 
  Smartphone,
  ArrowRight
} from 'lucide-react';
import { verifyOtp, resendOtp } from '../services/apiService';

const OTP: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [status, setStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [resendSuccessMsg, setResendSuccessMsg] = useState<string>('');
  const [timer, setTimer] = useState<number>(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const userEmail = localStorage.getItem('user_email') || 'your email';

  useEffect(() => {
    let interval: any = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const digits = pastedData.split('');
      const newOtp = [...otp];
      digits.forEach((d, i) => {
        if (i < 6) newOtp[i] = d;
      });
      setOtp(newOtp);
      inputRefs.current[Math.min(digits.length, 5)]?.focus();
    }
  };

  const handleVerify = async () => {
    const fullCode = otp.join('');
    if (fullCode.length !== 6) {
      setStatus('error');
      setErrorMessage('Please enter all 6 digits of the OTP code.');
      return;
    }

    setStatus('verifying');
    setErrorMessage('');
    setResendSuccessMsg('');

    try {
      const response = await verifyOtp({
        email: localStorage.getItem('user_email') || '',
        otp: fullCode,
      });

      if (response && response.data) {
        localStorage.setItem('ai_results', JSON.stringify(response.data));
        setStatus('success');
      } else {
        throw new Error('No recommendation data returned from server.');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'OTP verification failed. Please try again.');
    }
  };

  const handleResend = async () => {
    const email = localStorage.getItem('user_email');
    if (!email) {
      setErrorMessage('No pending session found. Please submit your advisor profile again.');
      setStatus('error');
      return;
    }

    try {
      await resendOtp({ email });
      setTimer(30);
      setOtp(['', '', '', '', '', '']);
      setStatus('idle');
      setErrorMessage('');
      setResendSuccessMsg('A new verification code has been sent to your email.');
      inputRefs.current[0]?.focus();
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to resend code.');
      setStatus('error');
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-8">
        
        {/* Top Icon */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto shadow-inner">
            <ShieldCheck className="w-9 h-9" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            2-Factor Authentication
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-sm mx-auto">
            We have dispatched a 6-digit security passkey to <span className="font-semibold text-slate-900 dark:text-white">{userEmail}</span>.
          </p>
        </div>

        {/* Resend Success Message */}
        {resendSuccessMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold text-center">
            {resendSuccessMsg}
          </div>
        )}

        {/* OTP Input Fields */}
        <div className="space-y-6">
          <div className="flex justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-11 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-bold rounded-xl border transition-all focus:outline-none ${
                  status === 'error'
                    ? 'border-rose-500 bg-rose-500/5 text-rose-500'
                    : status === 'success'
                    ? 'border-emerald-500 bg-emerald-500/5 text-emerald-500'
                    : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
                }`}
              />
            ))}
          </div>

          {/* Error display */}
          {status === 'error' && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm font-medium flex items-center justify-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success state */}
          {status === 'success' && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium space-y-3 text-center">
              <div className="flex items-center justify-center gap-2 font-bold text-base">
                <CheckCircle className="w-5 h-5" /> 2FA Authentication Verified!
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                AI Recommendation generated successfully. Proceeding to your portfolio dashboard...
              </p>
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Go to Dashboard <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Verify Action Button */}
          {status !== 'success' && (
            <button
              onClick={handleVerify}
              disabled={status === 'verifying'}
              className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {status === 'verifying' ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" /> Verifying OTP & Generating AI Strategy...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" /> Verify OTP & Generate Strategy
                </>
              )}
            </button>
          )}

          {/* Resend timer */}
          <div className="text-center pt-2">
            {timer > 0 ? (
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Resend security code in <span className="font-bold text-emerald-500">{timer}s</span>
              </p>
            ) : (
              <button
                onClick={handleResend}
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Resend New OTP Code
              </button>
            )}
          </div>
        </div>

        {/* Footnote */}
        <div className="border-t border-slate-200 dark:border-slate-700/60 pt-4 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
          <Smartphone className="w-4 h-4" /> Protected by InvestWise End-to-End Authenticator Engine
        </div>

      </div>
    </div>
  );
};

export default OTP;
