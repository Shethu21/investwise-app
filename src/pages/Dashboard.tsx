import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  DollarSign, 
  ShieldCheck, 
  PieChart as PieChartIcon, 
  Activity, 
  Layers,
  Sparkles,
  AlertTriangle,
  Download,
  Info,
  Mail,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip 
} from 'recharts';
import { sendReportToEmail } from '../services/apiService';

interface RecommendedInstrument {
  name: string;
  type: string;
  allocation: string;
}

interface AIResultsData {
  riskClassification: string;
  explanation: string;
  strategy: string;
  instruments: RecommendedInstrument[];
  trendingAssets: string[];
  risksAndOpportunities: string;
  pdfUrl?: string;
}

const COLORS = ['#10b981', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#64748b'];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<AIResultsData | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const [sendingEmail, setSendingEmail] = useState<boolean>(false);
  const [emailSentSuccess, setEmailSentSuccess] = useState<string | null>(null);
  const [emailSentError, setEmailSentError] = useState<string | null>(null);

  useEffect(() => {
    const rawResults = localStorage.getItem('ai_results');
    const storedEmail = localStorage.getItem('user_email') || '';
    setUserEmail(storedEmail);

    if (!rawResults) {
      navigate('/advisor');
      return;
    }

    try {
      const parsed = JSON.parse(rawResults);
      if (!parsed || !parsed.riskClassification) {
        navigate('/advisor');
        return;
      }
      setData(parsed);
    } catch {
      navigate('/advisor');
    }
  }, [navigate]);

  const handleSendReportMail = async () => {
    let emailToSend = userEmail;
    if (!emailToSend) {
      emailToSend = prompt('Please enter your email address to receive the report:') || '';
    }

    if (!emailToSend || !emailToSend.includes('@')) {
      setEmailSentError('Please provide a valid email address.');
      return;
    }

    setSendingEmail(true);
    setEmailSentSuccess(null);
    setEmailSentError(null);

    try {
      await sendReportToEmail(emailToSend, data);
      setEmailSentSuccess(`Complete report sent successfully to ${emailToSend}!`);
    } catch (err: any) {
      setEmailSentError(err.message || 'Failed to send report email. Please try again.');
    } finally {
      setSendingEmail(false);
    }
  };

  if (!data) {
    return null;
  }

  // Map instruments to PieChart data format
  const pieChartData = data.instruments.map((inst, idx) => {
    const num = parseFloat(inst.allocation.replace('%', '')) || 0;
    return {
      name: inst.name,
      value: num,
      color: COLORS[idx % COLORS.length],
    };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> AI Recommendation Active
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Personalized Portfolio Command Center
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            Real-time telemetry & verified AI risk allocation metrics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Send to My Mail Button */}
          <button
            onClick={handleSendReportMail}
            disabled={sendingEmail}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all disabled:opacity-50 cursor-pointer"
          >
            {sendingEmail ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                Sending Report...
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 text-indigo-200" />
                Send it to my mail
              </>
            )}
          </button>

          {data.pdfUrl ? (
            <a
              href={data.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm transition-all"
            >
              <Download className="w-4 h-4" /> Download PDF Report
            </a>
          ) : (
            <button
              onClick={() => navigate('/advisor')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
            >
              Update Profile
            </button>
          )}
        </div>
      </div>

      {/* Email Dispatch Alerts */}
      {emailSentSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-sm flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span>{emailSentSuccess}</span>
          </div>
          <button onClick={() => setEmailSentSuccess(null)} className="text-xs text-emerald-400 hover:underline">
            Dismiss
          </button>
        </div>
      )}

      {emailSentError && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold text-sm flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
            <span>{emailSentError}</span>
          </div>
          <button onClick={() => setEmailSentError(null)} className="text-xs text-rose-400 hover:underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Risk Classification */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Risk Profile</span>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {data.riskClassification}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Assessed by InvestWise Groq AI Engine
          </p>
        </div>

        {/* Strategy Summary */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Strategy Objective</span>
            <TrendingUp className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white line-clamp-2">
            {data.strategy}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Optimized for asset allocation compliance
          </p>
        </div>

        {/* Trending Assets Count */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Focus Market Sector</span>
            <Activity className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white">
            {data.trendingAssets.slice(0, 2).join(', ')}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Selected key market indicators
          </p>
        </div>

      </div>

      {/* AI Rationale & Explanation Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-3 shadow-lg">
        <h3 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
          <Info className="w-5 h-5" /> Strategic Portfolio Rationale
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed">
          {data.explanation}
        </p>
      </div>

      {/* Asset Allocation & Table Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Allocation Pie Chart */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/60 shadow-sm space-y-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-emerald-500" /> Target Asset Allocation (100% Total)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Exact percentage breakdown normalized by AI engine
            </p>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: number) => [`${val}%`, 'Allocation']} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2">
            {pieChartData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Instruments Breakdown */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/60 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-500" /> Recommended Instruments
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Securities and asset classes tailored to your risk appetite
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-4 py-3">Instrument</th>
                  <th className="px-4 py-3">Asset Class</th>
                  <th className="px-4 py-3">Allocation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 text-slate-700 dark:text-slate-300">
                {data.instruments.map((inst, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">{inst.name}</td>
                    <td className="px-4 py-3 text-cyan-600 dark:text-cyan-400">{inst.type}</td>
                    <td className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">{inst.allocation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Key Trending Market Assets</h4>
            <div className="flex flex-wrap gap-2 pt-1">
              {data.trendingAssets.map((asset, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                  {asset}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Risks & Opportunities Box */}
      <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
        <h3 className="text-base font-bold text-amber-600 dark:text-amber-400 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" /> Risks & Market Opportunities
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {data.risksAndOpportunities}
        </p>
      </div>

      {/* Financial Safety Disclaimer */}
      <div className="p-4 rounded-xl bg-slate-200/60 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs leading-relaxed text-center">
        <strong>Important Financial Disclaimer:</strong> InvestWise AI provides educational information and personalized analysis based on the information supplied by the user. It does not guarantee investment returns. Past performance does not guarantee future results. Users should consider consulting a qualified financial professional before making significant investment decisions.
      </div>

    </div>
  );
};

export default Dashboard;
