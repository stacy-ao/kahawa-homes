import React from 'react';
import type { Property } from '@/types/property';
import { formatPrice } from '@/lib/utils';

interface MapViewProps {
  properties: Property[];
  onSelectProperty?: (property: Property) => void;
}

export const MapView: React.FC<MapViewProps> = ({ properties, onSelectProperty }) => {
  return (
    <div className="w-full bg-[#ede6d6] rounded-2xl p-6 border border-[#e8e0d0] relative min-h-[420px] flex flex-col justify-between overflow-hidden">
      <div className="flex items-center justify-between gap-4 z-10">
        <div>
          <h3 className="font-serif font-bold text-lg text-[#1e120a]">Map Explorer</h3>
          <p className="text-xs text-[#6b5744]">{properties.length} stays available in Kenya</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-6 z-10">
        {properties.slice(0, 6).map((prop) => (
          <button
            key={prop.id}
            onClick={() => onSelectProperty?.(prop)}
            className="p-3 bg-white/90 backdrop-blur rounded-xl border border-[#e8e0d0] text-left hover:border-[#1e120a] hover:shadow-md transition-all group"
            type="button"
          >
            <span className="block text-xs font-bold text-[#1e120a] truncate group-hover:text-[#c9a96e]">
              {prop.name}
            </span>
            <span className="block text-[0.72rem] text-[#6b5744] truncate">{prop.location}</span>
            <strong className="block text-xs text-[#1e120a] mt-1 font-semibold">
              {formatPrice(prop.pricePerNight)}
            </strong>
          </button>
        ))}
      </div>

      <div className="text-center z-10">
        <a
          href="https://www.google.com/maps/search/Hotels+and+Vacation+Rentals+in+Kenya"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-bold px-5 py-2.5 bg-[#1e120a] text-white rounded-full hover:bg-[#4a2c17] transition-all"
        >
          Open Live Map View &rarr;
        </a>
      </div>
    </div>
  );
};
