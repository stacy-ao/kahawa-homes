import React from 'react';
import { Link } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { Booking } from '@/types/booking';
import { formatPrice, WA_NUMBER } from '@/lib/utils';
import { IconWA } from '@/components/ui/Icons';

export const DashboardBookingsRoute: React.FC = () => {
  const [booking] = useLocalStorage<Booking | null>('kahawa-booking', null);

  return (
    <div>
      <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#1e120a] mb-2">
        Your Trips &amp; Bookings
      </h1>
      <p className="text-sm text-[#6b5744] mb-8">
        Review upcoming visits, past stays, and reservation details.
      </p>

      {booking ? (
        <div className="bg-white border border-[#e8e0d0] rounded-2xl p-6 shadow-md max-w-xl">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <span className="text-[0.65rem] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#25d366]/20 text-[#1e120a] rounded-full">
                {booking.status || 'Confirmed'}
              </span>
              <h2 className="font-serif text-xl font-bold text-[#1e120a] mt-2">
                {booking.property}
              </h2>
              <p className="text-xs text-[#6b5744]">{booking.location}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs py-3 border-y border-[#e8e0d0] text-[#4a2c17]">
            <div>
              <span className="block font-semibold text-[#1e120a]">Check-In</span>
              <span>{booking.checkIn}</span>
            </div>
            <div>
              <span className="block font-semibold text-[#1e120a]">Check-Out</span>
              <span>{booking.checkOut}</span>
            </div>
            <div>
              <span className="block font-semibold text-[#1e120a]">Guests</span>
              <span>{booking.guests} Guest(s)</span>
            </div>
            <div>
              <span className="block font-semibold text-[#1e120a]">Total</span>
              <span>{booking.totalPrice ? formatPrice(booking.totalPrice) : 'Confirmed on WhatsApp'}</span>
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <a
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="wa-btn py-2.5 text-xs"
            >
              <IconWA /> Contact Host
            </a>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white border border-[#e8e0d0] rounded-2xl p-8">
          <h2 className="font-serif text-xl font-bold text-[#1e120a] mb-2">No trips booked yet</h2>
          <p className="text-sm text-[#6b5744] mb-6">
            When you reserve a stay with Kahawa Homes, your details will appear here.
          </p>
          <Link to="/" className="landing-cta inline-block">
            Explore Homes
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardBookingsRoute;
