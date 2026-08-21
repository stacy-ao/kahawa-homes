import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Property } from '@/types/property';
import type { Booking } from '@/types/booking';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PropertyGallery } from '@/components/property/PropertyGallery';
import { AmenitiesList } from '@/components/property/AmenitiesList';
import { ReviewsList } from '@/components/property/ReviewsList';
import { PropertyMap } from '@/components/property/PropertyMap';
import { BookingSummary } from '@/components/booking/BookingSummary';
import { IconBack, IconHeart, IconShare, IconStar, IconClose } from '@/components/ui/Icons';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { fallbackProperties, normalizeProperty, formatPrice } from '@/lib/utils';

export const ListingDetailRoute: React.FC = () => {
  const { listingId } = useParams<{ listingId: string }>();
  const [userName] = useLocalStorage<string>('kahawa-user-name', '');
  const [favorites, setFavorites] = useLocalStorage<(number | string)[]>('kahawa-favorites', []);
  const [, setSavedBooking] = useLocalStorage<Booking | null>('kahawa-booking', null);

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  // Booking Form State
  const [name, setName] = useState(userName);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [needsTransport, setNeedsTransport] = useState(false);
  const [interestedTours, setInterestedTours] = useState(false);

  // Modals
  const [guideOpen, setGuideOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewAttributes, setReviewAttributes] = useState<string[]>([]);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    fetch('/properties.json?v=' + Date.now())
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.properties;
        const normalizedList: Property[] = Array.isArray(list)
          ? list.map(normalizeProperty)
          : fallbackProperties;
        const found = normalizedList.find((p) => String(p.id) === String(listingId));
        setProperty(found || fallbackProperties[0]);
        setLoading(false);
      })
      .catch(() => {
        const found = fallbackProperties.find((p) => String(p.id) === String(listingId));
        setProperty(found || fallbackProperties[0]);
        setLoading(false);
      });
  }, [listingId]);

  if (loading || !property) {
    return (
      <div className="site-shell">
        <Header />
        <div className="py-24 text-center">
          <p className="text-[#6b5744]">Loading property details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  const isSaved = favorites.includes(property.id);
  const toggleFavorite = () => {
    setFavorites((prev) =>
      prev.includes(property.id) ? prev.filter((id) => id !== property.id) : [...prev, property.id]
    );
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({ title: property.name, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Listing link copied to clipboard!');
    }
  };

  const scrollToReserve = () => {
    document.getElementById('reserve-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const locationQuery = encodeURIComponent(property.location);
  const propertyRules = property.rules?.length
    ? property.rules
    : [
        'Please treat the home with care.',
        'Keep noise considerate for neighbours.',
        'Follow the stated check-in and checkout times.',
      ];

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewRating) return;
    const existing = JSON.parse(localStorage.getItem('kahawa-reviews') || '[]');
    existing.push({
      propertyId: property.id,
      rating: reviewRating,
      attributes: reviewAttributes,
      comment: reviewComment.trim(),
      userName: name || userName || 'Guest',
      createdAt: Date.now(),
    });
    localStorage.setItem('kahawa-reviews', JSON.stringify(existing));
    setReviewSubmitted(true);
  };

  return (
    <div className="site-shell">
      <Header />

      <main className="site-main detail-wrap fade-in">
        {/* Back Link */}
        <Link to="/" className="detail-back">
          <IconBack /> Back to listings
        </Link>

        {/* Header */}
        <div className="detail-header">
          <h1 className="detail-title">{property.name}</h1>
          <div className="detail-actions">
            <button
              className="detail-action-btn"
              onClick={() => setGuideOpen(true)}
              type="button"
            >
              Guest Guide
            </button>
            <button
              className="detail-action-btn"
              onClick={handleShare}
              type="button"
            >
              <IconShare /> Share
            </button>
            <button
              className="detail-action-btn"
              onClick={toggleFavorite}
              type="button"
            >
              <IconHeart /> {isSaved ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>

        {/* Gallery */}
        <PropertyGallery images={property.images} title={property.name} />

        {/* Specs Pills */}
        <div className="detail-specs">
          <span className="detail-spec">{property.guests} guests</span>
          <span className="detail-spec">{property.baths} bath</span>
          <span className="detail-spec">{property.beds} beds</span>
        </div>

        {/* Detail Body (2 Columns) */}
        <div className="detail-body">
          {/* Left Column */}
          <div>
            <p style={{ fontWeight: 600, fontSize: '1.05rem', marginBottom: '.3rem' }}>
              {property.type} &middot; {property.location}
            </p>
            <p className="detail-meta">
              {property.guests} guests &middot; {property.bedrooms} bedroom
              {property.bedrooms > 1 ? 's' : ''} &middot; {property.beds} bed
              {property.beds > 1 ? 's' : ''} &middot; {property.baths} bath
              {property.baths > 1 ? 's' : ''}
            </p>

            {/* Badges */}
            <div className="detail-badges">
              <div className="detail-badge">
                <div className="detail-badge-icon"></div>
                <div className="detail-badge-text">
                  <strong>Guest Favourite</strong>
                  <span>One of the most loved homes</span>
                </div>
              </div>
              <div className="detail-badge">
                <div className="detail-badge-icon">
                  <IconStar />
                </div>
                <div className="detail-badge-text">
                  <strong>{property.rating ? property.rating.toFixed(2) : '5.0'}</strong>
                  <span>{property.reviews || 12} reviews</span>
                </div>
              </div>
            </div>

            {/* Reviews Breakdown */}
            <ReviewsList
              rating={property.rating}
              reviewsCount={property.reviews}
              onOpenReviewModal={() => setReviewOpen(true)}
            />

            <hr className="divider" />

            {/* Host Row */}
            <div className="host-row">
              <div className="host-avatar">{property.host?.name?.[0] || 'N'}</div>
              <div className="host-info">
                <strong>Hosted by {property.host?.name || 'Nelly'}</strong>
                <span>{property.host?.months || 18} months hosting</span>
              </div>
            </div>

            <hr className="divider" />

            {/* Description */}
            <div className="detail-desc">
              {property.description.split('\n').map((line, i) => (
                <p key={i} className="mb-2">
                  {line}
                </p>
              ))}
            </div>

            <hr className="divider" />

            {/* Amenities */}
            <AmenitiesList amenities={property.amenities} />

            <hr className="divider" />

            {/* House Rules */}
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.25rem', marginBottom: '.5rem' }}>
              House rules
            </h3>
            <ul className="rules-list">
              {propertyRules.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>

            <hr className="divider" />

            {/* Property Map */}
            <PropertyMap location={property.location} lat={property.lat} lng={property.lng} />
          </div>

          {/* Right Column (Sticky Booking Card) */}
          <BookingSummary
            property={property}
            userName={userName}
            name={name}
            onNameChange={setName}
            checkIn={checkIn}
            onCheckInChange={setCheckIn}
            checkOut={checkOut}
            onCheckOutChange={setCheckOut}
            guests={guests}
            onGuestsChange={setGuests}
            needsTransport={needsTransport}
            onNeedsTransportChange={setNeedsTransport}
            interestedTours={interestedTours}
            onInterestedToursChange={setInterestedTours}
            onBookSuccess={(b) => setSavedBooking(b)}
          />
        </div>

        {/* Mobile Bottom Fixed Bar */}
        <div className="detail-bottom-bar md:hidden">
          <div>
            <strong>{formatPrice(property.pricePerNight)} total</strong>
            <small>before dates and fees</small>
          </div>
          <button className="landing-cta" onClick={scrollToReserve} type="button">
            Book now
          </button>
        </div>
      </main>

      <Footer />

      {/* Guest Guide Modal */}
      {guideOpen && (
        <div className="guide-modal" onClick={() => setGuideOpen(false)}>
          <section
            className="guide-sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Guest Guide"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="guide-head">
              <div>
                <h2>{property.name} Guest Guide</h2>
                <p>Useful details for your stay in {property.location}.</p>
              </div>
              <button
                className="icon-circle"
                onClick={() => setGuideOpen(false)}
                aria-label="Close Guest Guide"
                type="button"
              >
                <IconClose />
              </button>
            </div>

            <div className="guide-grid">
              <article className="guide-card">
                <h3>House Rules &amp; How-To</h3>
                <ul>
                  <li>TV: switch on the TV, then choose the streaming app from the home screen.</li>
                  <li>Amenities: switch off lights and air conditioning when leaving the room.</li>
                  {propertyRules.map((rule, idx) => (
                    <li key={`rule-${idx}`}>{rule}</li>
                  ))}
                  <li>Need help? Call or WhatsApp the host before attempting repairs.</li>
                </ul>
              </article>

              <article className="guide-card">
                <h3>Local Spots</h3>
                <div className="guide-links">
                  <a
                    href={`https://www.google.com/maps/search/supermarket+near+${locationQuery}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Supermarkets near {property.location}
                  </a>
                  <a
                    href={`https://www.google.com/maps/search/restaurants+near+${locationQuery}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Restaurants near {property.location}
                  </a>
                  <a
                    href={`https://www.google.com/maps/search/emergency+services+near+${locationQuery}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Emergency services near {property.location}
                  </a>
                </div>
              </article>
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

                <button className="review-submit" type="submit" disabled={!reviewRating}>
                  Submit
                </button>
              </form>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default ListingDetailRoute;
