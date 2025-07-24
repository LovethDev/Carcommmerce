import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { AuthForm } from './AuthForm'
import { AdminView } from './AdminView'

export const AdminPage: React.FC = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    )
  }

  if (!user) {
    return <AuthForm />
  }

  return <AdminView />
}