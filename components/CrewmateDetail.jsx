import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient.js'
import './CrewmateDetail.css'

function CrewmateDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [crewmate, setCrewmate] = useState(null)
  const [loading, setLoading] = useState(true)

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
      setCrewmate(data)
    } catch (error) {
      console.error('Error fetching crewmate:', error)
      navigate('/gallery')
    } finally {
      setLoading(false)
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="crewmate-detail">
        <div className="container">
          <h1>Loading crewmate...</h1>
        </div>
      </div>
    )
  }

  if (!crewmate) {
    return (
      <div className="crewmate-detail">
        <div className="container">
          <h1>Crewmate not found</h1>
          <Link to="/gallery" className="btn btn-primary">
            Back to Gallery
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="crewmate-detail">
      <div className="container">
        <div className="detail-header">
          <Link to="/gallery" className="back-button">
            ← Back to Gallery
          </Link>
        </div>

        <div className="crewmate-profile">
          <div className="profile-avatar">
            <div 
              className="large-avatar"
              style={{ backgroundColor: getCrewmateColor(crewmate.color) }}
            >
              <span className="avatar-initial">
                {crewmate.name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>

          <div className="profile-info">
            <h1>{crewmate.name}</h1>
            <p className="creation-date">
              Created on {formatDate(crewmate.created_at)}
            </p>

            <div className="attributes-section">
              <h3>Attributes</h3>
              <div className="attributes-detail">
                {crewmate.speed && (
                  <div className="attribute-item">
                    <span className="attribute-icon">⚡</span>
                    <span className="attribute-label">Speed:</span>
                    <span className="attribute-value">{crewmate.speed}</span>
                  </div>
                )}
                {crewmate.color && (
                  <div className="attribute-item">
                    <span className="attribute-icon">🎨</span>
                    <span className="attribute-label">Color:</span>
                    <span className="attribute-value">{crewmate.color}</span>
                  </div>
                )}
                {crewmate.strength && (
                  <div className="attribute-item">
                    <span className="attribute-icon">💪</span>
                    <span className="attribute-label">Strength:</span>
                    <span className="attribute-value">{crewmate.strength}</span>
                  </div>
                )}
                {crewmate.personality && (
                  <div className="attribute-item">
                    <span className="attribute-icon">😊</span>
                    <span className="attribute-label">Personality:</span>
                    <span className="attribute-value">{crewmate.personality}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="action-buttons">
              <Link 
                to={`/edit/${crewmate.id}`} 
                className="btn btn-primary"
              >
                Edit Crewmate
              </Link>
              <button 
                onClick={handleDelete}
                className="btn btn-danger"
              >
                Delete Crewmate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CrewmateDetail
