import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Property } from '@/types/property';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PropertyCard } from '@/components/property/PropertyCard';
import { FilterBar, FilterModal } from '@/components/search/FilterPanel';
import { MapView } from '@/components/search/MapView';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { fallbackProperties, normalizeProperty } from '@/lib/utils';
import { IconChevron } from '@/components/ui/Icons';

export const SearchRoute: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialLocation = searchParams.get('location') || 'All locations';

  const [search, setSearch] = useState(initialQuery);
  const [filterLocation, setFilterLocation] = useState(initialLocation);
  const [properties, setProperties] = useState<Property[]>(fallbackProperties);
  const [type, setType] = useState('All types');
  const [priceMax, setPriceMax] = useState(30000);
  const [ratingMin, setRatingMin] = useState(0);
  const [reviewsMin, setReviewsMin] = useState(0);
  const [showMap, setShowMap] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [favorites, setFavorites] = useLocalStorage<(number | string)[]>('kahawa-favorites', []);

  useEffect(() => {
    fetch('/properties.json?v=' + Date.now())
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.properties;
        if (Array.isArray(list)) setProperties(list.map(normalizeProperty));
      })
      .catch(() => {});
  }, []);

  const locations = [
    'All locations',
    ...Array.from(new Set(properties.map((p) => p.location.split(',')[0].trim()))),
  ];

  const toggleFavorite = (id: number | string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const searchTerm = search.trim().toLowerCase();
  const filtered = properties.filter((prop) => {
    const matchesLocation =
      filterLocation === 'All locations' ||
      prop.location.toLowerCase().includes(filterLocation.toLowerCase());
    const matchesPrice = prop.pricePerNight <= priceMax;
    const matchesType = type === 'All types' || prop.type.toLowerCase().includes(type.toLowerCase());
    const matchesRating = prop.rating >= ratingMin;
    const matchesReviews = prop.reviews >= reviewsMin;
    const matchesSearch =
      !searchTerm ||
      [prop.name, prop.location, prop.description].some((v) => v.toLowerCase().includes(searchTerm));
    return matchesLocation && matchesPrice && matchesType && matchesRating && matchesReviews && matchesSearch;
  });

  return (
    <div className="site-shell">
      <Header
        searchQuery={search}
        onSearchChange={(val) => {
          setSearch(val);
          setSearchParams(val ? { q: val } : {});
        }}
      />

      <FilterBar
        activeLocation={filterLocation}
        onLocationChange={setFilterLocation}
        locations={locations}
      />

      <main className="site-main home-wrap fade-in">
        <div className="browse-header">
          <div>
            <h1 className="browse-greeting">
              {search.trim() ? `Search: "${search}"` : 'All Stays in Kenya'}
            </h1>
            <p className="card-location">
              {filtered.length} {filtered.length === 1 ? 'place' : 'places'} found
            </p>
          </div>

          <div className="flex gap-2">
            <button
              className="browse-filter"
              onClick={() => setShowMap(!showMap)}
              type="button"
            >
              {showMap ? 'Show Grid' : 'Show Map'}
            </button>
            <button
              className="browse-filter"
              onClick={() => setFilterOpen(true)}
              type="button"
            >
              Filters <IconChevron />
            </button>
          </div>
        </div>

        {showMap ? (
          <div className="my-6">
            <MapView properties={filtered} />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <h2 className="font-serif text-xl mb-2">No homes match your exact criteria</h2>
            <p className="text-sm text-[#6b5744] mb-4">Try relaxing filters or searching for another town.</p>
            <button
              className="landing-cta"
              onClick={() => {
                setSearch('');
                setFilterLocation('All locations');
                setType('All types');
                setPriceMax(30000);
              }}
              type="button"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="prop-grid browse-grid">
            {filtered.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isSaved={favorites.includes(property.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />

      <FilterModal
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        filterLocation={filterLocation}
        locations={locations}
        onLocationChange={setFilterLocation}
        priceMax={priceMax}
        onPriceChange={setPriceMax}
        type={type}
        onTypeChange={setType}
        ratingMin={ratingMin}
        onRatingChange={setRatingMin}
        reviewsMin={reviewsMin}
        onReviewsChange={setReviewsMin}
      />
    </div>
  );
};

export default SearchRoute;
