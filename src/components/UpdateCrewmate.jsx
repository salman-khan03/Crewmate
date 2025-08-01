import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../supabaseClient.js'
import './UpdateCrewmate.css'

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

function UpdateCrewmate() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    speed: '',
    color: '',
    strength: '',
    personality: ''
  })
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    fetchCrewmate()
  }, [id])

  const fetchCrewmate = async () => {
    try {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      
      setFormData({
        name: data.name || '',
        speed: data.speed || '',
        color: data.color || '',
        strength: data.strength || '',
        personality: data.personality || ''
      })
    } catch (error) {
      console.error('Error fetching crewmate:', error)
      navigate('/gallery')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      alert('Please enter a name for your crewmate')
      return
    }

    setUpdating(true)
    try {
      const { error } = await supabase
        .from('crewmates')
        .update({
          name: formData.name,
          speed: formData.speed,
          color: formData.color,
          strength: formData.strength,
          personality: formData.personality
        })
        .eq('id', id)

      if (error) throw error

      navigate(`/crewmate/${id}`)
    } catch (error) {
      console.error('Error updating crewmate:', error)
      alert('Error updating crewmate. Please try again.')
    } finally {
      setUpdating(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this crewmate? This action cannot be undone.')) {
      return
    }

    try {
      const { error } = await supabase
        .from('crewmates')
        .delete()
        .eq('id', id)

      if (error) throw error
      navigate('/gallery')
    } catch (error) {
      console.error('Error deleting crewmate:', error)
      alert('Error deleting crewmate. Please try again.')
    }
  }

  const handleAttributeChange = (category, value) => {
    setFormData(prev => ({
      ...prev,
      [category.toLowerCase()]: value
    }))
  }

  const getCrewmateColor = (color) => {
    const colorMap = {
      'Red': '#ff4757',
      'Green': '#2ed573',
      'Blue': '#3742fa',
      'Purple': '#a55eea',
      'Yellow': '#ffa502',
      'Orange': '#ff6348',
      'Pink': '#ff3838',
      'Brown': '#8b4513'
    }
    return colorMap[color] || '#667eea'
  }

  if (loading) {
    return (
      <div className="update-crewmate">
        <div className="container">
          <h1>⏳ Loading...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="update-crewmate">
      <div className="container">
        <div className="update-header">
          <Link to={`/crewmate/${id}`} className="back-button">
            ← Back to Details
          </Link>
        </div>

        <div className="update-form-container">
          <div className="preview-section">
            <h3>👁️ Preview</h3>
            <div 
              className="preview-avatar"
              style={{ backgroundColor: getCrewmateColor(formData.color) }}
            >
              <span className="preview-initial">
                {formData.name ? formData.name.charAt(0).toUpperCase() : '?'}
              </span>
            </div>
            <h4>{formData.name || 'Unnamed Crewmate'}</h4>
            <div className="preview-attributes">
              {formData.speed && <span className="preview-attr">⚡ {formData.speed}</span>}
              {formData.color && <span className="preview-attr">🎨 {formData.color}</span>}
              {formData.strength && <span className="preview-attr">💪 {formData.strength}</span>}
              {formData.personality && <span className="preview-attr">😊 {formData.personality}</span>}
            </div>
          </div>

          <div className="form-section">
            <h1>✏️ Update Crewmate</h1>
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

              {Object.keys(categories).map(category => {
                const categoryAttributes = categories[category].attributes
                return (
                  <div key={category} className="attributes-section">
                    <h3 className="section-title">
                      <span className="section-icon">{categories[category].icon}</span>
                      {category} Attributes
                    </h3>
                    {categoryAttributes.map(attribute => (
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
                )
              })}

              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={updating}>
                  {updating ? '⏳ Updating...' : '✅ Update Crewmate'}
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => navigate(`/crewmate/${id}`)}
                >
                  ❌ Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  🗑️ Delete Crewmate
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateCrewmate
