import React, { useState, useEffect } from 'react';
import { IconClose, IconGrid } from '@/components/ui/Icons';

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export const PropertyGallery: React.FC<PropertyGalleryProps> = ({ images, title }) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeImageIndex === null) return undefined;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveImageIndex(null);
      if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : 0));
      }
      if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev !== null ? (prev + 1) % images.length : 0));
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, images.length]);

  const mainImg = images[0] || '/images/imageshouse1_main.jpg.jpeg';
  const sideImg1 = images[1] || images[0] || '/images/imageshouse2_main.jpg.jpeg';
  const sideImg2 = images[2] || images[0] || '/images/imageshouse3_main.jpg.jpeg';

  return (
    <>
      {/* Top thumbnails bar */}
      <div className="detail-thumbs">
        {images.slice(0, 4).map((image, index) => (
          <button
            className="detail-thumb"
            key={image + index}
            onClick={() => setActiveImageIndex(index)}
            aria-label={`View photo ${index + 1}`}
            type="button"
          >
            <img src={image} alt="" />
            {index === 3 && images.length > 4 && (
              <span className="detail-thumb-more">{images.length - 4} more</span>
            )}
          </button>
        ))}
      </div>

      {/* Mosaic Grid */}
      <div className="mosaic">
        <div className="mosaic-main">
          <img
            src={mainImg}
            alt={title}
            onClick={() => setActiveImageIndex(0)}
          />
        </div>
        <div className="mosaic-side">
          <img
            src={sideImg1}
            alt=""
            onClick={() => setActiveImageIndex(1 % images.length)}
          />
          <div className="mosaic-more-wrap">
            <img
              src={sideImg2}
              alt=""
              onClick={() => setActiveImageIndex(2 % images.length)}
            />
            <button
              className="mosaic-more-btn"
              onClick={() => setActiveImageIndex(0)}
              type="button"
            >
              <IconGrid /> Show all photos
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImageIndex !== null && (
        <div
          className="photo-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} photo gallery`}
          onClick={() => setActiveImageIndex(null)}
        >
          <button
            className="photo-modal-close"
            onClick={() => setActiveImageIndex(null)}
            aria-label="Close photos"
            title="Close photos"
            type="button"
          >
            <IconClose />
          </button>

          {images.length > 1 && (
            <button
              className="photo-modal-nav photo-modal-prev"
              onClick={(e) => {
                e.stopPropagation();
                setActiveImageIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : 0));
              }}
              aria-label="Previous photo"
              type="button"
            >
              &#8249;
            </button>
          )}

          <img
            className="photo-modal-image"
            src={images[activeImageIndex]}
            alt={`${title} photo ${activeImageIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
          />

          {images.length > 1 && (
            <button
              className="photo-modal-nav photo-modal-next"
              onClick={(e) => {
                e.stopPropagation();
                setActiveImageIndex((prev) => (prev !== null ? (prev + 1) % images.length : 0));
              }}
              aria-label="Next photo"
              type="button"
            >
              &#8250;
            </button>
          )}

          <div className="photo-modal-counter">
            {activeImageIndex + 1} / {images.length}
          </div>

          <div
            className="photo-modal-thumbs"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((image, index) => (
              <button
                key={image + index}
                className={`photo-modal-thumb${activeImageIndex === index ? ' active' : ''}`}
                onClick={() => setActiveImageIndex(index)}
                aria-label={`View photo ${index + 1}`}
                type="button"
              >
                <img src={image} alt="" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
