import React from 'react';
import { formatPrice } from '@/lib/utils';

interface PriceBreakdownProps {
  pricePerNight: number;
  nights: number;
}

export const PriceBreakdown: React.FC<PriceBreakdownProps> = ({ pricePerNight, nights }) => {
  if (nights <= 0) return null;

  const total = pricePerNight * nights;

  return (
    <div className="booking-breakdown">
      <div className="booking-breakdown-row">
        <span>
          {formatPrice(pricePerNight)} &times; {nights} night{nights > 1 ? 's' : ''}
        </span>
        <span>{formatPrice(total)}</span>
      </div>
      <div className="booking-breakdown-row">
        <span>Service fee</span>
        <span>KSh 0</span>
      </div>
      <div className="booking-breakdown-row total">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>
  );
};
