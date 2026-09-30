import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Check, 
  Play, 
  Video, 
  Wallet, 
  Target, 
  TrendingUp, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

const Home: React.FC = () => {
  const [isPlayingVideo, setIsPlayingVideo] = React.useState<boolean>(false);

  const steps = [
    {
      num: 1,
      title: 'Enter Your Details',
      desc: 'Share your investment goals, risk tolerance, and financial information securely.',
    },
    {
      num: 2,
      title: 'Verify Your Identity',
      desc: 'Quick email verification with a 6-digit code to ensure your data stays protected.',
    },
    {
      num: 3,
      title: 'Get AI Analysis',
      desc: 'Receive personalized investment recommendations powered by advanced AI algorithms.',
    },
    {
      num: 4,
      title: 'Download Your Report',
      desc: 'Get a comprehensive PDF report with actionable investment strategies.',
    },
  ];

  const basicsCards = [
    {
      icon: Wallet,
      iconBg: 'bg-rose-500/10 text-rose-500',
      title: 'What is Investing?',
      desc: 'Investing means putting your money to work by purchasing assets that have the potential to grow in value over time. Unlike saving, which preserves your money, investing aims to increase it.',
    },
    {
      icon: Target,
      iconBg: 'bg-cyan-500/10 text-cyan-500',
      title: 'Risk vs. Reward',
      desc: 'All investments carry some risk. Generally, higher potential returns come with higher risk. Understanding your risk tolerance is crucial for building a portfolio that matches your comfort level.',
    },
    {
      icon: TrendingUp,
      iconBg: 'bg-indigo-500/10 text-indigo-500',
      title: 'Compound Growth',
      desc: "When your investments earn returns, those returns can also earn returns. This 'compounding' effect can significantly grow your wealth over time, especially if you start early.",
    },
  ];

  return (
    <div className="bg-[#0b1220] min-h-screen text-slate-100 font-sans space-y-20 pb-20">
      
      {/* 1. HERO SECTION (Matching Screenshot 4) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981] text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
              AI-POWERED INVESTMENT ADVISORY
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Smart Investing, <br />
              <span className="text-[#10b981]">Simplified.</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
              Get personalized investment recommendations powered by advanced AI. Make informed decisions with confidence and grow your wealth strategically.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/advisor"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#10b981] hover:bg-[#059669] text-slate-950 font-bold text-base transition-all hover:scale-[1.02] shadow-lg shadow-[#10b981]/20"
              >
                Get Free Analysis <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/education/basics"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-base transition-all"
              >
                Learn About Investing
              </Link>
            </div>

            {/* Proof items */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-medium text-slate-400">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#10b981]" /> Free to use
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#10b981]" /> No credit card
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#10b981]" /> Instant results
              </span>
            </div>
          </div>

          {/* Right Hero Video Card */}
          <div className="relative">
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-3 shadow-2xl overflow-hidden group">
              <div className="relative aspect-video rounded-2xl bg-slate-950 overflow-hidden flex items-center justify-center">
                {isPlayingVideo ? (
                  <iframe
                    className="w-full h-full rounded-2xl"
                    src="https://www.youtube.com/embed/cxW4s23qC9o?autoplay=1"
                    title="How InvestWise AI Works Tutorial"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <>
                    {/* Background Video Mock Image */}
                    <img 
                      src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1000&q=80" 
                      alt="Stock Market Tutorial" 
                      className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                      onClick={() => setIsPlayingVideo(true)}
                    />
                    
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-md bg-slate-900/90 text-slate-200 text-xs font-bold border border-slate-700">
                        AI Tutorial
                      </span>
                    </div>

                    {/* Central Play Button */}
                    <button 
                      onClick={() => setIsPlayingVideo(true)}
                      className="relative z-10 w-16 h-16 rounded-full bg-slate-900/80 border border-slate-700 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-xl cursor-pointer"
                    >
                      <Play className="w-7 h-7 fill-white text-white ml-1" />
                    </button>
                  </>
                )}
              </div>

              {/* Video Footer Info */}
              <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-white text-sm">How InvestWise AI Works</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Watch our tutorial to learn how to get personalized investment advice</p>
                </div>

                <button 
                  onClick={() => setIsPlayingVideo(true)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors whitespace-nowrap self-start sm:self-auto cursor-pointer"
                >
                  <Video className="w-4 h-4 text-rose-400" />
                  YouTube Tutorial
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* 2. HOW TO USE THIS AI INVESTMENT ADVISOR (Matching Screenshot 2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How to Use This AI Investment Advisor
          </h2>
          <p className="text-slate-400 text-base">
            Get your personalized investment analysis in just four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="rounded-3xl bg-slate-900/80 border border-slate-800/80 p-8 space-y-4 hover:border-[#10b981]/40 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#10b981] flex items-center justify-center text-slate-950 font-extrabold text-lg shadow-md group-hover:scale-110 transition-transform">
                {step.num}
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight">
                {step.title}
              </h3>

              <p className="text-slate-400 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>


      {/* 3. INVESTMENT BASICS (Matching Screenshot 1) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Investment Basics
          </h2>
          <p className="text-slate-400 text-base">
            Essential knowledge for first-time investors. Learn the fundamentals before you start your investment journey.
          </p>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {basicsCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-6 shadow-xl border border-slate-200 hover:shadow-2xl transition-shadow"
              >
                <div className={`p-4 rounded-2xl ${card.iconBg} flex-shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900">
                    {card.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* 4. RISK PROFILE ALLOCATION EXAMPLE (Matching Screenshot 3) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🚀</span>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Aggressive</h3>
                  <p className="text-xs text-slate-500">Prioritizes growth over stability. Best for young investors with long time horizons who can weather significant market volatility.</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 text-xs font-bold uppercase tracking-wider">
                MAXIMUM GROWTH
              </span>
            </div>

            {/* Suggested Allocations */}
            <div className="space-y-4 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                SUGGESTED ALLOCATION
              </span>

              <div className="space-y-3 text-sm font-semibold">
                <div className="flex items-center justify-between gap-4">
                  <span className="w-12 text-slate-900">75%</span>
                  <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div className="bg-slate-900 h-full rounded-full w-[75%]"></div>
                  </div>
                  <span className="w-36 text-right text-slate-500">Stocks</span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="w-12 text-slate-900">15%</span>
                  <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div className="bg-slate-900 h-full rounded-full w-[15%]"></div>
                  </div>
                  <span className="w-36 text-right text-slate-500">Real Estate & Alternatives</span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="w-12 text-slate-900">8%</span>
                  <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div className="bg-slate-900 h-full rounded-full w-[8%]"></div>
                  </div>
                  <span className="w-36 text-right text-slate-500">Bonds</span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="w-12 text-slate-900">2%</span>
                  <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div className="bg-slate-900 h-full rounded-full w-[2%]"></div>
                  </div>
                  <span className="w-36 text-right text-slate-500">Cash</span>
                </div>
              </div>
            </div>

            {/* Profile Footer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100 text-xs">
              <div className="space-y-2">
                <span className="font-bold uppercase tracking-wider text-slate-400 block">BEST FOR</span>
                <ul className="space-y-1 text-slate-700 font-medium">
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> 20+ year time horizon</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> High risk tolerance</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Young Investors</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Growth-focused goals</li>
                </ul>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="font-bold uppercase tracking-wider text-slate-400 block">EXPECTED RETURN</span>
                  <span className="text-base font-extrabold text-slate-900">8-12% annually</span>
                </div>
                <div>
                  <span className="font-bold uppercase tracking-wider text-slate-400 block">VOLATILITY</span>
                  <span className="text-sm font-bold text-slate-900">High</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom CTA Button */}
          <div className="text-center space-y-4 pt-6">
            <p className="text-slate-400 text-sm font-medium">
              Ready to get personalized investment advice?
            </p>
            <div>
              <Link
                to="/advisor"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white font-bold text-base shadow-2xl transition-all hover:scale-105"
              >
                Get AI Investment Analysis →
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;
