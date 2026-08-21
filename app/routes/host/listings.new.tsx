import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { IconBack } from '@/components/ui/Icons';

export const HostListingsNewRoute: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [type, setType] = useState('Entire apartment');
  const [location, setLocation] = useState('Nairobi');
  const [pricePerNight, setPricePerNight] = useState(2500);
  const [guests, setGuests] = useState(2);
  const [bedrooms, setBedrooms] = useState(1);
  const [baths, setBaths] = useState(1);
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Listing created successfully!');
    navigate('/host/listings');
  };

  return (
    <div className="max-w-2xl">
      <Link to="/host/listings" className="detail-back">
        <IconBack /> Back to listings
      </Link>

      <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#1e120a] mb-2">
        Create a New Listing
      </h1>
      <p className="text-sm text-[#6b5744] mb-6">
        Publish your home or safari stay on Kahawa Homes.
      </p>

      <div className="bg-white border border-[#e8e0d0] rounded-2xl p-6 md:p-8 shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[0.72rem] font-bold tracking-[0.08em] uppercase mb-1 text-[#1e120a]">
              Listing Title
            </label>
            <input
              type="text"
              className="name-field"
              placeholder="e.g. Swahili Coast Oceanfront Villa"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[0.72rem] font-bold tracking-[0.08em] uppercase mb-1 text-[#1e120a]">
                Property Type
              </label>
              <select
                className="guests-field"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="Entire apartment">Entire apartment</option>
                <option value="Entire villa">Entire villa</option>
                <option value="Entire cottage">Entire cottage</option>
                <option value="Entire house">Entire house</option>
                <option value="Private room">Private room</option>
              </select>
            </div>

            <div>
              <label className="block text-[0.72rem] font-bold tracking-[0.08em] uppercase mb-1 text-[#1e120a]">
                Location
              </label>
              <input
                type="text"
                className="name-field"
                placeholder="e.g. Mombasa or Diani Beach"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[0.72rem] font-bold tracking-[0.08em] uppercase mb-1 text-[#1e120a]">
                Price / Night (KES)
              </label>
              <input
                type="number"
                className="name-field"
                value={pricePerNight}
                onChange={(e) => setPricePerNight(Number(e.target.value))}
                min={500}
                required
              />
            </div>
            <div>
              <label className="block text-[0.72rem] font-bold tracking-[0.08em] uppercase mb-1 text-[#1e120a]">
                Guests
              </label>
              <input
                type="number"
                className="name-field"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                min={1}
                required
              />
            </div>
            <div>
              <label className="block text-[0.72rem] font-bold tracking-[0.08em] uppercase mb-1 text-[#1e120a]">
                Bedrooms
              </label>
              <input
                type="number"
                className="name-field"
                value={bedrooms}
                onChange={(e) => setBedrooms(Number(e.target.value))}
                min={0}
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
              placeholder="Describe the atmosphere, views, proximity to attractions..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="landing-cta w-full">
            Publish Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default HostListingsNewRoute;
