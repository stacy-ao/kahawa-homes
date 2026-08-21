import React from 'react';
import { IconSearch, IconHeart, IconUser, IconShare } from '@/components/ui/Icons';

interface MobileNavProps {
  activeIndex: number;
  onSelect: (index: number) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeIndex, onSelect }) => {
  const items = [
    { label: 'Home', icon: IconSearch },
    { label: 'Favorites', icon: IconHeart },
    { label: 'Profile', icon: IconUser },
    { label: 'Share', icon: IconShare },
  ];

  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <button
            key={item.label}
            className={activeIndex === index ? 'active' : ''}
            onClick={() => onSelect(index)}
            aria-label={item.label}
            title={item.label}
            type="button"
          >
            <Icon />
          </button>
        );
      })}
    </nav>
  );
};
