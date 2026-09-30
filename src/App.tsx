import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Advisor from './pages/Advisor';
import OTP from './pages/OTP';
import Dashboard from './pages/Dashboard';
import Education from './pages/Education';
import Auth from './pages/Auth';
import { ThemeProvider } from './components/ThemeContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen font-sans text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/advisor" element={<Advisor />} />
              <Route path="/otp" element={<OTP />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/education/:topic" element={<Education />} />
              <Route path="/education" element={<Education />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </main>
          <footer className="bg-navy-900 dark:bg-slate-950 text-slate-400 py-8 text-center text-sm border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4">
              <p>&copy; {new Date().getFullYear()} AI Investment Advisory System. All rights reserved.</p>
              <p className="mt-2 text-xs opacity-50">Market Data provided by Yahoo Finance & Alpha Vantage.</p>
            </div>
          </footer>
        </div>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
