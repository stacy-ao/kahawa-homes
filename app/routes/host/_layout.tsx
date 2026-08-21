import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const HostLayout: React.FC = () => {
  const hostNavItems = [
    { to: '/host/listings', label: 'My Listings' },
    { to: '/host/listings/new', label: '+ Add Listing' },
    { to: '/host/calendar', label: 'Calendar & Availability' },
    { to: '/host/reservations', label: 'Reservations' },
    { to: '/host/earnings', label: 'Earnings' },
  ];

  return (
    <div className="site-shell">
      <Header />

      <div className="filter-bar-wrapper">
        <div className="filter-bar">
          {hostNavItems.map((item) => (
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

export default HostLayout;
