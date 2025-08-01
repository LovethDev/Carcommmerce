import React, { useState } from 'react';
import { Phone, Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { Car } from '../lib/supabase';

interface CarCardProps {
  car: Car;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Memoize all available images to avoid recalculation on every render
  const images = React.useMemo(() => {
    const imageList: string[] = [];
    if (car.image_url && !imageList.includes(car.image_url)) {
      imageList.push(car.image_url);
    }
    if (Array.isArray(car.image_urls)) {
      car.image_urls.forEach(url => {
        if (url && typeof url === 'string' && url.trim() !== '' && !imageList.includes(url)) {
          imageList.push(url);
        }
      });
    }
    return imageList;
  }, [car.image_url, car.image_urls]);

  const nextImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const handleImageClick = () => {
    if (images.length > 0) {
      setShowImageModal(true);
    }
  };

  const handleCallInspection = () => {
    const phoneNumber = '+2349162534022';
    window.open(`tel:${encodeURIComponent(phoneNumber)}`);
  };

  const formatPrice = (price: number) => {
    if (price === null || price === undefined || isNaN(price) || price < 0) {
      return '₦0';
    }

    const formattedNumber = price.toLocaleString('en-NG', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });

    return `₦${formattedNumber}`;
  };

  // Image Modal Component
  const ImageModal = () => {
    if (!showImageModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-2">
        <div className="relative max-w-2xl max-h-full">
          <button
            onClick={() => setShowImageModal(false)}
            className="absolute top-2 right-2 text-white bg-black bg-opacity-50 p-1 rounded-full hover:bg-opacity-70 z-10"
            aria-label="Close image modal"
          >
            <X className="w-4 h-4" />
          </button>

          {images.length > 0 && (
             <img
               src={images?.[currentImageIndex]}
               alt={`${car.brand} ${car.model} - Image ${currentImageIndex + 1}`}
               className="max-w-full max-h-[70vh] object-contain rounded-md"
             />
          )}

          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Image counter */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-1 py-0.5 rounded-full text-xs">
                {currentImageIndex + 1} / {images.length}
              </div>

              {/* Image indicators */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-1 h-1 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                    }`}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  // Get description lines and determine display
  const descriptionLines = car.description ? car.description.split('\n').filter(line => line.trim() !== '') : [];
  const displayDescription = showFullDescription
    ? car.description
    : descriptionLines.slice(0, 2).join('\n');

  // Condition for showing "View More" button
  const shouldShowViewMore = descriptionLines.length > 2 || (car.description && car.description.length > 100);

  return (
    <div className="bg-white rounded-md shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 mx-auto max-w-[18rem] mb-2 hover-lift animate-scaleIn">
      <div className="relative w-full h-32 bg-gray-200">
        {images.length > 0 ? (
          <>
            <img
              src={images?.[currentImageIndex]}
              alt={`${car.brand} ${car.model} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover cursor-pointer rounded-t-md transition-transform duration-300 hover:scale-105"
              onClick={handleImageClick}
              onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150?text=Image+Error'; e.currentTarget.alt = "Image not available"; }}
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-0.5 rounded-full hover:bg-opacity-70 transition-all duration-300 hover:scale-110"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-3 h-3" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-0.5 rounded-full hover:bg-opacity-70 transition-all duration-300 hover:scale-110"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-3 h-3" />
                </button>

                {/* Image indicators */}
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-0.5">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-1 h-1 rounded-full transition-all duration-300 hover:scale-150 ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                      }`}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Click to expand hint */}
                <div className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-[0.5rem] px-1 py-0.5 rounded animate-fadeInRight">
                  Click to expand
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-t-md animate-fadeInUp">
            <div className="text-center">
              <div className="w-6 h-6 bg-gray-300 rounded-full mx-auto mb-0.5 flex items-center justify-center animate-float">
                <span className="text-base text-gray-500">🚗</span>
              </div>
              <p className="text-[0.5rem] text-gray-500">No Image</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-2 animate-fadeInUp animate-delay-200">
        <div className="flex items-start justify-between mb-1">
          <div className="flex-1 pr-1">
            <h3 className="text-sm font-bold text-gray-900 mb-0.5 leading-tight">
              {car.brand} {car.model}
            </h3>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-2.5 h-2.5 mr-0.5" />
              <span className="text-[0.625rem]">{car.year}</span>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-green-500 font-bold text-sm leading-tight">
              {formatPrice(car.price)}
            </div>
          </div>
        </div>

        {car.description && (
          <div className="mb-2">
            <p className="text-[0.625rem] text-gray-600 whitespace-pre-line">
              {displayDescription}
            </p>
            {shouldShowViewMore && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-blue-600 text-[0.625rem] hover:underline mt-0.5 block transition-all duration-300 hover:scale-105"
              >
                {showFullDescription ? 'View Less' : 'View More'}
              </button>
            )}
          </div>
        )}

        <button
          onClick={handleCallInspection}
          className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-all duration-300 shadow-sm mx-auto mt-2 hover:scale-110 hover-lift animate-fadeInUp animate-delay-300"
          aria-label="Call for Inspection"
        >
          <Phone className="w-4 h-4" />
        </button>
      </div>

      {/* Image Modal */}
      <ImageModal />
    </div>
  );
};