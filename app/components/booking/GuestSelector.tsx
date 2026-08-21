import React from 'react';

interface GuestSelectorProps {
  maxGuests: number;
  guests: number;
  onGuestsChange: (guests: number) => void;
  needsTransport?: boolean;
  onNeedsTransportChange?: (val: boolean) => void;
  interestedTours?: boolean;
  onInterestedToursChange?: (val: boolean) => void;
}

export const GuestSelector: React.FC<GuestSelectorProps> = ({
  maxGuests,
  guests,
  onGuestsChange,
  needsTransport = false,
  onNeedsTransportChange,
  interestedTours = false,
  onInterestedToursChange,
}) => {
  return (
    <div>
      <label className="block text-[0.72rem] font-bold tracking-[0.08em] uppercase mb-1 text-[#1e120a]">
        Guests
      </label>
      <select
        className="guests-field"
        value={guests}
        onChange={(e) => onGuestsChange(Number(e.target.value))}
      >
        {[...Array(maxGuests || 2)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1} guest{i + 1 > 1 ? 's' : ''}
          </option>
        ))}
      </select>

      {(onNeedsTransportChange || onInterestedToursChange) && (
        <div className="booking-options">
          {onNeedsTransportChange && (
            <label className="booking-option">
              <input
                type="checkbox"
                checked={needsTransport}
                onChange={(e) => onNeedsTransportChange(e.target.checked)}
              />
              Need Transportation / Airport Transfer
            </label>
          )}
          {onInterestedToursChange && (
            <label className="booking-option">
              <input
                type="checkbox"
                checked={interestedTours}
                onChange={(e) => onInterestedToursChange(e.target.checked)}
              />
              Interested in Tour Services
            </label>
          )}
        </div>
      )}
    </div>
  );
};
