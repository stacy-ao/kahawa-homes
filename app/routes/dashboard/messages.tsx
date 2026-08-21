import React from 'react';
import { WA_NUMBER } from '@/lib/utils';
import { IconWA, IconPhone, IconMail } from '@/components/ui/Icons';

export const DashboardMessagesRoute: React.FC = () => {
  return (
    <div>
      <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#1e120a] mb-2">
        Host &amp; Guest Chat
      </h1>
      <p className="text-sm text-[#6b5744] mb-8">
        Connect directly with Kahawa Homes hosts in real-time.
      </p>

      <div className="bg-white border border-[#e8e0d0] rounded-2xl p-6 md:p-8 shadow-md max-w-xl space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#1e120a] text-white flex items-center justify-center font-serif font-bold text-xl">
            N
          </div>
          <div>
            <h2 className="font-serif font-bold text-lg text-[#1e120a]">Nelly Arunga</h2>
            <p className="text-xs text-[#6b5744]">Kahawa Homes Host &middot; Quick response</p>
          </div>
        </div>

        <p className="text-sm text-[#4a2c17] leading-relaxed">
          Need special arrangements, safari tour recommendations, airport transfers, or check-in assistance? Chat with Nelly directly on WhatsApp or give us a phone call.
        </p>

        <div className="space-y-3 pt-2">
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hello Nelly! I am inquiring about stays with Kahawa Homes.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="wa-btn text-sm py-3"
          >
            <IconWA /> Open WhatsApp Chat
          </a>

          <a href={`tel:+${WA_NUMBER}`} className="call-btn text-sm py-3">
            <IconPhone /> Call Host Directly (+254 795 526 788)
          </a>

          <a
            href="mailto:arunganelly@gmail.com"
            className="w-full py-3 border border-[#1e120a] rounded-full text-[#1e120a] text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#1e120a] hover:text-white transition-all"
          >
            <IconMail /> Email arunganelly@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardMessagesRoute;
