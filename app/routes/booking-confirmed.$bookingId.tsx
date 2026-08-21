import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { IconWA, IconPhone } from '@/components/ui/Icons';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { WA_NUMBER, formatPrice } from '@/lib/utils';
import type { Booking } from '@/types/booking';

export const BookingConfirmedRoute: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const [booking] = useLocalStorage<Booking | null>('kahawa-booking', null);

  return (
    <div className="site-shell">
      <Header />

      <main className="site-main max-w-xl mx-auto p-6 md:p-10 text-center fade-in">
        <div className="w-16 h-16 bg-[#25d366] text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl shadow-lg">
          ✓
        </div>

        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1e120a] mb-2">
          Reservation Received!
        </h1>
        <p className="text-sm text-[#6b5744] mb-8">
          Booking ID: <span className="font-mono font-bold text-[#1e120a]">{bookingId}</span>
        </p>

        {booking && (
          <div className="bg-white border border-[#e8e0d0] rounded-2xl p-6 shadow-md text-left mb-8 space-y-3">
            <h2 className="font-serif font-bold text-lg text-[#1e120a]">{booking.property}</h2>
            <p className="text-xs text-[#6b5744]">{booking.location}</p>

            <div className="border-t border-[#e8e0d0] pt-3 text-xs space-y-1.5 text-[#4a2c17]">
              <div className="flex justify-between">
                <span className="font-semibold">Guest Name:</span>
                <span>{booking.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Check-in:</span>
                <span>{booking.checkIn}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Check-out:</span>
                <span>{booking.checkOut}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Guests:</span>
                <span>{booking.guests}</span>
              </div>
              {booking.totalPrice && (
                <div className="flex justify-between font-bold text-[#1e120a] text-sm pt-2 border-t border-[#e8e0d0]">
                  <span>Total:</span>
                  <span>{formatPrice(booking.totalPrice)}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="space-y-3">
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hello! Following up on my booking ${bookingId} for ${booking?.property || 'Kahawa Stay'}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="wa-btn"
          >
            <IconWA /> Message Host on WhatsApp
          </a>

          <a href={`tel:+${WA_NUMBER}`} className="call-btn">
            <IconPhone /> Direct Call Host
          </a>

          <Link to="/" className="inline-block mt-4 text-sm font-semibold text-[#1e120a] underline">
            Explore more stays &rarr;
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingConfirmedRoute;
