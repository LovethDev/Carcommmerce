import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Car } from '../lib/supabase'

export const useCars = () => {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCars = async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await supabase
        .from('cars')
        .select(`
          id,
          model,
          brand,
          year,
          price,
          description,
          image_url,
          image_urls,
          created_at,
          updated_at
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setCars(data || [])
    } catch (err) {
      console.error('Error fetching cars:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCars()

    // Subscribe to real-time changes
    const subscription = supabase
      .channel('cars')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'cars'
      }, () => {
        fetchCars()
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return { cars, loading, error, refetch: fetchCars }
}