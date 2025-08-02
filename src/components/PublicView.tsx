import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';
import { CarCard } from './CarCard';
// FilterSidebar import removed
import { useCars } from '../hooks/useCars'; // Assuming this hook exists and fetches all cars
import type { Car } from '../lib/supabase'; // Assuming this type exists

// Define a new Footer component
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-16 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Bukason Deigason Autos</h3>
            <p className="text-sm">
              Your trusted partner in finding quality used cars. Committed to excellence and customer satisfaction.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-red-500 transition-colors duration-200">About Us</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors duration-200">Our Services</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors duration-200">Contact</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors duration-200">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-start gap-4">
              {/* Using inline SVG for icons to avoid external dependencies */}
              <a href="#" aria-label="Facebook" className="hover:text-red-500 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 5.016 3.65 9.176 8.438 9.873v-7.25h-2.54v-2.623h2.54V9.33c0-2.51 1.533-3.876 3.76-3.876 1.07 0 2.004.08 2.272.115v2.39h-1.42c-1.118 0-1.336.53-1.336 1.314v1.72h2.646l-.43 2.623h-2.216v7.25C18.35 21.176 22 17.016 22 12c0-5.523-4.477-10-10-10z"/></svg>
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-red-500 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M22.46 6c-.77.34-1.6.56-2.46.66.89-.53 1.57-1.37 1.89-2.37-.84.5-1.78.87-2.77 1.07C18.23 4.2 16.96 3.5 15.4 3.5c-2.92 0-5.29 2.37-5.29 5.29 0 .41.05.81.14 1.19C7.45 9.61 4.7 8.1 2.87 5.75c-.44.75-.69 1.62-.69 2.56 0 1.84.94 3.47 2.37 4.43-.87-.03-1.68-.27-2.4-.66v.07c0 2.57 1.83 4.71 4.25 5.2-.45.12-.92.19-1.41.19-.34 0-.67-.03-.99-.09.68 2.12 2.66 3.67 5.01 3.71-1.82 1.43-4.12 2.29-6.62 2.29-.43 0-.85-.02-1.27-.08 2.35 1.51 5.15 2.4 8.16 2.4 9.79 0 15.15-8.12 15.15-15.15 0-.23-.01-.46-.02-.69.96-.69 1.8-1.57 2.46-2.56z"/></svg>
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-red-500 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07c3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.645.069-4.849.069s-3.584-.012-4.849-.069c-3.254-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.849 0-3.204.012-3.584.069-4.849.149-3.225 1.664-4.771 4.919-4.919 1.265-.058 1.644-.069 4.849-.069zM12 0C8.74 0 8.351.015 7.053.072c-2.69.123-4.588 1.518-4.71 4.71-.059 1.3-.072 1.68-.072 4.938s.013 3.638.072 4.938c.122 3.193 2.02 4.588 4.71 4.71 1.299.059 1.68.072 4.938.072s3.638-.013 4.938-.072c3.193-.122 4.588-2.02 4.71-4.71.059-1.3.072-1.68.072-4.938s-.013-3.638-.072-4.938c-.122-3.193-2.02-4.588-4.71-4.71C15.638.015 15.25 0 12 0zm0 6.627a5.373 5.373 0 100 10.746 5.373 5.373 0 000-10.746zM12 15.627a3.627 3.627 0 110-7.254 3.627 3.627 0 010 7.254zM16.804 5.25a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Bukason Deigason Autos. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};


export const PublicView: React.FC = () => {
  const { cars, loading, error } = useCars();
  const [searchTerm, setSearchTerm] = useState('');

  // State for infinite scroll
  const [carsToShow, setCarsToShow] = useState(12);
  const carsPerLoad = 12;

  const filteredCars = useMemo(() => {
    const filtered = cars.filter(car => {
      return car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.year.toString().includes(searchTerm);
    });

    // Default sort by newest cars
    return filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [cars, searchTerm]);

  // Infinite scroll logic
  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
      // Check if we have more cars to show
      if (carsToShow < filteredCars.length) {
        setCarsToShow(prevCarsToShow => prevCarsToShow + carsPerLoad);
      }
    }
  }, [carsToShow, filteredCars.length]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Reset carsToShow when search term changes
  useEffect(() => {
    setCarsToShow(carsPerLoad);
  }, [searchTerm, cars]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
        <p className="ml-4 text-gray-700 text-lg">Loading cars...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <p className="text-red-600 text-xl font-semibold mb-4">Error loading cars: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300 ease-in-out text-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans animate-fadeInUp">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-700 text-white shadow-lg animate-fadeInUp">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center animate-fadeInUp">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight animate-fadeInUp animate-delay-200">
              Your Dream Car Awaits
            </h1>
            <p className="text-lg sm:text-xl mb-10 text-gray-300 max-w-2xl mx-auto animate-fadeInUp animate-delay-300">
              Explore a curated selection of quality used cars from Bukason Deigason Autos. Find your perfect ride today.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative shadow-xl rounded-full animate-fadeInUp animate-delay-400 hover-lift">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search by brand, model, or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-red-500 focus:outline-none transition-all duration-300 focus:scale-105"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeInUp animate-delay-500">
        <div className="flex flex-col gap-10">
          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-8 animate-fadeInLeft">
              <div className="animate-fadeInLeft animate-delay-100">
                <h2 className="text-3xl font-bold text-gray-900">Available Cars</h2>
                <p className="text-gray-600 text-lg">
                  {filteredCars.length} car{filteredCars.length !== 1 ? 's' : ''} found
                </p>
              </div>
              {/* Filter button removed */}
            </div>

            {/* Car Grid */}
            {filteredCars.length === 0 ? (
              <div className="text-center py-24 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100 animate-scaleIn">
                <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-red-50 rounded-full mx-auto mb-8 flex items-center justify-center shadow-lg animate-float">
                  <span className="text-6xl text-red-500">🚗</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">No cars found</h3>
                <p className="text-gray-600 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
                  It seems there are no cars matching your current search criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                  }}
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300 ease-in-out shadow-lg hover:scale-105 hover:shadow-xl font-medium"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-fadeInUp animate-delay-300">
                {filteredCars.slice(0, carsToShow).map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            )}

            {/* Loading more cars indicator */}
            {carsToShow < filteredCars.length && (
              <div className="flex flex-col items-center py-12 animate-fadeInUp">
                <div className="animate-spin rounded-full h-10 w-10 border-t-3 border-b-3 border-red-600 mb-4"></div>
                <p className="text-gray-600 font-medium">Loading more cars...</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};