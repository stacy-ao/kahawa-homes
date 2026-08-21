import React, { useState } from 'react';
import { dateKey } from '@/lib/utils';

interface CalendarPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  bookedDates?: string[];
  minDate?: string;
}

export const CalendarPicker: React.FC<CalendarPickerProps> = ({
  label,
  value,
  onChange,
  bookedDates = [],
  minDate,
}) => {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<Date>(() => {
    const initial = value ? new Date(`${value}T12:00:00`) : new Date();
    return new Date(initial.getFullYear(), initial.getMonth(), 1);
  });

  const today = dateKey(new Date());
  const monthName = month.toLocaleString('en', { month: 'long', year: 'numeric' });
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  const chooseDate = (day: number) => {
    const selected = new Date(month.getFullYear(), month.getMonth(), day);
    const key = dateKey(selected);
    if (!bookedDates.includes(key) && key >= (minDate || today)) {
      onChange(key);
      setOpen(false);
    }
  };

  return (
    <div className="calendar-field">
      <label className="date-label">{label}</label>
      <button
        className={`calendar-value${value ? '' : ' empty'}`}
        onClick={() => setOpen(!open)}
        type="button"
      >
        {value || 'Select date'}
      </button>

      {open && (
        <div className="calendar-popover">
          <div className="calendar-head">
            <button
              type="button"
              onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
              aria-label="Previous month"
            >
              &#8249;
            </button>
            <span>{monthName}</span>
            <button
              type="button"
              onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
              aria-label="Next month"
            >
              &#8250;
            </button>
          </div>

          <div className="calendar-week">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          <div className="calendar-grid">
            {cells.map((day, index) => {
              if (!day) return <span key={`empty-${index}`} />;
              const key = dateKey(new Date(month.getFullYear(), month.getMonth(), day));
              const disabled = bookedDates.includes(key) || key < (minDate || today);

              return (
                <button
                  key={key}
                  type="button"
                  className={`calendar-day${value === key ? ' selected' : ''}`}
                  disabled={disabled}
                  onClick={() => chooseDate(day)}
                  title={bookedDates.includes(key) ? 'Already booked' : undefined}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

interface DateRangePickerProps {
  checkIn: string;
  checkOut: string;
  onCheckInChange: (val: string) => void;
  onCheckOutChange: (val: string) => void;
  bookedDates?: string[];
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
  bookedDates = [],
}) => {
  return (
    <div>
      <div className="text-[0.72rem] font-bold tracking-[0.08em] uppercase mb-1 text-[#1e120a]">
        Dates
      </div>
      <div className="date-row">
        <CalendarPicker
          label="Check-in"
          value={checkIn}
          onChange={(val) => {
            onCheckInChange(val);
            if (checkOut && val >= checkOut) onCheckOutChange('');
          }}
          bookedDates={bookedDates}
        />
        <CalendarPicker
          label="Check-out"
          value={checkOut}
          onChange={onCheckOutChange}
          bookedDates={bookedDates}
          minDate={checkIn || undefined}
        />
      </div>
    </div>
  );
};
