import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { IconBack } from '@/components/ui/Icons';
import { fallbackProperties, normalizeProperty } from '@/lib/utils';
import type { Property } from '@/types/property';

export const HostListingsEditRoute: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    fetch('/properties.json?v=' + Date.now())
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.properties;
        const normalized: Property[] = Array.isArray(list) ? list.map(normalizeProperty) : fallbackProperties;
        const found = normalized.find((p) => String(p.id) === String(id));
        setProperty(found || fallbackProperties[0]);
      })
      .catch(() => {
        const found = fallbackProperties.find((p) => String(p.id) === String(id));
        setProperty(found || fallbackProperties[0]);
      });
  }, [id]);

  if (!property) {
    return <div className="py-20 text-center text-sm text-[#6b5744]">Loading property...</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Listing updated successfully!');
    navigate('/host/listings');
  };

  return (
    <div className="max-w-2xl">
      <Link to="/host/listings" className="detail-back">
        <IconBack /> Back to listings
      </Link>

      <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#1e120a] mb-2">
        Edit: {property.name}
      </h1>
      <p className="text-sm text-[#6b5744] mb-6">Update details, rates, and amenities.</p>

      <div className="bg-white border border-[#e8e0d0] rounded-2xl p-6 md:p-8 shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[0.72rem] font-bold tracking-[0.08em] uppercase mb-1 text-[#1e120a]">
              Listing Title
            </label>
            <input
              type="text"
              className="name-field"
              value={property.name}
              onChange={(e) => setProperty({ ...property, name: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[0.72rem] font-bold tracking-[0.08em] uppercase mb-1 text-[#1e120a]">
                Location
              </label>
              <input
                type="text"
                className="name-field"
                value={property.location}
                onChange={(e) => setProperty({ ...property, location: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-[0.72rem] font-bold tracking-[0.08em] uppercase mb-1 text-[#1e120a]">
                Price / Night (KES)
              </label>
              <input
                type="number"
                className="name-field"
                value={property.pricePerNight}
                onChange={(e) => setProperty({ ...property, pricePerNight: Number(e.target.value) })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[0.72rem] font-bold tracking-[0.08em] uppercase mb-1 text-[#1e120a]">
              Description
            </label>
            <textarea
              className="review-comment"
              rows={4}
              value={property.description}
              onChange={(e) => setProperty({ ...property, description: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="landing-cta w-full">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default HostListingsEditRoute;
