import React from 'react';
import { Link } from 'react-router-dom';
import type { Property } from '@/types/property';
import { IconStar, IconHeart } from '@/components/ui/Icons';
import { formatPrice } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
  isSaved?: boolean;
  onToggleFavorite?: (id: number | string) => void;
  onClick?: () => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isSaved = false,
  onToggleFavorite,
  onClick,
}) => {
  const imageSrc = property.images?.[0] || '/images/imageshouse1_main.jpg.jpeg';

  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite?.(property.id);
  };

  const content = (
    <>
      <div className="card-img">
        <img src={imageSrc} alt={property.name} loading="lazy" />
        {property.badge && <div className="card-badge">{property.badge}</div>}
        <button
          className={`card-heart${isSaved ? ' saved' : ''}`}
          onClick={handleHeartClick}
          aria-label={isSaved ? 'Unsave' : 'Save'}
          type="button"
        >
          <IconHeart />
        </button>
      </div>

      <div className="card-body">
        <div className="card-top">
          <span className="card-name">{property.name}</span>
          <span className="card-rating">
            <IconStar />
            {property.rating ? property.rating.toFixed(2) : 'New'}
          </span>
        </div>

        <p className="card-location">{property.location}</p>

        <p className="card-price">
          <strong>{formatPrice(property.pricePerNight)}</strong>
          <span> / night</span>
        </p>

        <div className="card-tags">
          {(property.amenities?.length ? property.amenities.slice(0, 2) : ['Cancellation', 'Breakfast']).map((tag) => (
            <span className="card-tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  if (onClick) {
    return (
      <div className="prop-card" onClick={onClick} role="button" tabIndex={0}>
        {content}
      </div>
    );
  }

  return (
    <Link to={`/listings/${property.id}`} className="prop-card">
      {content}
    </Link>
  );
};
