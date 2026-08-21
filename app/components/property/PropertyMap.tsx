import React from 'react';
import { IconPin } from '@/components/ui/Icons';

interface PropertyMapProps {
  location: string;
  lat?: number;
  lng?: number;
}

export const PropertyMap: React.FC<PropertyMapProps> = ({ location }) => {
  const mapSearchUrl = `https://www.google.com/maps/search/${encodeURIComponent(location + ', Kenya')}`;

  return (
    <div className="my-6">
      <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.25rem', marginBottom: '0.8rem' }}>
        Where you'll be
      </h3>
      <p className="text-sm text-[#6b5744] mb-3 flex items-center gap-1.5">
        <IconPin /> {location}, Kenya
      </p>
      <div className="w-full h-64 bg-[#ede6d6] rounded-xl border border-[#e8e0d0] relative overflow-hidden flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-[#1e120a] text-white flex items-center justify-center mb-3 shadow-md">
          <IconPin width={22} height={22} />
        </div>
        <h4 className="font-serif font-bold text-base text-[#1e120a]">{location}</h4>
        <p className="text-xs text-[#6b5744] max-w-sm mt-1 mb-4">
          Exact location and directions are provided after booking confirmation.
        </p>
        <a
          href={mapSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold px-4 py-2 bg-white border border-[#1e120a] rounded-full text-[#1e120a] hover:bg-[#1e120a] hover:text-white transition-colors"
        >
          View on Google Maps &rarr;
        </a>
      </div>
    </div>
  );
};
