import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const DashboardLayout: React.FC = () => {
  const navItems = [
    { to: '/dashboard/bookings', label: 'Trips & Bookings' },
    { to: '/dashboard/favorites', label: 'Wishlist' },
    { to: '/dashboard/messages', label: 'Messages' },
    { to: '/dashboard/profile', label: 'Profile' },
  ];

  return (
    <div className="site-shell">
      <Header />

      <div className="filter-bar-wrapper">
        <div className="filter-bar">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `chip${isActive ? ' active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>

      <main className="site-main home-wrap fade-in">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
