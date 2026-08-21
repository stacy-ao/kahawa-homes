import React from 'react';
import { IconClose } from '@/components/ui/Icons';
import { formatPrice } from '@/lib/utils';

interface FilterBarProps {
  activeLocation: string;
  onLocationChange: (location: string) => void;
  locations: string[];
}

export const FilterBar: React.FC<FilterBarProps> = ({
  activeLocation,
  onLocationChange,
  locations,
}) => {
  return (
    <div className="filter-bar-wrapper">
      <div className="filter-bar">
        {locations.map((loc) => (
          <button
            key={loc}
            className={`chip${activeLocation === loc ? ' active' : ''}`}
            onClick={() => onLocationChange(loc)}
            type="button"
          >
            {loc}
          </button>
        ))}
      </div>
    </div>
  );
};

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filterLocation: string;
  locations: string[];
  onLocationChange: (loc: string) => void;
  priceMax: number;
  onPriceChange: (price: number) => void;
  type: string;
  onTypeChange: (type: string) => void;
  ratingMin: number;
  onRatingChange: (rating: number) => void;
  reviewsMin: number;
  onReviewsChange: (reviews: number) => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  filterLocation,
  locations,
  onLocationChange,
  priceMax,
  onPriceChange,
  type,
  onTypeChange,
  ratingMin,
  onRatingChange,
  reviewsMin,
  onReviewsChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="filter-modal" onClick={onClose}>
      <section
        className="filter-sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Filter homes"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="filter-sheet-head">
          <h2>Filter homes</h2>
          <button
            className="icon-circle"
            onClick={onClose}
            aria-label="Close filters"
            type="button"
          >
            <IconClose />
          </button>
        </div>

        <strong className="block text-sm font-semibold mb-2">Location</strong>
        <div className="filter-options">
          {locations.map((option) => (
            <button
              key={option}
              className={`filter-option${filterLocation === option ? ' active' : ''}`}
              onClick={() => onLocationChange(option)}
              type="button"
            >
              {option}
            </button>
          ))}
        </div>

        <strong className="block text-sm font-semibold mb-2">Price range</strong>
        <input
          className="filter-range"
          type="range"
          min={0}
          max={30000}
          step={500}
          value={priceMax}
          onChange={(e) => onPriceChange(Number(e.target.value))}
        />
        <div className="range-labels">
          <span>KES 0</span>
          <span>{formatPrice(priceMax)}</span>
        </div>

        <strong className="block text-sm font-semibold mb-2">Minimum rating</strong>
        <input
          className="filter-range"
          type="range"
          min={0}
          max={5}
          step={0.1}
          value={ratingMin}
          onChange={(e) => onRatingChange(Number(e.target.value))}
        />
        <div className="range-labels">
          <span>Any rating</span>
          <span>{ratingMin > 0 ? `${ratingMin.toFixed(1)}+ stars` : 'All stars'}</span>
        </div>

        <strong className="block text-sm font-semibold mb-2">Minimum reviews</strong>
        <input
          className="filter-range"
          type="range"
          min={0}
          max={100}
          step={1}
          value={reviewsMin}
          onChange={(e) => onReviewsChange(Number(e.target.value))}
        />
        <div className="range-labels">
          <span>Any reviews</span>
          <span>{reviewsMin > 0 ? `${reviewsMin}+ reviews` : 'All reviews'}</span>
        </div>

        <strong className="block text-sm font-semibold mb-2">Property type</strong>
        <div className="filter-options">
          {['All types', 'Villa', 'Apartment', 'House', 'Cottage'].map((option) => (
            <button
              key={option}
              className={`filter-option${type === option ? ' active' : ''}`}
              onClick={() => onTypeChange(option)}
              type="button"
            >
              {option}
            </button>
          ))}
        </div>

        <button
          className="landing-cta"
          style={{ width: '100%', marginTop: '0.8rem' }}
          onClick={onClose}
          type="button"
        >
          Apply filters
        </button>
      </section>
    </div>
  );
};
