import React from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { Booking } from '@/types/booking';
import { formatPrice, WA_NUMBER } from '@/lib/utils';
import { IconWA } from '@/components/ui/Icons';

export const HostReservationsRoute: React.FC = () => {
  const [booking] = useLocalStorage<Booking | null>('kahawa-booking', null);

  const mockReservations = [
    ...(booking
      ? [
          {
            id: booking.id || 'res_live_1',
            guestName: booking.name,
            property: booking.property,
            dates: `${booking.checkIn} to ${booking.checkOut}`,
            guests: booking.guests,
            amount: booking.totalPrice || 5000,
            status: 'Confirmed',
          },
        ]
      : []),
    {
      id: 'res_101',
      guestName: 'Benson Ochieng',
      property: 'Beachfront Luxury Villa',
      dates: '2026-09-02 to 2026-09-05',
      guests: 4,
      amount: 6000,
      status: 'Confirmed',
    },
    {
      id: 'res_102',
      guestName: 'Stacy Awuor',
      property: 'Executive Garden House',
      dates: '2026-09-10 to 2026-09-12',
      guests: 2,
      amount: 5000,
      status: 'Confirmed',
    },
  ];

  return (
    <div>
      <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#1e120a] mb-2">
        Reservations
      </h1>
      <p className="text-sm text-[#6b5744] mb-6">
        View incoming guest bookings and communicate with clients.
      </p>

      <div className="bg-white border border-[#e8e0d0] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#1e120a]">
            <thead className="bg-[#ede6d6] text-[#1e120a] uppercase font-bold tracking-wider text-[0.7rem]">
              <tr>
                <th className="p-4">Guest</th>
                <th className="p-4">Property</th>
                <th className="p-4">Dates</th>
                <th className="p-4">Guests</th>
                <th className="p-4">Total</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8e0d0]">
              {mockReservations.map((res) => (
                <tr key={res.id} className="hover:bg-[#f7f3ec]/60 transition-colors">
                  <td className="p-4 font-semibold">{res.guestName}</td>
                  <td className="p-4">{res.property}</td>
                  <td className="p-4 text-[#6b5744]">{res.dates}</td>
                  <td className="p-4">{res.guests}</td>
                  <td className="p-4 font-bold">{formatPrice(res.amount)}</td>
                  <td className="p-4">
                    <a
                      href={`https://wa.me/${WA_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25d366] text-white rounded-full font-bold hover:bg-[#1ebe5d]"
                    >
                      <IconWA width={14} height={14} /> Message
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HostReservationsRoute;
