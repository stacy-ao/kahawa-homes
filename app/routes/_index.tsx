import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Property } from '@/types/property';
import type { Booking } from '@/types/booking';
import { PropertyCard } from '@/components/property/PropertyCard';
import { FilterBar, FilterModal } from '@/components/search/FilterPanel';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { IconBell, IconChevron, IconClose } from '@/components/ui/Icons';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { fallbackProperties, normalizeProperty } from '@/lib/utils';

export const HomeRoute: React.FC = () => {
  const navigate = useNavigate();
  const [hasExplored, setHasExplored] = useLocalStorage<boolean>('kahawa-explored', false);
  const [userName, setUserName] = useLocalStorage<string>('kahawa-user-name', '');
  const [favorites, setFavorites] = useLocalStorage<(number | string)[]>('kahawa-favorites', []);
  const [savedBooking, setSavedBooking] = useLocalStorage<Booking | null>('kahawa-booking', null);

  const [properties, setProperties] = useState<Property[]>(fallbackProperties);
  const [search, setSearch] = useState('');
  const [filterLocation, setFilterLocation] = useState('All locations');
  const [type, setType] = useState('All types');
  const [priceMax, setPriceMax] = useState(30000);
  const [ratingMin, setRatingMin] = useState(0);
  const [reviewsMin, setReviewsMin] = useState(0);
  const [favoriteOnly, setFavoriteOnly] = useState(false);
  const [browseNav, setBrowseNav] = useState(0);

  // Modals
  const [filterOpen, setFilterOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  // Profile modal draft
  const [draftName, setDraftName] = useState(userName);

  // Review modal state
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewAttributes, setReviewAttributes] = useState<string[]>([]);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    fetch('/properties.json?v=' + Date.now())
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load local properties.json');
        return res.json();
      })
      .then((data) => {
        const list = Array.isArray(data) ? data : data.properties;
        if (Array.isArray(list)) {
          setProperties(list.map(normalizeProperty));
        }
      })
      .catch(() => {
        // Uses robust fallbackProperties already set
      });
  }, []);

  const locations = [
    'All locations',
    ...Array.from(new Set(properties.map((p) => p.location.split(',')[0].trim()))),
  ];

  const toggleFavorite = (id: number | string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const handleBrowseNav = (index: number) => {
    setBrowseNav(index);
    if (index === 0) {
      setFavoriteOnly(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (index === 1) {
      setFavoriteOnly(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (index === 2) {
      setProfileOpen(true);
    }
    if (index === 3 && typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({ title: 'Kahawa Homes', url: window.location.href });
    }
  };

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewRating) return;
    const existing = JSON.parse(localStorage.getItem('kahawa-reviews') || '[]');
    existing.push({
      rating: reviewRating,
      attributes: reviewAttributes,
      comment: reviewComment.trim(),
      createdAt: Date.now(),
    });
    localStorage.setItem('kahawa-reviews', JSON.stringify(existing));
    setReviewSubmitted(true);
  };

  const searchTerm = search.trim().toLowerCase();
  const filtered = properties.filter((prop) => {
    const matchesLocation =
      filterLocation === 'All locations' ||
      prop.location.startsWith(`${filterLocation},`) ||
      prop.location === filterLocation;
    const matchesPrice = prop.pricePerNight <= priceMax;
    const matchesType = type === 'All types' || prop.type.toLowerCase().includes(type.toLowerCase());
    const matchesRating = prop.rating >= ratingMin;
    const matchesReviews = prop.reviews >= reviewsMin;
    const matchesFavorite = !favoriteOnly || favorites.includes(prop.id);
    const matchesSearch =
      !searchTerm ||
      [prop.name, prop.location, prop.description].some((v) => v.toLowerCase().includes(searchTerm));
    return (
      matchesLocation &&
      matchesPrice &&
      matchesType &&
      matchesRating &&
      matchesReviews &&
      matchesSearch &&
      matchesFavorite
    );
  });

  // Onboarding / Landing Screen
  if (!hasExplored) {
    return (
      <div className="site-shell">
        <main className="landing-screen">
          <div className="landing-brand">
            Kahawa<span> Homes &amp; Safaris</span>
          </div>
          <div className="landing-content">
            <img
              className="landing-badge"
              src="/images/logo.jpeg"
              alt="Kahawa Homes & Safaris. Stays, travel, experiences. Creating your entire experience."
            />
            <input
              className="landing-name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="What should we call you?"
              aria-label="Your name"
            />
            <button
              className="landing-cta"
              onClick={() => setHasExplored(true)}
              type="button"
            >
              Let's Escape
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="site-shell">
      <Header
        searchQuery={search}
        onSearchChange={setSearch}
        onOpenProfile={() => {
          setDraftName(userName);
          setProfileOpen(true);
        }}
        onOpenReview={() => setReviewOpen(true)}
      />

      <FilterBar
        activeLocation={filterLocation}
        onLocationChange={setFilterLocation}
        locations={locations}
      />

      <main className="site-main home-wrap fade-in">
        <div className="browse-header">
          <div>
            <div className="browse-greeting">Hey, {userName || 'there'}</div>
            <p className="card-location">Find a place to slow down</p>
          </div>
          <button
            className="icon-circle"
            onClick={() => setNotificationOpen(true)}
            aria-label="Notifications"
            type="button"
          >
            <IconBell />
          </button>
        </div>

        <div className="browse-tools">
          <button
            className="browse-filter"
            onClick={() => setFilterOpen(true)}
            type="button"
          >
            Filter <IconChevron />
          </button>
        </div>

        <div className="section-heading">
          <span>
            {searchTerm
              ? `Search results for "${search.trim()}"`
              : filterLocation === 'All locations'
              ? 'Popular homes'
              : `Homes in ${filterLocation}`}
          </span>
          <span>&rarr;</span>
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-[#6b5744] text-base mb-3">No homes found matching your filters.</p>
            <button
              className="landing-cta"
              onClick={() => {
                setSearch('');
                setFilterLocation('All locations');
                setType('All types');
                setPriceMax(30000);
                setFavoriteOnly(false);
              }}
              type="button"
            >
              Reset Filters
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

        <MobileNav activeIndex={browseNav} onSelect={handleBrowseNav} />
      </main>

      <Footer />

      {/* Filter Modal */}
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

      {/* Profile Modal */}
      {profileOpen && (
        <div className="profile-modal" onClick={() => setProfileOpen(false)}>
          <section
            className="profile-sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Edit profile"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Your profile</h2>
            <p>Update your name to personalize your welcome.</p>
            <input
              className="profile-input"
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              placeholder="Your name"
              autoFocus
              aria-label="Your name"
            />
            <div className="profile-actions">
              <button
                className="profile-cancel"
                onClick={() => setProfileOpen(false)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="landing-cta"
                onClick={() => {
                  setUserName(draftName.trim());
                  setProfileOpen(false);
                }}
                type="button"
              >
                Save name
              </button>
            </div>
          </section>
        </div>
      )}

      {/* Review Modal */}
      {reviewOpen && (
        <div className="review-modal" onClick={() => setReviewOpen(false)}>
          <section
            className="review-sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Leave a review"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="review-head">
              <div>
                <h2>How was your stay?</h2>
                <p>A quick review helps future guests choose well.</p>
              </div>
              <button
                className="icon-circle"
                onClick={() => setReviewOpen(false)}
                aria-label="Close review form"
                type="button"
              >
                <IconClose />
              </button>
            </div>

            {reviewSubmitted ? (
              <p className="review-success">Thanks for sharing your experience.</p>
            ) : (
              <form onSubmit={submitReview}>
                <strong className="block text-sm mb-2">Your rating</strong>
                <div className="review-stars" aria-label="Choose a star rating">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      className={`review-star${reviewRating >= val ? ' selected' : ''}`}
                      onClick={() => setReviewRating(val)}
                      aria-label={`${val} star${val > 1 ? 's' : ''}`}
                    >
                      ★
                    </button>
                  ))}
                </div>

                <strong className="block text-sm mb-2">What stood out?</strong>
                <div className="review-tags">
                  {['Clean', 'Cozy', 'Good Location', 'Great Host'].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      className={`review-tag${reviewAttributes.includes(tag) ? ' selected' : ''}`}
                      onClick={() =>
                        setReviewAttributes((curr) =>
                          curr.includes(tag) ? curr.filter((t) => t !== tag) : [...curr, tag]
                        )
                      }
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                <input
                  className="review-comment"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Optional comment"
                  aria-label="Optional comment"
                />

                <button
                  className="review-submit"
                  type="submit"
                  disabled={!reviewRating}
                >
                  Submit
                </button>
              </form>
            )}
          </section>
        </div>
      )}

      {/* Booking Reminder Notification Toast */}
      {notificationOpen && savedBooking && (
        <div className="booking-reminder" role="status">
          <strong>Booking reminder</strong>
          <p>{savedBooking.property} is booked for {savedBooking.checkIn}.</p>
          <button
            className="landing-cta"
            style={{ marginTop: '0.7rem', padding: '0.55rem 1rem', fontSize: '0.8rem' }}
            onClick={() => setNotificationOpen(false)}
            type="button"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeRoute;
