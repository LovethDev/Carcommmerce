import React from 'react'
import { Filter, X } from 'lucide-react'

interface FilterSidebarProps {
  isOpen: boolean
  onClose: () => void // Corrected type: () => void, not () => () => void
  brands: string[]
  selectedBrand: string
  onBrandChange: (brand: string) => void
  priceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
  yearRange: [number, number]
  onYearRangeChange: (range: [number, number]) => void
  sortBy: string
  onSortChange: (sort: string) => void
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  onClose,
  brands,
  selectedBrand,
  onBrandChange,
  priceRange,
  onPriceRangeChange,
  yearRange,
  onYearRangeChange,
  sortBy,
  onSortChange,
}) => {
  const currentYear = new Date().getFullYear()

  // Define a sensible maximum price for the input
  const maxPriceValue = 2_000_000_000_000;
  // Define a larger step for smoother increment/decrement over a vast range
  const priceStep = 1_000_000;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden animate-fadeInUp"
          onClick={onClose}
        />
      )}

      <div className={`
        fixed lg:relative top-0 right-0 h-full lg:h-auto w-80 lg:w-64 bg-white shadow-xl lg:shadow-none z-50 hover-lift
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 animate-fadeInUp">
          <div className="flex items-center justify-between mb-6 lg:mb-4 animate-fadeInUp">
            <div className="flex items-center">
              <Filter className="w-5 h-5 text-gray-600 mr-2 animate-float" />
              <h3 className="font-semibold text-gray-900">Filters</h3>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 text-gray-400 hover:text-gray-600 transition-all duration-300 hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sort */}
          <div className="mb-6 animate-fadeInUp animate-delay-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort by
            </label>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 focus:scale-105"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="year-new">Year: Newest First</option>
              <option value="year-old">Year: Oldest First</option>
            </select>
          </div>

          {/* Brand */}
          <div className="mb-6 animate-fadeInUp animate-delay-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand
            </label>
            <select
              value={selectedBrand}
              onChange={(e) => onBrandChange(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 focus:scale-105"
            >
              <option value="">All Brands</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="mb-6 animate-fadeInUp animate-delay-300">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range
            </label>
            <div className="space-y-2">
              <input
                type="number"
                placeholder="Min Price"
                value={priceRange[0]}
                onChange={(e) => onPriceRangeChange([
                  parseInt(e.target.value) || 0,
                  priceRange[1]
                ])}
                min="0"
                step={priceStep} // Corrected: Comment moved
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 focus:scale-105"
              />
              {/* Increased step */} {/* Comment moved here */}
              <input
                type="number"
                placeholder="Max Price"
                value={priceRange[1]}
                onChange={(e) => onPriceRangeChange([
                  priceRange[0],
                  parseInt(e.target.value) || maxPriceValue
                ])}
                min="0"
                step={priceStep} // Corrected: Comment moved
                max={maxPriceValue}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 focus:scale-105"
              />
              {/* Increased step */} {/* Comment moved here */}
            </div>
          </div>

          {/* Year Range */}
          <div className="mb-6 animate-fadeInUp animate-delay-400">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Year Range
            </label>
            <div className="space-y-2">
              <input
                type="number"
                placeholder="Min Year"
                value={yearRange[0]}
                onChange={(e) => onYearRangeChange([
                  parseInt(e.target.value) || 1990,
                  yearRange[1]
                ])}
                min="1990"
                max={currentYear}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 focus:scale-105"
              />
              <input
                type="number"
                placeholder="Max Year"
                value={yearRange[1]}
                onChange={(e) => onYearRangeChange([
                  yearRange[0],
                  parseInt(e.target.value) || currentYear
                ])}
                min="1990"
                max={currentYear}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 focus:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}