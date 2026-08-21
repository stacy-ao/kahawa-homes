import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Property } from '@/types/property';
import { fallbackProperties, normalizeProperty, formatPrice } from '@/lib/utils';

export const HostListingsRoute: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>(fallbackProperties);

  useEffect(() => {
    fetch('/properties.json?v=' + Date.now())
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.properties;
        if (Array.isArray(list)) setProperties(list.map(normalizeProperty));
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#1e120a]">
            Manage Listings
          </h1>
          <p className="text-sm text-[#6b5744] mt-1">
            {properties.length} active {properties.length === 1 ? 'property' : 'properties'} listed
          </p>
        </div>
        <Link to="/host/listings/new" className="landing-cta text-xs md:text-sm py-2.5 px-5">
          + Create Listing
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {properties.map((prop) => (
          <div
            key={prop.id}
            className="bg-white border border-[#e8e0d0] rounded-2xl p-4 flex gap-4 items-center shadow-sm"
          >
            <img
              src={prop.images[0]}
              alt={prop.name}
              className="w-24 h-24 rounded-xl object-cover flex-shrink-0 bg-[#ede6d6]"
            />
            <div className="flex-1 min-w-0">
              <h2 className="font-serif font-bold text-base text-[#1e120a] truncate">{prop.name}</h2>
              <p className="text-xs text-[#6b5744] truncate">{prop.location}</p>
              <strong className="block text-sm font-semibold text-[#1e120a] mt-1">
                {formatPrice(prop.pricePerNight)} / night
              </strong>
              <div className="flex gap-2 mt-2">
                <Link
                  to={`/host/listings/${prop.id}/edit`}
                  className="text-xs text-[#1e120a] underline hover:text-[#c9a96e]"
                >
                  Edit
                </Link>
                <Link
                  to={`/listings/${prop.id}`}
                  className="text-xs text-[#6b5744] underline hover:text-[#1e120a]"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HostListingsRoute;
