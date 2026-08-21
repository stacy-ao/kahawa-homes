import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { IconWA, IconBack, IconPhone } from '@/components/ui/Icons';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { formatPrice, WA_NUMBER } from '@/lib/utils';
import type { Booking } from '@/types/booking';

export const CheckoutRoute: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const [booking] = useLocalStorage<Booking | null>('kahawa-booking', null);
  const [mpesaPhone, setMpesaPhone] = useState('07');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMpesaPay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mpesaPhone || mpesaPhone.length < 10) {
      alert('Please enter a valid Kenyan phone number (e.g., 0712345678)');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert(`STK Push prompt sent to ${mpesaPhone}. Please input your M-Pesa PIN.`);
      navigate(`/booking-confirmed/${bookingId || 'bk_mpesa'}`);
    }, 1500);
  };

  return (
    <div className="site-shell">
      <Header />

      <main className="site-main max-w-xl mx-auto p-6 md:p-10 fade-in">
        <Link to="/" className="detail-back">
          <IconBack /> Return home
        </Link>

        <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#1e120a] mb-2">
          Payment &amp; Confirmation
        </h1>
        <p className="text-sm text-[#6b5744] mb-6">
          Booking Reference: <span className="font-mono font-bold text-[#1e120a]">{bookingId}</span>
        </p>

        {booking && (
          <div className="p-4 bg-[#ede6d6] rounded-xl border border-[#e8e0d0] mb-6">
            <h3 className="font-serif font-bold text-base text-[#1e120a]">{booking.property}</h3>
            <p className="text-xs text-[#6b5744] mt-0.5">{booking.location}</p>
            <div className="flex justify-between text-xs text-[#4a2c17] mt-2 pt-2 border-t border-[#e8e0d0]">
              <span>Dates: {booking.checkIn} to {booking.checkOut}</span>
              <span>{booking.guests} Guest(s)</span>
            </div>
            {booking.totalPrice && (
              <div className="flex justify-between text-sm font-bold text-[#1e120a] mt-2">
                <span>Total Amount:</span>
                <span>{formatPrice(booking.totalPrice)}</span>
              </div>
            )}
          </div>
        )}

        <div className="bg-white border border-[#e8e0d0] rounded-2xl p-6 shadow-md space-y-6">
          <div>
            <h2 className="font-serif text-lg font-bold text-[#1e120a] mb-2">
              Pay with M-Pesa
            </h2>
            <p className="text-xs text-[#6b5744] mb-4">
              Enter your Safaricom phone number to receive an instant STK prompt.
            </p>
            <form onSubmit={handleMpesaPay} className="space-y-4">
              <div>
                <label className="block text-[0.72rem] font-bold tracking-[0.08em] uppercase mb-1 text-[#1e120a]">
                  M-Pesa Phone Number
                </label>
                <input
                  type="tel"
                  className="name-field"
                  placeholder="0712 345 678"
                  value={mpesaPhone}
                  onChange={(e) => setMpesaPhone(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 bg-[#25d366] text-white font-bold rounded-full hover:bg-[#1ebe5d] transition-all disabled:opacity-50"
              >
                {isProcessing ? 'Prompting Phone...' : `Pay with M-Pesa (${booking?.totalPrice ? formatPrice(booking.totalPrice) : ''})`}
              </button>
            </form>
          </div>

          <div className="border-t border-[#e8e0d0] pt-6 text-center">
            <p className="text-xs text-[#6b5744] mb-3">Prefer manual confirmation?</p>
            <a
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="wa-btn text-sm py-3"
            >
              <IconWA /> Confirm with Host on WhatsApp
            </a>
            <a href={`tel:+${WA_NUMBER}`} className="call-btn text-sm py-3 mt-2">
              <IconPhone /> Direct Call
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutRoute;
