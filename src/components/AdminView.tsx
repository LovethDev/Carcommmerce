import React, { useState } from 'react'
import { Plus, Edit2, Trash2, Eye } from 'lucide-react'
import { useCars } from '../hooks/useCars'
import { supabase } from '../lib/supabase'
import { CarForm } from './CarForm'
import type { Car } from '../lib/supabase'

export const AdminView: React.FC = () => {
  const { cars, loading: carsLoading, refetch } = useCars()
  const [showCarForm, setShowCarForm] = useState(false)
  const [editingCar, setEditingCar] = useState<Car | undefined>()

  const handleEditCar = (car: Car) => {
    setEditingCar(car)
    setShowCarForm(true)
  }

  const handleDeleteCar = async (car: Car) => {
    if (!window.confirm(`Are you sure you want to delete ${car.brand} ${car.model}?`)) {
      return
    }

    try {
      // Delete image from storage if exists
      if (car.image_url) {
        const imagePath = car.image_url.split('/').pop()
        if (imagePath) {
          await supabase.storage
            .from('car-images')
            .remove([imagePath])
        }
      }

      // Delete car from database
      const { error } = await supabase
        .from('cars')
        .delete()
        .eq('id', car.id)

      if (error) throw error

      refetch()
    } catch (error) {
      console.error('Error deleting car:', error)
      alert('Failed to delete car')
    }
  }

  const handleFormSubmit = () => {
    setShowCarForm(false)
    setEditingCar(undefined)
    refetch()
  }

  const handleFormCancel = () => {
    setShowCarForm(false)
    setEditingCar(undefined)
  }

  const formatPrice = (price: number) => {
    // Handle edge cases and ensure price is a valid number
    if (!price || isNaN(price) || price < 0) {
      return '₦0'
    }
    
    // Format large numbers with proper separators
    const formattedNumber = price.toLocaleString('en-NG', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    
    return `₦${formattedNumber}`
  }

  if (showCarForm) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <CarForm
            car={editingCar}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 animate-fadeInUp">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 animate-fadeInUp">
          <div className="animate-fadeInLeft">
            <h1 className="text-3xl font-bold text-gray-900">Car Management</h1>
            <p className="text-gray-600 mt-1">
              Manage your car listings and inventory
            </p>
          </div>
          <button
            onClick={() => setShowCarForm(true)}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 flex items-center font-medium transition-all duration-300 hover:scale-105 hover-lift animate-fadeInRight"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Car
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fadeInUp animate-delay-200">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 hover-lift animate-scaleIn border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-red-100 to-red-50 rounded-xl animate-float shadow-inner">
                <Eye className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-3xl font-bold text-gray-900">{cars.length}</p>
                <p className="text-gray-600 font-medium">Total Cars</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 hover-lift animate-scaleIn animate-delay-100 border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-green-100 to-green-50 rounded-xl animate-float shadow-inner">
                <span className="text-green-600 font-bold text-xl">₦</span>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {formatPrice(cars.reduce((sum, car) => sum + car.price, 0))}
                </p>
                <p className="text-gray-600 font-medium">Total Inventory Value</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cars Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover-lift animate-fadeInUp animate-delay-300 border border-gray-100">
          <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white animate-fadeInUp">
            <h2 className="text-xl font-bold text-gray-900">Car Listings</h2>
            <p className="text-gray-600 text-sm mt-1">Manage your vehicle inventory</p>
          </div>
          
          {carsLoading ? (
            <div className="flex items-center justify-center py-12 animate-fadeInUp">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            </div>
          ) : cars.length === 0 ? (
            <div className="text-center py-16 animate-scaleIn">
              <div className="w-28 h-28 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center animate-float shadow-inner">
                <span className="text-5xl text-gray-400">🚗</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No cars yet</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">Start by adding your first car listing to begin managing your inventory</p>
              <button
                onClick={() => setShowCarForm(true)}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300 hover:scale-105 hover:shadow-xl font-medium"
              >
                Add Your First Car
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 animate-fadeInUp animate-delay-100">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Car
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Year
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Added
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cars.map((car) => (
                    <tr key={car.id} className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all duration-300 animate-fadeInUp border-b border-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-14 w-14">
                            {car.image_url ? (
                              <img
                                className="h-14 w-14 rounded-xl object-cover transition-transform duration-300 hover:scale-110 shadow-md"
                                src={car.image_url}
                                alt={`${car.brand} ${car.model}`}
                              />
                            ) : (
                              <div className="h-14 w-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shadow-inner">
                                <span className="text-gray-500 text-lg">🚗</span>
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-base font-bold text-gray-900">
                              {car.brand} {car.model}
                            </div>
                            <div className="text-sm text-gray-600 line-clamp-1 mt-1">
                              {car.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">{car.year}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-base font-bold text-green-600">
                        {formatPrice(car.price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(car.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleEditCar(car)}
                            className="text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-xl transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md"
                            title="Edit car"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteCar(car)}
                            className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-xl transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md"
                            title="Delete car"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}