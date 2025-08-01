import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, XCircle } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission logic (e.g., API call)
    console.log('Form data submitted:', formData);

    // Show the custom success message instead of an alert
    setShowSuccessMessage(true);
    
    // Hide the message after 5 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);

    // Reset the form fields
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans animate-fadeInUp">
      {/* Success Message Modal */}
      {showSuccessMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50 transition-opacity duration-300 animate-fadeInUp">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-sm w-full transform scale-100 transition-all duration-300 animate-scaleIn">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-900">Message Sent!</h3>
              <button onClick={() => setShowSuccessMessage(false)} className="text-gray-400 hover:text-gray-600 transition-all duration-300 hover:scale-110">
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Thank you for your message. We will get back to you as soon as possible.
            </p>
            <button
              onClick={() => setShowSuccessMessage(false)}
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-all duration-300 hover:scale-105 hover-lift"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-700 text-white shadow-lg animate-fadeInUp">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight animate-fadeInUp animate-delay-200">
            Contact Us
          </h1>
          <p className="text-lg sm:text-xl mb-10 text-gray-300 max-w-2xl mx-auto animate-fadeInUp animate-delay-300">
            Get in touch with Bukason Deigason Autos. We're here to help you find your perfect vehicle.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeInUp animate-delay-400">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8 animate-fadeInLeft">
            <div className="bg-white rounded-xl shadow-lg p-8 hover-lift animate-scaleIn">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 animate-fadeInUp">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start animate-fadeInUp animate-delay-100">
                  <div className="bg-red-50 p-3 rounded-full mr-4 shadow-inner animate-float">
                    <Phone className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600">+2348058490498</p>
                   
                  </div>
                </div>

                <div className="flex items-start animate-fadeInUp animate-delay-200">
                  <div className="bg-red-50 p-3 rounded-full mr-4 shadow-inner animate-float">
                    <Mail className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">Bukasondeigaautos@gmail.com</p>
                    
                  </div>
                </div>

                <div className="flex items-start animate-fadeInUp animate-delay-300">
                  <div className="bg-red-50 p-3 rounded-full mr-4 shadow-inner animate-float">
                    <MapPin className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Address</h3>
                    <p className="text-gray-600">
                      123 Auto Plaza Street, Lagos, Nigeria, 100001
                    </p>
                  </div>
                </div>

                <div className="flex items-start animate-fadeInUp animate-delay-400">
                  <div className="bg-red-50 p-3 rounded-full mr-4 shadow-inner animate-float">
                    <Clock className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Business Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Saturday: 9:00 AM - 4:00 PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover-lift animate-scaleIn animate-delay-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 animate-fadeInUp">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => window.open('tel:++2348058490498')}
                  className="w-full bg-red-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 ease-in-out transform hover:scale-105 font-medium flex items-center justify-center hover-lift animate-fadeInUp animate-delay-100"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call for Inspection
                </button>
                <button
                  onClick={() => window.open('mailto:Bukasondeigaautos@gmail.com')}
                  className="w-full bg-gray-700 text-white py-3 px-4 rounded-lg shadow-md hover:bg-gray-800 transition-all duration-300 ease-in-out font-medium flex items-center justify-center hover-lift animate-fadeInUp animate-delay-200"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8 h-full hover-lift animate-fadeInRight">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 animate-fadeInUp">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="animate-fadeInUp animate-delay-100">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 focus:scale-105"
                  placeholder="Your full name"
                />
              </div>

              <div className="animate-fadeInUp animate-delay-200">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 focus:scale-105"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="animate-fadeInUp animate-delay-300">
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 focus:scale-105"
                  placeholder="+234 123 456 7890"
                />
              </div>

              <div className="animate-fadeInUp animate-delay-400">
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 focus:scale-105"
                  placeholder="Tell us about the car you're looking for or any questions you have..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 ease-in-out font-medium flex items-center justify-center transform hover:scale-105 hover-lift animate-fadeInUp animate-delay-500"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
