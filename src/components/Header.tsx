import React, { useState } from 'react'
import { Car, Menu, X } from 'lucide-react' // Removed LogOut, Plus, User
import { Link, useLocation } from 'react-router-dom'
// import { useAuth } from '../hooks/useAuth' // Removed useAuth as it's no longer needed for header functionality

export const Header: React.FC = () => {
  // const { user, signOut } = useAuth() // No longer needed
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // const handleSignOut = async () => { // No longer needed
  //   await signOut()
  //   setIsMobileMenuOpen(false)
  // }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="bg-gray-900 shadow-sm border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Car className="h-8 w-8 text-red-500 mr-3" />
            <Link to="/" className="text-xl font-bold text-white hover:text-gray-300 transition-colors">
              <span className="hidden sm:inline">Bukason Deigason Autos</span>
              <span className="sm:hidden">BDA</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-red-700 text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Browse Cars
            </Link>
            <Link
              to="/about"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive('/about') 
                  ? 'bg-red-700 text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive('/contact') 
                  ? 'bg-red-700 text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Contact
            </Link>
            {/* Removed Admin Panel/Sign Out and Seller Login links from desktop nav */}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
              aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-label="Close menu" />
              ) : (
                <Menu className="h-6 w-6" aria-label="Open menu" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 shadow-lg pb-4">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-red-700 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Browse Cars
            </Link>
            <Link
              to="/about"
              onClick={closeMobileMenu}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/about') 
                  ? 'bg-red-700 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              onClick={closeMobileMenu}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/contact') 
                  ? 'bg-red-700 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Contact
            </Link>
            {/* Removed Admin Panel/Sign Out and Seller Login links from mobile menu */}
          </div>
        </div>
      )}
    </header>
  )
}