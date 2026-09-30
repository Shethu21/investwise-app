import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import { 
  TrendingUp, 
  Sun, 
  Moon, 
  Menu, 
  X,
  ChevronDown,
  LayoutGrid,
  LogIn,
  UserPlus
} from 'lucide-react';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [learnDropdownOpen, setLearnDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0f172a] text-slate-100 border-b border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-[#10b981]/20 border border-[#10b981]/40 flex items-center justify-center text-[#10b981] shadow-md transition-transform duration-200 group-hover:scale-105">
              <TrendingUp className="w-5 h-5 text-[#10b981]" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              InvestWise <span className="text-[#10b981]">AI</span>
            </span>
          </Link>

          {/* Right Navigation & Actions */}
          <div className="hidden md:flex items-center gap-6">
            
            {/* Learn Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLearnDropdownOpen(!learnDropdownOpen)}
                onBlur={() => setTimeout(() => setLearnDropdownOpen(false), 200)}
                className="flex items-center gap-1 text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Learn <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {learnDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl py-2 z-50 text-sm">
                  <Link
                    to="/education/basics"
                    className="block px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white"
                  >
                    Investment Basics
                  </Link>
                  <Link
                    to="/education/sip-calculator"
                    className="block px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white"
                  >
                    SIP Calculator
                  </Link>
                  <Link
                    to="/education/risk-management"
                    className="block px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white"
                  >
                    Risk Management
                  </Link>
                  <Link
                    to="/education/tax-optimization"
                    className="block px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white"
                  >
                    Tax Optimization
                  </Link>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
              title="Toggle Theme"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-300" />}
            </button>

            {/* Get Started Button */}
            <Link
              to="/advisor"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#10b981] hover:bg-[#059669] text-slate-950 font-bold text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <LayoutGrid className="w-4 h-4" />
              Get Started
            </Link>

            {/* Login & Sign Up Links */}
            <div className="flex items-center gap-3 text-sm font-medium border-l border-slate-800 pl-4">
              <Link
                to="/auth"
                className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
              >
                <LogIn className="w-4 h-4 text-slate-400" />
                Login
              </Link>
              <Link
                to="/auth"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors"
              >
                <UserPlus className="w-3.5 h-3.5 text-slate-300" />
                Sign Up
              </Link>
            </div>

          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-400 hover:text-white"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-300" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-3">
          <Link
            to="/advisor"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#10b981] text-slate-950 font-bold text-sm"
          >
            <LayoutGrid className="w-4 h-4" />
            Get Started
          </Link>
          <div className="space-y-1 pt-2 text-sm">
            <Link
              to="/education/basics"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-900"
            >
              Investment Basics
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-900"
            >
              Dashboard
            </Link>
            <Link
              to="/otp"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-900"
            >
              Verify OTP
            </Link>
            <Link
              to="/auth"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-900"
            >
              Login / Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
