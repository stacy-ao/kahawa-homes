import React from 'react';
import { getAmenityIcon } from '@/components/ui/Icons';

interface AmenitiesListProps {
  amenities: string[];
}

export const AmenitiesList: React.FC<AmenitiesListProps> = ({ amenities }) => {
  return (
    <div>
      <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.25rem', marginBottom: '1rem' }}>
        What this place offers
      </h3>
      <div className="amenities-grid-detail">
        {amenities.map((amenity, index) => {
          const Icon = getAmenityIcon(amenity);
          return (
            <div key={index} className="amenity-row">
              <Icon />
              <span>{amenity}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
