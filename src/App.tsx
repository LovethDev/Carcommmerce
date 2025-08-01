import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { PublicView } from './components/PublicView'
import { AdminPage } from './components/AdminPage'
import { AboutView } from './components/AboutView'
import { ContactView } from './components/ContactView'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <Header />
      
      <Routes>
        <Route path="/" element={<PublicView />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/about" element={<AboutView />} />
        <Route path="/contact" element={<ContactView />} />
      </Routes>
    </div>
  )
}

export default App