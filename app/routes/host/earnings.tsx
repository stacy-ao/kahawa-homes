import React from 'react';
import { formatPrice } from '@/lib/utils';

export const HostEarningsRoute: React.FC = () => {
  const stats = [
    { label: 'Total Revenue (August)', value: formatPrice(185000), change: '+14% vs last month' },
    { label: 'Confirmed Bookings', value: '18 Stays', change: '84% occupancy rate' },
    { label: 'Average Daily Rate', value: formatPrice(3800), change: 'Across all active properties' },
  ];

  return (
    <div>
      <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#1e120a] mb-2">
        Earnings &amp; Performance
      </h1>
      <p className="text-sm text-[#6b5744] mb-8">
        Financial overview and payout tracking for your listed properties.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white border border-[#e8e0d0] rounded-2xl p-6 shadow-sm">
            <span className="text-xs text-[#6b5744] block mb-1">{stat.label}</span>
            <strong className="text-2xl font-serif text-[#1e120a] block">{stat.value}</strong>
            <span className="text-[0.72rem] text-[#25d366] font-semibold mt-1 block">
              {stat.change}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-white border border-[#e8e0d0] rounded-2xl p-6 shadow-sm">
        <h2 className="font-serif font-bold text-lg text-[#1e120a] mb-4">Payout Method</h2>
        <div className="flex items-center justify-between p-4 bg-[#ede6d6] rounded-xl">
          <div>
            <strong className="block text-sm text-[#1e120a]">M-Pesa Direct Settlement</strong>
            <span className="text-xs text-[#6b5744]">+254 795 526 788 &middot; Primary</span>
          </div>
          <span className="text-xs px-3 py-1 bg-[#25d366] text-white font-bold rounded-full">
            Active
          </span>
        </div>
      </div>
    </div>
  );
};

export default HostEarningsRoute;
