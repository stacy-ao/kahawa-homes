import React, { useState } from 'react';
import { dateKey } from '@/lib/utils';

export const HostCalendarRoute: React.FC = () => {
  const [blockedDates, setBlockedDates] = useState<string[]>(['2026-08-25', '2026-08-26', '2026-08-30']);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const monthName = currentMonth.toLocaleString('en', { month: 'long', year: 'numeric' });
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  const toggleDate = (day: number) => {
    const d = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const key = dateKey(d);
    setBlockedDates((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  };

  return (
    <div>
      <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#1e120a] mb-2">
        Calendar &amp; Availability
      </h1>
      <p className="text-sm text-[#6b5744] mb-6">
        Click dates to block or unblock availability for guest reservations.
      </p>

      <div className="bg-white border border-[#e8e0d0] rounded-2xl p-6 shadow-md max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
            className="w-8 h-8 rounded-full border border-[#e8e0d0] flex items-center justify-center font-bold"
          >
            &#8249;
          </button>
          <span className="font-serif font-bold text-base text-[#1e120a]">{monthName}</span>
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
            className="w-8 h-8 rounded-full border border-[#e8e0d0] flex items-center justify-center font-bold"
          >
            &#8250;
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-[#6b5744] mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, idx) => {
            if (!day) return <span key={`empty-${idx}`} />;
            const key = dateKey(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
            const isBlocked = blockedDates.includes(key);

            return (
              <button
                key={key}
                onClick={() => toggleDate(day)}
                type="button"
                className={`h-10 rounded-lg text-xs font-semibold transition-all ${
                  isBlocked
                    ? 'bg-[#1e120a] text-white'
                    : 'bg-[#f7f3ec] text-[#1e120a] hover:bg-[#ede6d6]'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>

        <div className="flex gap-4 items-center justify-center text-xs text-[#6b5744] mt-6 pt-4 border-t border-[#e8e0d0]">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-[#f7f3ec] border border-[#e8e0d0]" /> Available
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-[#1e120a]" /> Blocked / Reserved
          </span>
        </div>
      </div>
    </div>
  );
};

export default HostCalendarRoute;
