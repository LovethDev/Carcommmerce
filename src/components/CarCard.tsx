import React, { useState } from 'react';
import { Phone, Calendar, ChevronLeft, ChevronRight, X, MapPin, Fuel, Settings, Eye } from 'lucide-react';
import type { Car } from '../lib/supabase';

interface CarCardProps {
  car: Car;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Combine and memoize all available images
  const images = React.useMemo(() => {
    const imageList: string[] = [];
    if (car.image_url) {
      imageList.push(car.image_url);
    }
    if (Array.isArray(car.image_urls)) {
      car.image_urls.forEach(url => {
        if (url && typeof url === 'string' && url.trim() !== '') {
          imageList.push(url);
        }
      });
    }
    return Array.from(new Set(imageList));
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

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setImageLoading(false);
    e.currentTarget.src = 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=400';
    e.currentTarget.alt = "Car image not available";
  };

  // Image Modal Component
  const ImageModal = () => {
    if (!showImageModal || images.length === 0) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4 animate-fadeInUp">
        <div className="relative max-w-4xl max-h-full">
          <button
            onClick={() => setShowImageModal(false)}
            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 z-10 transition-all duration-300 hover:scale-110"
            aria-label="Close image modal"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={images[currentImageIndex]}
            alt={`${car.brand} ${car.model} - Image ${currentImageIndex + 1}`}
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
          />
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-70 transition-all duration-300 hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-70 transition-all duration-300 hover:scale-110"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const descriptionText = car.description || '';
  const shouldShowViewMore = descriptionText.length > 120;
  const displayDescription = showFullDescription ? descriptionText : descriptionText.slice(0, 120) + (shouldShowViewMore ? '...' : '');

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 max-w-sm mx-auto group hover:-translate-y-2 animate-scaleIn border border-gray-100">
        {/* Image Section */}
        <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          {images.length > 0 ? (
            <>
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
                  <div className="w-8 h-8 bg-gray-300 rounded-full animate-bounce"></div>
                </div>
              )}
              <img
                src={images[currentImageIndex]}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-full object-cover cursor-pointer transition-transform duration-700 group-hover:scale-110"
                onClick={handleImageClick}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
              
              {/* Image Navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 text-gray-800 p-1.5 rounded-full hover:bg-opacity-100 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 shadow-lg"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 text-gray-800 p-1.5 rounded-full hover:bg-opacity-100 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 shadow-lg"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  
                  {/* Image Indicators */}
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex 
                            ? 'bg-white shadow-lg' 
                            : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                        }`}
                        aria-label={`View image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
              
              {/* View Full Image Hint */}
              <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>View</span>
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-center animate-fadeInUp">
                <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto mb-2 flex items-center justify-center animate-float">
                  <span className="text-2xl text-gray-500">🚗</span>
                </div>
                <p className="text-xs text-gray-500 font-medium">No Image Available</p>
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-5 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight group-hover:text-red-600 transition-colors duration-300">
                {car.brand} {car.model}
              </h3>
              <div className="flex items-center text-gray-500 space-x-3">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">{car.year}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {formatPrice(car.price)}
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                Best Price
              </div>
            </div>
          </div>

          {/* Description */}
          {car.description && (
            <div className="border-t border-gray-100 pt-3">
              <p className="text-sm text-gray-600 leading-relaxed">
                {displayDescription}
              </p>
              {shouldShowViewMore && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-red-600 text-sm hover:text-red-700 mt-2 font-medium transition-colors duration-300 hover:underline"
                >
                  {showFullDescription ? 'Show Less' : 'Read More'}
                </button>
              )}
            </div>
          )}

          {/* Action Section */}
          <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>Delta, NG</span>
              </div>
             
            </div>
            
            <button
              onClick={handleCallInspection}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full flex items-center space-x-2 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group/btn"
              aria-label="Call for Inspection"
            >
              <Phone className="w-4 h-4 group-hover/btn:animate-bounce" />
              <span className="text-sm font-medium">Call Now</span>
            </button>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
      </div>

      {/* Image Modal */}
      <ImageModal />
    </>
  );
};