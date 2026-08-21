import React from 'react';
import type { Property } from '@/types/property';
import { IconWA, IconPhone } from '@/components/ui/Icons';
import { DateRangePicker } from './DateRangePicker';
import { GuestSelector } from './GuestSelector';
import { PriceBreakdown } from './PriceBreakdown';
import { formatPrice, calculateNights, WA_NUMBER } from '@/lib/utils';
import { generateWhatsAppBookingUrl } from '@/lib/payments.server';

interface BookingSummaryProps {
  property: Property;
  userName?: string;
  name: string;
  onNameChange: (val: string) => void;
  checkIn: string;
  onCheckInChange: (val: string) => void;
  checkOut: string;
  onCheckOutChange: (val: string) => void;
  guests: number;
  onGuestsChange: (val: number) => void;
  needsTransport: boolean;
  onNeedsTransportChange: (val: boolean) => void;
  interestedTours: boolean;
  onInterestedToursChange: (val: boolean) => void;
  onBookSuccess?: (booking: any) => void;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({
  property,
  userName = '',
  name,
  onNameChange,
  checkIn,
  onCheckInChange,
  checkOut,
  onCheckOutChange,
  guests,
  onGuestsChange,
  needsTransport,
  onNeedsTransportChange,
  interestedTours,
  onInterestedToursChange,
  onBookSuccess,
}) => {
  const nights = calculateNights(checkIn, checkOut);
  const total = nights * property.pricePerNight;
  const hasBookedDateInRange =
    checkIn &&
    checkOut &&
    property.bookedDates?.some((d) => d >= checkIn && d < checkOut);

  const handleReserve = () => {
    const guestName = name.trim() || userName.trim();
    if (!guestName || !checkIn || !checkOut) {
      alert('Please fill in your name and dates.');
      return;
    }
    if (
      hasBookedDateInRange ||
      property.bookedDates?.includes(checkIn) ||
      property.bookedDates?.includes(checkOut)
    ) {
      alert('One or more selected dates are already booked. Please choose different dates.');
      return;
    }

    const preferences = [
      needsTransport && 'Need Transportation / Airport Transfer',
      interestedTours && 'Interested in Tour Services',
    ].filter(Boolean) as string[];

    const bookingData = {
      property: property.name,
      propertyId: property.id,
      location: property.location,
      checkIn,
      checkOut,
      name: guestName,
      guests,
      preferences,
      totalPrice: total,
      createdAt: Date.now(),
    };

    onBookSuccess?.(bookingData);

    const waUrl = generateWhatsAppBookingUrl({
      propertyName: property.name,
      location: property.location,
      checkIn,
      checkOut,
      guests,
      name: guestName,
      preferences,
      totalPrice: total,
    });

    window.open(waUrl, '_blank');
  };

  return (
    <div className="booking-sticky">
      <div className="booking-card" id="reserve-form">
        <p className="booking-price">
          {formatPrice(property.pricePerNight)} <span>/ night</span>
        </p>

        {/* Guest Name */}
        <label className="block text-[0.72rem] font-bold tracking-[0.08em] uppercase mb-1 text-[#1e120a]">
          Your Name
        </label>
        <input
          type="text"
          className="name-field"
          placeholder="e.g. Nelly Arunga"
          value={name || userName}
          onChange={(e) => onNameChange(e.target.value)}
        />

        {/* Dates */}
        <DateRangePicker
          checkIn={checkIn}
          checkOut={checkOut}
          onCheckInChange={onCheckInChange}
          onCheckOutChange={onCheckOutChange}
          bookedDates={property.bookedDates}
        />

        {/* Guests & Options */}
        <GuestSelector
          maxGuests={property.guests}
          guests={guests}
          onGuestsChange={onGuestsChange}
          needsTransport={needsTransport}
          onNeedsTransportChange={onNeedsTransportChange}
          interestedTours={interestedTours}
          onInterestedToursChange={onInterestedToursChange}
        />

        {/* WhatsApp & Call Buttons */}
        <button className="wa-btn" onClick={handleReserve} type="button">
          <IconWA /> Reserve via WhatsApp
        </button>

        <a className="call-btn" href={`tel:+${WA_NUMBER}`}>
          <IconPhone /> Call Us
        </a>

        <p className="booking-note">
          Choose WhatsApp or call us directly to confirm your booking.
        </p>

        {/* Price Breakdown */}
        <PriceBreakdown pricePerNight={property.pricePerNight} nights={nights} />
      </div>
    </div>
  );
};
