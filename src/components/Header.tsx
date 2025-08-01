import React, { useState } from 'react';
import { Car, Menu, X, LogIn } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Function to determine if a link is active
  const isActive = (path: string) => location.pathname === path;

  // Close mobile menu handler
  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg border-b border-gray-700 font-inter animate-slideInDown backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand Name */}
          <div className="flex items-center animate-fadeInLeft">
            <Car className="h-8 w-8 text-red-500 mr-2 animate-float" />
            <Link
              to="/"
              className="text-xl font-extrabold text-white hover:text-red-300 transition-all duration-300 ease-in-out flex items-center gap-2 hover:scale-105"
            >
              <span className="hidden sm:inline">Bukason Deigason Autos</span>
              <span className="sm:hidden">BDA</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 animate-fadeInRight">
            <Link
              to="/"
              className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ease-in-out transform hover:scale-105
                ${isActive('/')
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                }
                before:absolute before:inset-0 before:rounded-full before:border-2 before:border-transparent before:transition-all before:duration-300 before:ease-in-out
                ${isActive('/') ? 'before:border-red-500' : 'hover:before:border-gray-600'}
              `}
            >
              Browse Cars
            </Link>
            <Link
              to="/about"
              className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ease-in-out transform hover:scale-105
                ${isActive('/about')
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                }
                before:absolute before:inset-0 before:rounded-full before:border-2 before:border-transparent before:transition-all before:duration-300 before:ease-in-out
                ${isActive('/about') ? 'before:border-red-500' : 'hover:before:border-gray-600'}
              `}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ease-in-out transform hover:scale-105
                ${isActive('/contact')
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                }
                before:absolute before:inset-0 before:rounded-full before:border-2 before:border-transparent before:transition-all before:duration-300 before:ease-in-out
                ${isActive('/contact') ? 'before:border-red-500' : 'hover:before:border-gray-600'}
              `}
            >
              Contact
            </Link>
            {/* Admin Login Button - Desktop */}
            <Link
              to="/admin"
            
            >
         
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center animate-fadeInRight">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500 p-2 rounded-md transition-all duration-300 hover:scale-110"
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

      {/* Mobile Menu (Plain Tailwind CSS) */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-gray-900 bg-opacity-95 backdrop-blur-sm flex flex-col items-start p-6 animate-fadeInLeft">
          <div className="flex justify-between items-center w-full mb-8 animate-fadeInUp">
            <Link to="/" className="text-xl font-bold text-white flex items-center gap-2" onClick={handleCloseMobileMenu}>
              <Car className="h-7 w-7 text-red-500 animate-float" /> BDA
            </Link>
            <button
              onClick={handleCloseMobileMenu}
              className="text-gray-400 hover:text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500 transition-all duration-300 hover:scale-110"
            >
              <X className="h-6 w-6" aria-label="Close menu" />
            </button>
          </div>
          <nav className="flex flex-col space-y-4 w-full animate-fadeInUp animate-delay-200">
            <Link
              to="/"
              onClick={handleCloseMobileMenu}
              className={`block w-full text-left px-4 py-3 rounded-lg text-lg font-medium transition-all duration-300 hover:scale-105 hover-lift
                ${isActive('/')
                  ? 'bg-red-700 text-white shadow-md'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }
              `}
            >
              Browse Cars
            </Link>
            <Link
              to="/about"
              onClick={handleCloseMobileMenu}
              className={`block w-full text-gray-500 text-left px-4 py-3 rounded-lg text-lg font-medium transition-all duration-300 hover:scale-105 hover-lift
                ${isActive('/about')
                  ? 'bg-red-700 text-white shadow-md'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }
              `}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              onClick={handleCloseMobileMenu}
              className={`block w-full text-left px-4 py-3 rounded-lg text-lg font-medium transition-all duration-300 hover:scale-105 hover-lift
                ${isActive('/contact')
                  ? 'bg-red-700 text-white shadow-md'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }
              `}
            >
              Contact
            </Link>
            {/* Admin Login Button - Mobile */}
            <Link
              to="/admin"
              onClick={handleCloseMobileMenu}
              className="transition-all duration-300 hover:scale-105">
             
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
