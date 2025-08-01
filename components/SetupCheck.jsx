import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient.js'
import './SetupCheck.css'

function SetupCheck({ children }) {
  const [isConfigured, setIsConfigured] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    checkSupabaseConnection()
  }, [])

  const checkSupabaseConnection = async () => {
    try {
      // Check if Supabase credentials are available
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

      if (!supabaseUrl || !supabaseKey) {
        console.warn('⚠️ Supabase credentials not found - app will work in demo mode')
        setIsConfigured(true) // Allow app to work without credentials
        setIsLoading(false)
        return
      }

      // Try to perform a simple query to check if Supabase is configured
      const { data, error } = await supabase
        .from('crewmates')
        .select('count')
        .limit(1)

      if (error && error.message.includes('relation "crewmates" does not exist')) {
        console.warn('⚠️ Database table missing - app will work in demo mode')
        setIsConfigured(true) // Allow app to work without database
        setError('database_not_setup')
      } else if (error) {
        console.warn('⚠️ Connection failed - app will work in demo mode')
        setIsConfigured(true) // Allow app to work with connection issues
        setError('connection_failed')
      } else {
        setIsConfigured(true)
      }
    } catch (err) {
      console.warn('⚠️ Setup check failed - app will work in demo mode')
      setIsConfigured(true) // Allow app to work even with errors
      setError('credentials_missing')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="setup-check loading">
        <div className="container">
          <h2>🚀 Loading Crewmate Creator...</h2>
          <div className="spinner"></div>
        </div>
      </div>
    )
  }

  // Show warning banner if there are issues, but still show the app
  if (error) {
    return (
      <div className="App">
        <div className="setup-warning">
          <div className="warning-content">
            <h3>⚠️ Demo Mode</h3>
            <p>Supabase is not configured. The app will work in demo mode.</p>
            <button onClick={checkSupabaseConnection} className="btn btn-primary">
              Check Again
            </button>
          </div>
        </div>
        {children}
      </div>
    )
  }

  return children
}

export default SetupCheck
