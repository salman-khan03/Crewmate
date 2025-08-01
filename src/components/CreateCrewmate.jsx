import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient.js'
import './CreateCrewmate.css'

const colors = ['Red', 'Green', 'Blue', 'Purple', 'Yellow', 'Orange', 'Pink', 'Brown']

// Category-based attribute system with icons
const categories = {
  'Pirate': {
    icon: '🏴‍☠️',
    attributes: [
      { category: 'Speed', icon: '⚡', options: ['Slow', 'Normal', 'Fast', 'Super Fast'] },
      { category: 'Color', icon: '🎨', options: colors },
      { category: 'Strength', icon: '💪', options: ['Weak', 'Average', 'Strong', 'Super Strong'] },
      { category: 'Personality', icon: '😊', options: ['Friendly', 'Serious', 'Funny', 'Mysterious', 'Brave', 'Shy'] }
    ]
  },
  'Developer': {
    icon: '💻',
    attributes: [
      { category: 'Speed', icon: '⚡', options: ['Slow', 'Normal', 'Fast', 'Super Fast'] },
      { category: 'Color', icon: '🎨', options: colors },
      { category: 'Strength', icon: '💪', options: ['Junior', 'Mid-level', 'Senior', 'Lead'] },
      { category: 'Personality', icon: '😊', options: ['Analytical', 'Creative', 'Team Player', 'Independent', 'Detail-oriented', 'Big Picture'] }
    ]
  },
  'Gamer': {
    icon: '🎮',
    attributes: [
      { category: 'Speed', icon: '⚡', options: ['Slow', 'Normal', 'Fast', 'Super Fast'] },
      { category: 'Color', icon: '🎨', options: colors },
      { category: 'Strength', icon: '💪', options: ['Casual', 'Regular', 'Hardcore', 'Pro'] },
      { category: 'Personality', icon: '😊', options: ['Competitive', 'Cooperative', 'Strategic', 'Aggressive', 'Patient', 'Impulsive'] }
    ]
  }
}

function CreateCrewmate() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    speed: '',
    color: '',
    strength: '',
    personality: ''
  })
  const [loading, setLoading] = useState(false)

  // Debug: Log when component mounts
  useEffect(() => {
    console.log('🚀 CreateCrewmate component mounted')
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      alert('Please enter a name for your crewmate')
      return
    }

    setLoading(true)
    try {
      // Check if Supabase is configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

      if (!supabaseUrl || !supabaseKey) {
        // Demo mode - show success message
        alert('✅ Crewmate created successfully! (Demo mode - no database connection)')
        navigate('/gallery')
        return
      }

      const { data, error } = await supabase
        .from('crewmates')
        .insert([
          {
            name: formData.name,
            speed: formData.speed,
            color: formData.color,
            strength: formData.strength,
            personality: formData.personality,
            category: selectedCategory,
            created_at: new Date().toISOString()
          }
        ])

      if (error) throw error

      navigate('/gallery')
    } catch (error) {
      console.error('Error creating crewmate:', error)
      alert('Error creating crewmate. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleAttributeChange = (category, value) => {
    setFormData(prev => ({
      ...prev,
      [category.toLowerCase()]: value
    }))
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    // Reset form data when category changes
    setFormData({
      name: formData.name, // Keep the name
      speed: '',
      color: '',
      strength: '',
      personality: ''
    })
  }

  const currentAttributes = selectedCategory ? categories[selectedCategory]?.attributes : []

  return (
    <div className="create-crewmate">
      <div className="container">
        <h1>🚀 Create a New Crewmate</h1>
        <p className="page-description">Choose a category and customize your crewmate's attributes!</p>
        
        <form onSubmit={handleSubmit} className="crewmate-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              <span className="label-icon">👤</span>
              <span className="label-text">Name:</span>
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter crewmate name"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">🏷️</span>
              <span className="label-text">Category:</span>
            </label>
            <div className="category-options">
              {Object.keys(categories).map(category => (
                <button
                  key={category}
                  type="button"
                  className={`category-btn ${selectedCategory === category ? 'selected' : ''}`}
                  onClick={() => handleCategoryChange(category)}
                >
                  <span className="category-icon">{categories[category].icon}</span>
                  <span className="category-text">{category}</span>
                </button>
              ))}
            </div>
          </div>

          {selectedCategory && (
            <div className="attributes-section">
              <h3 className="section-title">
                <span className="section-icon">{categories[selectedCategory].icon}</span>
                {selectedCategory} Attributes
              </h3>
              {currentAttributes.map(attribute => (
                <div key={attribute.category} className="form-group">
                  <label className="form-label">
                    <span className="label-icon">{attribute.icon}</span>
                    <span className="label-text">{attribute.category}:</span>
                  </label>
                  <div className="attribute-options">
                    {attribute.options.map(option => (
                      <button
                        key={option}
                        type="button"
                        className={`attribute-btn ${
                          formData[attribute.category.toLowerCase()] === option ? 'selected' : ''
                        }`}
                        onClick={() => handleAttributeChange(attribute.category, option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading || !selectedCategory}>
              {loading ? '⏳ Creating...' : '✅ Create Crewmate'}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => navigate('/gallery')}
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateCrewmate
