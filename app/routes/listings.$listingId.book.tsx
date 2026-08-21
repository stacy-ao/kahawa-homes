import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import type { Property } from '@/types/property';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { DateRangePicker } from '@/components/booking/DateRangePicker';
import { GuestSelector } from '@/components/booking/GuestSelector';
import { PriceBreakdown } from '@/components/booking/PriceBreakdown';
import { IconBack, IconWA, IconPhone } from '@/components/ui/Icons';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { fallbackProperties, normalizeProperty, calculateNights, formatPrice, WA_NUMBER } from '@/lib/utils';
import { generateWhatsAppBookingUrl } from '@/lib/payments.server';

export const ListingBookRoute: React.FC = () => {
  const { listingId } = useParams<{ listingId: string }>();
  const navigate = useNavigate();
  const [userName] = useLocalStorage<string>('kahawa-user-name', '');
  const [, setSavedBooking] = useLocalStorage<any>('kahawa-booking', null);

  const [property, setProperty] = useState<Property | null>(null);
  const [name, setName] = useState(userName);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [needsTransport, setNeedsTransport] = useState(false);
  const [interestedTours, setInterestedTours] = useState(false);

  useEffect(() => {
    fetch('/properties.json?v=' + Date.now())
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.properties;
        const normalized: Property[] = Array.isArray(list) ? list.map(normalizeProperty) : fallbackProperties;
        const found = normalized.find((p) => String(p.id) === String(listingId));
        setProperty(found || fallbackProperties[0]);
      })
      .catch(() => {
        const found = fallbackProperties.find((p) => String(p.id) === String(listingId));
        setProperty(found || fallbackProperties[0]);
      });
  }, [listingId]);

  if (!property) {
    return (
      <div className="site-shell">
        <Header />
        <div className="py-24 text-center">
          <p className="text-[#6b5744]">Loading booking details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  const nights = calculateNights(checkIn, checkOut);
  const total = nights * property.pricePerNight;

  const handleBook = () => {
    const guestName = name.trim() || userName.trim();
    if (!guestName || !checkIn || !checkOut) {
      alert('Please fill in your name and dates.');
      return;
    }

    const preferences = [
      needsTransport && 'Need Transportation / Airport Transfer',
      interestedTours && 'Interested in Tour Services',
    ].filter(Boolean) as string[];

    const bookingId = 'bk_' + Date.now();
    const bookingData = {
      id: bookingId,
      property: property.name,
      propertyId: property.id,
      location: property.location,
      checkIn,
      checkOut,
      name: guestName,
      guests,
      preferences,
      totalPrice: total,
      status: 'confirmed',
      createdAt: Date.now(),
    };

    setSavedBooking(bookingData);

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
    navigate(`/booking-confirmed/${bookingId}`);
  };

  return (
    <div className="site-shell">
      <Header />

      <main className="site-main max-w-2xl mx-auto p-6 md:p-10 fade-in">
        <Link to={`/listings/${property.id}`} className="detail-back">
          <IconBack /> Back to {property.name}
        </Link>

        <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#1e120a] mb-2">
          Confirm and Book
        </h1>
        <p className="text-sm text-[#6b5744] mb-8">
          {property.name} &middot; {property.location}
        </p>

        <div className="bg-white border border-[#e8e0d0] rounded-2xl p-6 md:p-8 shadow-md space-y-6">
          <div>
            <label className="block text-[0.72rem] font-bold tracking-[0.08em] uppercase mb-1.5 text-[#1e120a]">
              Your Name
            </label>
            <input
              type="text"
              className="name-field"
              placeholder="e.g. Nelly Arunga"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <DateRangePicker
            checkIn={checkIn}
            checkOut={checkOut}
            onCheckInChange={setCheckIn}
            onCheckOutChange={setCheckOut}
            bookedDates={property.bookedDates}
          />

          <GuestSelector
            maxGuests={property.guests}
            guests={guests}
            onGuestsChange={setGuests}
            needsTransport={needsTransport}
            onNeedsTransportChange={setNeedsTransport}
            interestedTours={interestedTours}
            onInterestedToursChange={setInterestedTours}
          />

          <PriceBreakdown pricePerNight={property.pricePerNight} nights={nights} />

          <button className="wa-btn" onClick={handleBook} type="button">
            <IconWA /> Complete Reservation via WhatsApp
          </button>

          <a className="call-btn" href={`tel:+${WA_NUMBER}`}>
            <IconPhone /> Or Call Us to Book ({WA_NUMBER})
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ListingBookRoute;
