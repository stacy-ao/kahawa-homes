import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const ForgotPasswordRoute: React.FC = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSent(true);
  };

  return (
    <div className="site-shell">
      <Header />

      <main className="site-main max-w-md mx-auto p-6 md:p-10 fade-in">
        <div className="bg-white border border-[#e8e0d0] rounded-2xl p-6 md:p-8 shadow-md">
          <h1 className="font-serif text-2xl font-bold text-[#1e120a] mb-2 text-center">
            Reset Password
          </h1>
          <p className="text-xs text-[#6b5744] text-center mb-6">
            Enter your email to receive recovery instructions.
          </p>

          {sent ? (
            <div className="text-center py-4 space-y-4">
              <p className="text-sm font-semibold text-[#1e120a]">
                Reset link sent to {email}
              </p>
              <Link to="/auth/login" className="landing-cta inline-block">
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[0.72rem] font-bold tracking-[0.08em] uppercase mb-1 text-[#1e120a]">
                  Email Address
                </label>
                <input
                  type="email"
                  className="name-field"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="landing-cta w-full">
                Send Reset Link
              </button>

              <div className="text-center mt-4">
                <Link to="/auth/login" className="text-xs text-[#6b5744] hover:underline">
                  &larr; Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ForgotPasswordRoute;
