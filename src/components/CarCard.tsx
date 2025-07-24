import React, { useState } from 'react'
import { Phone, Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { Car } from '../lib/supabase'

interface CarCardProps {
  car: Car
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showImageModal, setShowImageModal] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false) // New state for description

  // Get all available images
  const images = React.useMemo(() => {
    const imageList: string[] = []
    if (car.image_url) imageList.push(car.image_url)
    if (car.image_urls && Array.isArray(car.image_urls)) {
      car.image_urls.forEach(url => {
        if (url && !imageList.includes(url)) {
          imageList.push(url)
        }
      })
    }
    return imageList
  }, [car.image_url, car.image_urls])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleImageClick = () => {
    if (images.length > 0) {
      setShowImageModal(true)
    }
  }

  const handleCallInspection = () => {
    const phoneNumber = '+2349162534022'
    window.open(`tel:${phoneNumber}`)
  }

  const formatPrice = (price: number) => {
    if (!price || isNaN(price) || price < 0) {
      return '₦0'
    }
    
    const formattedNumber = price.toLocaleString('en-NG', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    
    return `₦${formattedNumber}`
  }

  // Image Modal Component
  const ImageModal = () => {
    if (!showImageModal) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
        <div className="relative max-w-4xl max-h-full">
          <button
            onClick={() => setShowImageModal(false)}
            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 z-10"
          >
            <X className="w-6 h-6" />
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
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-70"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-70"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-2 py-0.5 rounded-full text-xs">
                {currentImageIndex + 1} / {images.length}
              </div>

              {/* Image indicators */}
              <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-1.5">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative aspect-w-16 aspect-h-9 bg-gray-200">
          {images.length > 0 ? (
            <>
              <img
                src={images[currentImageIndex]}
                alt={`${car.brand} ${car.model} - Image ${currentImageIndex + 1}`}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={handleImageClick}
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70 transition-opacity"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70 transition-opacity"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {/* Image indicators */}
                  <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Click to expand hint */}
                  <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-1.5 py-0.5 rounded">
                    Click to expand
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto mb-1 flex items-center justify-center">
                  <span className="text-xl text-gray-500">🚗</span>
                </div>
                <p className="text-gray-500 text-xs">No Image</p>
              </div>
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-0.5">
                {car.brand} {car.model}
              </h3>
              <div className="flex items-center text-gray-600">
                <Calendar className="w-3.5 h-3.5 mr-1" />
                <span className="text-xs">{car.year}</span>
              </div>
            </div>
            <div className="text-left ml-45 flex-shrink-0">
              <div className="text-green-500 font-bold text-xs leading-tight whitespace-nowrap">
                {formatPrice(car.price)}
              </div>
            </div>
          </div>

          {car.description && (
            <div>
              <p
                className={`text-gray-600 text-xs mb-1 ${
                  showFullDescription ? '' : 'line-clamp-3'
                }`}
              >
                {car.description}
              </p>
              {car.description.split('\n').length > 3 || car.description.length > 150 ? ( // Adjust threshold as needed
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-blue-600 text-xs hover:underline mt-1 block"
                >
                  {showFullDescription ? 'View Less' : 'View More'}
                </button>
              ) : null}
            </div>
          )}

          <button
            onClick={handleCallInspection}
            className="w-full bg-red-600 text-white py-2.5 px-3 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center text-sm mt-3" // Added margin-top
          >
            <Phone className="w-3.5 h-3.5 mr-1.5" />
            Call for Inspection
          </button>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal />
    </>
  )
}