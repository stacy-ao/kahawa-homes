import React from 'react';
import { IconSearch } from '@/components/ui/Icons';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search homes or locations',
}) => {
  return (
    <form
      className="nav-search w-full"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(e);
      }}
    >
      <input
        className="nav-search-input"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search"
      />
      <button className="nav-search-btn" type="submit" aria-label="Search">
        <IconSearch />
      </button>
    </form>
  );
};
