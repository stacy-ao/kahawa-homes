import React from 'react';
import type { Review } from '@/types/booking';

interface ReviewsListProps {
  rating: number;
  reviewsCount: number;
  reviews?: Review[];
  onOpenReviewModal?: () => void;
}

export const ReviewsList: React.FC<ReviewsListProps> = ({
  rating,
  reviewsCount,
  reviews = [],
  onOpenReviewModal,
}) => {
  const breakdownScores = [
    { label: 'Communication', score: 5.0 },
    { label: 'Cleanliness', score: 4.9 },
    { label: 'Location', score: rating || 4.8 },
  ];

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-3">
        <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.25rem' }}>
          Ratings &amp; reviews
        </h3>
        {onOpenReviewModal && (
          <button
            onClick={onOpenReviewModal}
            className="text-xs font-semibold text-[#1e120a] underline underline-offset-2 hover:text-[#c9a96e] transition-colors"
            type="button"
          >
            Leave a review
          </button>
        )}
      </div>

      <div className="rating-breakdown">
        {breakdownScores.map(({ label, score }) => (
          <div className="rating-row" key={label}>
            <span>{label}</span>
            <span className="rating-track">
              <span
                className="rating-fill"
                style={{ width: `${Math.min(100, score * 20)}%` }}
              />
            </span>
            <strong>{score.toFixed(1)}</strong>
          </div>
        ))}
      </div>

      {reviews.length > 0 && (
        <div className="mt-6 space-y-4">
          {reviews.map((rev, i) => (
            <div key={i} className="p-4 bg-white rounded-xl border border-[#e8e0d0]">
              <div className="flex items-center justify-between text-xs text-[#6b5744] mb-1">
                <span className="font-semibold text-[#1e120a]">{rev.userName || 'Guest'}</span>
                <span>★ {rev.rating}</span>
              </div>
              {rev.attributes?.length > 0 && (
                <div className="flex gap-1.5 flex-wrap my-1.5">
                  {rev.attributes.map((attr) => (
                    <span key={attr} className="text-[0.65rem] px-2 py-0.5 bg-[#ede6d6] rounded-full text-[#1e120a]">
                      {attr}
                    </span>
                  ))}
                </div>
              )}
              {rev.comment && <p className="text-sm text-[#4a2c17] mt-1">{rev.comment}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
