import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { Property } from '@/types/property';
import { PropertyCard } from '@/components/property/PropertyCard';
import { fallbackProperties, normalizeProperty } from '@/lib/utils';

export const DashboardFavoritesRoute: React.FC = () => {
  const [favorites, setFavorites] = useLocalStorage<(number | string)[]>('kahawa-favorites', []);
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

  const favoriteProps = properties.filter((p) => favorites.includes(p.id));

  const toggleFavorite = (id: number | string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <div>
      <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#1e120a] mb-2">
        Your Wishlist
      </h1>
      <p className="text-sm text-[#6b5744] mb-8">
        {favoriteProps.length} saved {favoriteProps.length === 1 ? 'home' : 'homes'} for your next Kenyan safari or getaway.
      </p>

      {favoriteProps.length === 0 ? (
        <div className="text-center py-16 bg-white border border-[#e8e0d0] rounded-2xl p-8">
          <h2 className="font-serif text-xl font-bold text-[#1e120a] mb-2">No saved homes yet</h2>
          <p className="text-sm text-[#6b5744] mb-6">
            Tap the heart icon on any property card to save it to your wishlist.
          </p>
          <Link to="/" className="landing-cta inline-block">
            Browse Listings
          </Link>
        </div>
      ) : (
        <div className="prop-grid browse-grid">
          {favoriteProps.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              isSaved={true}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardFavoritesRoute;
