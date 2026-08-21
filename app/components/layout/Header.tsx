import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconSearch, IconUser } from '@/components/ui/Icons';

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
  onSearchSubmit?: (e: React.FormEvent) => void;
  onOpenReview?: () => void;
  onOpenProfile?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery = '',
  onSearchChange,
  onSearchSubmit,
  onOpenReview,
  onOpenProfile,
}) => {
  const navigate = useNavigate();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(e);
    } else {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="nav">
      <div className="nav-container">
        <Link to="/" className="nav-logo" aria-label="Kahawa Homes Homepage">
          Kahawa<span> Homes</span>
        </Link>

        <form className="nav-search" onSubmit={handleFormSubmit}>
          <input
            className="nav-search-input"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search homes or locations"
            aria-label="Search homes or locations"
          />
          <button className="nav-search-btn" type="submit" aria-label="Search">
            <IconSearch />
          </button>
        </form>

        <div className="nav-right">
          <button
            className="nav-link"
            onClick={() => (onOpenReview ? onOpenReview() : navigate('/dashboard/bookings'))}
            type="button"
          >
            Review
          </button>
          <button
            className="nav-avatar"
            onClick={() => (onOpenProfile ? onOpenProfile() : navigate('/dashboard/profile'))}
            aria-label="Open profile"
            type="button"
          >
            <IconUser />
          </button>
        </div>
      </div>
    </header>
  );
};
