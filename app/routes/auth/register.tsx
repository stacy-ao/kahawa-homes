import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export const RegisterRoute: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, setUserSession] = useLocalStorage<any>('kahawa-user-session', null);
  const [, setUserName] = useLocalStorage<string>('kahawa-user-name', '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const guestUser = {
      id: 'usr_' + Date.now(),
      name: name.trim() || 'Kahawa Guest',
      email,
      role: 'guest',
    };
    setUserSession(guestUser);
    setUserName(guestUser.name);
    navigate('/dashboard/profile');
  };

  return (
    <div className="site-shell">
      <Header />

      <main className="site-main max-w-md mx-auto p-6 md:p-10 fade-in">
        <div className="bg-white border border-[#e8e0d0] rounded-2xl p-6 md:p-8 shadow-md">
          <h1 className="font-serif text-2xl font-bold text-[#1e120a] mb-2 text-center">
            Create an Account
          </h1>
          <p className="text-xs text-[#6b5744] text-center mb-6">
            Join Kahawa Homes for personalized stays &amp; safaris.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[0.72rem] font-bold tracking-[0.08em] uppercase mb-1 text-[#1e120a]">
                Full Name
              </label>
              <input
                type="text"
                className="name-field"
                placeholder="e.g. Nelly Arunga"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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

            <div>
              <label className="block text-[0.72rem] font-bold tracking-[0.08em] uppercase mb-1 text-[#1e120a]">
                Password
              </label>
              <input
                type="password"
                className="name-field"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="landing-cta w-full">
              Create Account
            </button>
          </form>

          <p className="text-xs text-center text-[#6b5744] mt-6">
            Already have an account?{' '}
            <Link to="/auth/login" className="font-bold text-[#1e120a] underline">
              Log in
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RegisterRoute;
