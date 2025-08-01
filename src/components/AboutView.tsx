import React from 'react';
import { Car, Users, Award, Clock } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-sans animate-fadeInUp">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-700 text-white shadow-lg animate-fadeInUp">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight animate-fadeInUp animate-delay-200">
            About Bukason Deigason Autos
          </h1>
          <p className="text-lg sm:text-xl mb-10 text-gray-300 max-w-2xl mx-auto animate-fadeInUp animate-delay-300">
            Your trusted partner in finding quality pre-owned vehicles. We've been serving customers with integrity and excellence for years.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fadeInUp animate-delay-400">
        {/* Our Story */}
        <div className="bg-white rounded-xl shadow-lg p-8 hover-lift animate-scaleIn">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Founded with a passion for connecting people with their perfect vehicles, Bukason Deigason Autos has grown to become a trusted name in the automotive industry.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInLeft">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 animate-fadeInUp">Quality & Trust</h3>
              <p className="text-gray-600 mb-6">
                Every vehicle in our inventory undergoes a thorough inspection to ensure quality and reliability. We believe in transparency and provide detailed information about each car's history and condition.
              </p>
              <p className="text-gray-600">
                Our commitment to customer satisfaction has made us a preferred choice for car buyers looking for value, quality, and peace of mind.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-inner p-8 animate-fadeInRight hover-lift">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center animate-scaleIn animate-delay-100">
                  <div className="text-4xl font-extrabold text-red-600 mb-2">500+</div>
                  <div className="text-gray-600">Cars Sold</div>
                </div>
                <div className="text-center animate-scaleIn animate-delay-200">
                  <div className="text-4xl font-extrabold text-red-600 mb-2">98%</div>
                  <div className="text-gray-600">Satisfaction Rate</div>
                </div>
                <div className="text-center animate-scaleIn animate-delay-300">
                  <div className="text-4xl font-extrabold text-red-600 mb-2">5+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="text-center animate-scaleIn animate-delay-400">
                  <div className="text-4xl font-extrabold text-red-600 mb-2">24/7</div>
                  <div className="text-gray-600">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div>
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-fadeInUp animate-delay-100">Our Values</h2>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-white rounded-xl shadow-lg p-6 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover-lift animate-scaleIn animate-delay-200">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner animate-float">
                <Award className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality</h3>
              <p className="text-gray-600">
                We ensure every vehicle meets our high standards before listing
              </p>
            </div>

            <div className="text-center bg-white rounded-xl shadow-lg p-6 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover-lift animate-scaleIn animate-delay-300">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner animate-float">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Trust</h3>
              <p className="text-gray-600">
                Transparent dealings and honest communication with all customers
              </p>
            </div>

            <div className="text-center bg-white rounded-xl shadow-lg p-6 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover-lift animate-scaleIn animate-delay-400">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner animate-float">
                <Car className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Variety</h3>
              <p className="text-gray-600">
                Wide selection of vehicles to match every need and budget
              </p>
            </div>

            <div className="text-center bg-white rounded-xl shadow-lg p-6 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover-lift animate-scaleIn animate-delay-500">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner animate-float">
                <Clock className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Service</h3>
              <p className="text-gray-600">
                Dedicated support throughout your car buying journey
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl shadow-xl p-10 text-center text-white hover-lift animate-scaleIn">
          <h2 className="text-3xl font-bold mb-4 animate-fadeInUp">Ready to Find Your Perfect Car?</h2>
          <p className="text-xl mb-8 text-red-100">
            Browse our extensive inventory and discover your next vehicle today
          </p>
          <a
            href="/"
            className="inline-block bg-white text-red-600 px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105 hover-lift animate-fadeInUp animate-delay-200"
          >
            Browse Cars
          </a>
        </div>
      </div>
    </div>
  );
};
