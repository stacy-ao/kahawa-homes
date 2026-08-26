import React, { useState, useRef, useEffect } from 'react';
import { IconWA, IconPhone } from './Icons';

interface FloatingContactButtonProps {
  phoneNumber?: string;
  waNumber?: string;
  defaultMessage?: string;
}

export const FloatingContactButton: React.FC<FloatingContactButtonProps> = ({
  phoneNumber = '+254795526788',
  waNumber = '254795526788',
  defaultMessage = "Hello Kahawa Homes, I'd like to inquire about booking a stay.",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(defaultMessage)}`;
  const telUrl = `tel:${phoneNumber}`;

  // Close popup when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, []);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 280);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 flex flex-col items-end pointer-events-auto"
      style={{ isolation: 'isolate' }}
    >
      {/* Floating Popup Menu */}
      <div
        className={`transition-all duration-250 ease-out origin-bottom-right mb-3 w-[240px] bg-white/95 backdrop-blur-md border border-[#e8e0d0] rounded-2xl shadow-2xl p-2.5 flex flex-col gap-1.5 ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
        }`}
        role="menu"
        aria-label="Contact options"
      >
        {/* Header badge */}
        <div className="px-2.5 py-1.5 border-b border-[#f2ede4] flex items-center justify-between">
          <span className="text-[0.72rem] font-serif font-bold tracking-wider text-[#1e120a] uppercase">
            Kahawa Concierge
          </span>
          <span className="flex items-center gap-1 text-[0.68rem] text-emerald-600 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Online
          </span>
        </div>

        {/* WhatsApp Option */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsOpen(false)}
          className="group flex items-center gap-3 px-2.5 py-2 rounded-xl text-[#1e120a] hover:bg-[#25D366]/10 transition-colors"
          role="menuitem"
        >
          <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
            <IconWA width={18} height={18} />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold text-[#1e120a] group-hover:text-emerald-700 leading-tight">
              Chat on WhatsApp
            </span>
            <span className="text-[0.68rem] text-[#6b5744] leading-tight">
              Instant inquiries &amp; booking
            </span>
          </div>
        </a>

        {/* Call Us Option */}
        <a
          href={telUrl}
          onClick={() => setIsOpen(false)}
          className="group flex items-center gap-3 px-2.5 py-2 rounded-xl text-[#1e120a] hover:bg-[#c9a96e]/15 transition-colors"
          role="menuitem"
        >
          <div className="w-8 h-8 rounded-full bg-[#1e120a] text-[#c9a96e] flex items-center justify-center shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
            <IconPhone width={16} height={16} />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold text-[#1e120a] group-hover:text-[#4a2c17] leading-tight">
              Call Us
            </span>
            <span className="text-[0.68rem] text-[#6b5744] leading-tight">
              +254 795 526 788
            </span>
          </div>
        </a>
      </div>

      {/* Main Circular WhatsApp Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Open contact menu"
        className={`relative w-[52px] h-[52px] md:w-[56px] md:h-[56px] rounded-full bg-gradient-to-tr from-[#1ebe5d] to-[#25D366] text-white flex items-center justify-center shadow-[0_8px_24px_rgba(37,211,102,0.35),0_3px_8px_rgba(0,0,0,0.15)] border-2 border-white hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 ${
          isOpen ? 'rotate-90' : 'rotate-0'
        }`}
      >
        {/* Pulsing beacon ring */}
        {!isOpen && (
          <span className="absolute -inset-0.5 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none -z-10" />
        )}
        <IconWA width={26} height={26} />
      </button>
    </div>
  );
};
