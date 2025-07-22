import { useState, useEffect } from 'react'
import axios from 'axios'
import './Counter.css'

const Counter = () => {
  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [apiCalls, setApiCalls] = useState(0)

  // Configure your Django backend URL here
  const API_URL = 'http://localhost:8000/api/counter/'

  const fetchCounter = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(API_URL)
      setCount(response.data.value)
      setError(null)
      setApiCalls(prev => prev + 1)
    } catch (err) {
      setError('Failed to fetch counter. Is the backend running?')
      console.error('Error fetching counter:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const updateCounter = async (action) => {
    try {
      const response = await axios.post(API_URL, { action })
      setCount(response.data.value)
      setError(null)
      setApiCalls(prev => prev + 1)
    } catch (err) {
      setError('Failed to update counter')
      console.error('Error updating counter:', err)
    }
  }

  // Fetch counter on component mount
  useEffect(() => {
    fetchCounter()
  }, [])

  // Handler functions
  const handleIncrement = () => updateCounter('increment')
  const handleDecrement = () => updateCounter('decrement')
  const handleReset = () => updateCounter('reset')
  const handleRefresh = () => fetchCounter()

  if (isLoading) {
    return (
      <div className="counter-app loading">
        <h1>Counter App</h1>
        <div className="loading-spinner"></div>
        <p>Loading counter value...</p>
      </div>
    )
  }

  return (
    <div className="counter-app">
      <h1>Counter App</h1>
      
      {error && (
        <div className="error-message">
          {error}
          <button onClick={handleRefresh} className="retry-btn">
            Retry
          </button>
        </div>
      )}
      
      <div className="counter-display">
        <span className="counter-value">{count}</span>
        <div className="counter-actions">
          <button 
            onClick={handleDecrement}
            className="btn btn-decrement"
            disabled={isLoading}
          >
            -
          </button>
          <button 
            onClick={handleReset}
            className="btn btn-reset"
            disabled={isLoading}
          >
            Reset
          </button>
          <button 
            onClick={handleIncrement}
            className="btn btn-increment"
            disabled={isLoading}
          >
            +
          </button>
        </div>
      </div>
      
      <div className="counter-info">
        <p>This counter is persisted in the backend database.</p>
        <p>API calls: {apiCalls}</p>
        <button onClick={handleRefresh} className="refresh-btn">
          Refresh Counter
        </button>
      </div>
    </div>
  )
}

export default Counter
