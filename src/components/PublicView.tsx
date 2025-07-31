import React, { useState, useMemo } from 'react';
import { Filter, Search } from 'lucide-react';
import { useCars } from '../hooks/useCars';
import { CarCard } from './CarCard';
import { FilterSidebar } from './FilterSidebar';
import type { Car } from '../lib/supabase';

export const PublicView: React.FC = () => {
  const { cars, loading, error } = useCars();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  // Define the maximum price value consistent with FilterSidebar
  const MAX_POSSIBLE_PRICE = 2_000_000_000_000;

  // Initialize priceRange with the new maximum
  const [priceRange, setPriceRange] = useState<[number, number]>([0, MAX_POSSIBLE_PRICE]);

  const [yearRange, setYearRange] = useState<[number, number]>([1990, new Date().getFullYear()]);
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique brands
  const brands = useMemo(() => {
    const uniqueBrands = [...new Set(cars.map(car => car.brand))];
    return uniqueBrands.sort();
  }, [cars]);

  // Filter and sort cars
  const filteredCars = useMemo(() => {
    let filtered = cars.filter(car => {
      // Ensure price is a valid number
      const carPrice = Number(car.price);
      if (isNaN(carPrice)) return false;

      const matchesSearch =
        car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesBrand = !selectedBrand || car.brand === selectedBrand;
      const matchesPrice = carPrice >= priceRange[0] && carPrice <= priceRange[1];
      const matchesYear = car.year >= yearRange[0] && car.year <= yearRange[1];

      return matchesSearch && matchesBrand && matchesPrice && matchesYear;
    });

    // Sort cars
    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => Number(a.price) - Number(b.price));
      case 'price-high':
        return filtered.sort((a, b) => Number(b.price) - Number(a.price));
      case 'year-new':
        return filtered.sort((a, b) => b.year - a.year);
      case 'year-old':
        return filtered.sort((a, b) => a.year - b.year);
      case 'newest':
      default:
        return filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
  }, [cars, searchTerm, selectedBrand, priceRange, yearRange, sortBy]);

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
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
              Your Dream Car Awaits
            </h1>
            <p className="text-lg sm:text-xl mb-10 text-gray-300 max-w-2xl mx-auto">
              Explore a curated selection of quality used cars from Bukason Deigason Autos. Find your perfect ride today.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative shadow-xl rounded-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search by brand, model, or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-red-500 focus:outline-none transition duration-200"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar - Hidden on mobile by default, shown via button */}
          <FilterSidebar
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
            brands={brands}
            selectedBrand={selectedBrand}
            onBrandChange={setSelectedBrand}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            yearRange={yearRange}
            onYearRangeChange={setYearRange}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header and Filter Button for Mobile */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Available Cars</h2>
                <p className="text-gray-600 text-lg">
                  {filteredCars.length} car{filteredCars.length !== 1 ? 's' : ''} found
                </p>
              </div>

              <button
                onClick={() => setShowFilters(true)}
                className="lg:hidden flex items-center bg-red-600 text-white px-5 py-3 rounded-full shadow-md hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </button>
            </div>

            {/* Car Grid */}
            {filteredCars.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl shadow-lg border border-gray-200">
                <div className="w-28 h-28 bg-red-100 rounded-full mx-auto mb-6 flex items-center justify-center shadow-inner">
                  <span className="text-5xl text-red-500">🚗</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No cars found</h3>
                <p className="text-gray-600 text-lg mb-6 max-w-md mx-auto">
                  It seems there are no cars matching your current search criteria or filters.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedBrand('');
                    setPriceRange([0, MAX_POSSIBLE_PRICE]);
                    setYearRange([1990, new Date().getFullYear()]);
                    setSortBy('newest'); // Reset sort too
                  }}
                  className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out shadow-md"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};