import React, { useState, useMemo } from 'react'
import { Filter, Search } from 'lucide-react'
import { useCars } from '../hooks/useCars'
import { CarCard } from './CarCard'
import { FilterSidebar } from './FilterSidebar'
import type { Car } from '../lib/supabase'

export const PublicView: React.FC = () => {
  const { cars, loading, error } = useCars()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')

  // Define the maximum price value consistent with FilterSidebar
  // This value allows for prices up to 2 trillion.
  const MAX_POSSIBLE_PRICE = 2_000_000_000_000;

  // Initialize priceRange with the new maximum
  const [priceRange, setPriceRange] = useState<[number, number]>([0, MAX_POSSIBLE_PRICE]);

  const [yearRange, setYearRange] = useState<[number, number]>([1990, new Date().getFullYear()])
  const [sortBy, setSortBy] = useState('newest')
  const [showFilters, setShowFilters] = useState(false)

  // Get unique brands
  const brands = useMemo(() => {
    const uniqueBrands = [...new Set(cars.map(car => car.brand))]
    return uniqueBrands.sort()
  }, [cars])

  // Filter and sort cars
  const filteredCars = useMemo(() => {
    let filtered = cars.filter(car => {
      // Ensure price is a valid number
      const carPrice = Number(car.price)
      if (isNaN(carPrice)) return false

      const matchesSearch =
        car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesBrand = !selectedBrand || car.brand === selectedBrand
      const matchesPrice = carPrice >= priceRange[0] && carPrice <= priceRange[1]
      const matchesYear = car.year >= yearRange[0] && car.year <= yearRange[1]

      return matchesSearch && matchesBrand && matchesPrice && matchesYear
    })

    // Sort cars
    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => Number(a.price) - Number(b.price))
      case 'price-high':
        return filtered.sort((a, b) => Number(b.price) - Number(a.price))
      case 'year-new':
        return filtered.sort((a, b) => b.year - a.year)
      case 'year-old':
        return filtered.sort((a, b) => a.year - b.year)
      case 'newest':
      default:
        return filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    }
  }, [cars, searchTerm, selectedBrand, priceRange, yearRange, sortBy])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading cars: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Perfect Car
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Browse our extensive collection of quality used cars at Bukason Deigason Autos
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by brand or model..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-red-300 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
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
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Available Cars</h2>
                <p className="text-gray-600">
                  {filteredCars.length} car{filteredCars.length !== 1 ? 's' : ''} found
                </p>
              </div>

              <button
                onClick={() => setShowFilters(true)}
                className="lg:hidden flex items-center bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </button>
            </div>

            {/* Car Grid */}
            {filteredCars.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl text-gray-400">🚗</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No cars found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or filters
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedBrand('')
                    // Set priceRange to its initial full range
                    setPriceRange([0, MAX_POSSIBLE_PRICE])
                    setYearRange([1990, new Date().getFullYear()])
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}