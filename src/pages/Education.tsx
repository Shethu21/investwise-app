import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  BookOpen, 
  Calculator, 
  ShieldCheck, 
  TrendingUp, 
  DollarSign, 
  HelpCircle, 
  ChevronRight,
  PieChart,
  Lightbulb,
  CheckCircle2
} from 'lucide-react';

const Education: React.FC = () => {
  const { topic } = useParams<{ topic?: string }>();
  const activeTopic = topic || 'basics';

  // Calculator State for SIP vs Lumpsum
  const [sipMonthly, setSipMonthly] = useState<number>(500);
  const [returnRate, setReturnRate] = useState<number>(12);
  const [durationYears, setDurationYears] = useState<number>(10);

  const calculateSip = () => {
    const i = returnRate / 12 / 100;
    const n = durationYears * 12;
    const futureValue = sipMonthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const investedAmount = sipMonthly * n;
    const returnsEarned = futureValue - investedAmount;
    return { futureValue: Math.round(futureValue), investedAmount, returnsEarned: Math.round(returnsEarned) };
  };

  const sipResult = calculateSip();

  const topicsList = [
    { id: 'basics', title: '1. Financial Asset Classes', icon: BookOpen, summary: 'Understand stocks, bonds, gold, real estate, and digital assets.' },
    { id: 'sip-calculator', title: '2. SIP vs Lumpsum & Calculator', icon: Calculator, summary: 'Learn power of compounding & calculate projected wealth.' },
    { id: 'risk-management', title: '3. Risk Mitigation & MPT', icon: ShieldCheck, summary: 'Modern Portfolio Theory and diversification techniques.' },
    { id: 'tax-optimization', title: '4. Tax-Efficient Investing', icon: DollarSign, summary: 'Maximize post-tax returns through long-term capital gains planning.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="w-4 h-4" /> Financial Literacy Academy
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Master Modern Investment & Wealth Principles
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base">
          Interactive educational guides, SIP return calculators, and institutional asset allocation strategies.
        </p>
      </div>

      {/* Grid Layout: Sidebar Navigation & Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Navigation Sidebar */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider px-3 mb-2">
            Learning Modules
          </h3>
          {topicsList.map((t) => {
            const Icon = t.icon;
            const active = activeTopic === t.id;
            return (
              <Link
                key={t.id}
                to={`/education/${t.id}`}
                className={`flex items-start gap-3 p-3.5 rounded-xl transition-all border ${
                  active
                    ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-bold shadow-sm'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${active ? 'text-indigo-500' : 'text-slate-400'}`} />
                <div>
                  <div className="text-sm">{t.title}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-0.5 line-clamp-1">{t.summary}</div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-8">
          
          {activeTopic === 'basics' && (
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700/60 shadow-sm space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-indigo-500" /> Core Asset Classes Explained
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Successful portfolio building requires combining uncorrelated asset classes to optimize risk-adjusted returns (Sharpe ratio).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/50 space-y-2">
                  <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                    <span>Equities (Stocks & ETFs)</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500">High Growth</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Ownership shares in public corporations. Provides dividend yields and long-term capital appreciation driven by earnings growth.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/50 space-y-2">
                  <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                    <span>Fixed Income (Bonds & Treasuries)</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-500">Capital Protection</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Loans to governments or creditworthy companies. Generates fixed coupon yields and lowers overall portfolio volatility.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/50 space-y-2">
                  <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                    <span>Gold & Precious Commodities</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-500">Inflation Hedge</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Physical stores of value with zero counterparty risk. Performs strongly during market volatility and fiat inflation periods.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/50 space-y-2">
                  <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                    <span>Digital Assets & Tech Scarcity</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-500/10 text-purple-500">Asymmetric Upside</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Decentralized networks and Web3 protocols. Offers high volatility alongside exponential adoption potential.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTopic === 'sip-calculator' && (
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700/60 shadow-sm space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Calculator className="w-6 h-6 text-indigo-500" /> Interactive SIP Wealth Compounder
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Systematic Investment Plans (SIP) harness Dollar-Cost Averaging to smooth out market highs and lows.
                </p>
              </div>

              {/* Calculator Form */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-500">Monthly SIP Amount ($)</label>
                  <input
                    type="number"
                    value={sipMonthly}
                    onChange={(e) => setSipMonthly(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-500">Expected CAGR Return (%)</label>
                  <input
                    type="number"
                    value={returnRate}
                    onChange={(e) => setReturnRate(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-500">Time Horizon (Years)</label>
                  <input
                    type="number"
                    value={durationYears}
                    onChange={(e) => setDurationYears(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
                  />
                </div>
              </div>

              {/* Calculator Output Display */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-xs text-slate-500 font-semibold uppercase">Total Invested</span>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">${sipResult.investedAmount.toLocaleString()}</div>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold uppercase">Compounded Growth</span>
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">+${sipResult.returnsEarned.toLocaleString()}</div>
                </div>

                <div className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-1">
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold uppercase">Total Corpus Value</span>
                  <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">${sipResult.futureValue.toLocaleString()}</div>
                </div>
              </div>
            </div>
          )}

          {activeTopic === 'risk-management' && (
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700/60 shadow-sm space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-indigo-500" /> Modern Portfolio Theory (MPT)
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Pioneered by Harry Markowitz, MPT demonstrates that asset diversification minimizes standard deviation without sacrificing expected returns.
                </p>
              </div>

              <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> The Efficient Frontier
                  </h4>
                  <p>
                    The optimal set of portfolios offering the highest expected return for a defined level of risk. Our AI Advisory engine computes this balance dynamically.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Rebalancing Disciplines
                  </h4>
                  <p>
                    As asset classes appreciate at different velocities, portfolio drift occurs. Automated portfolio rebalancing trims over-performing positions to buy under-priced assets automatically.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTopic === 'tax-optimization' && (
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700/60 shadow-sm space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-indigo-500" /> Tax Efficiency & Harvesting
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Minimizing capital gains drag increases long-term net compounded wealth.
                </p>
              </div>

              <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900">
                  <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Tax Loss Harvesting:</strong> Offsetting realized capital gains by selling underperforming securities prior to tax year end.</span>
                </li>
                <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900">
                  <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Holding Periods:</strong> Holding equity assets longer than 12 months transitions returns from short-term income tax rates to preferential long-term rates.</span>
                </li>
              </ul>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default Education;
