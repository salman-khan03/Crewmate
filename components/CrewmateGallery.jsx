import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient.js'
import './CrewmateGallery.css'

function CrewmateGallery() {
  const [crewmates, setCrewmates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCrewmates()
  }, [])

  const fetchCrewmates = async () => {
    try {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setCrewmates(data || [])
    } catch (error) {
      console.error('Error fetching crewmates:', error)
    } finally {
      setLoading(false)
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

  if (loading) {
    return (
      <div className="gallery">
        <div className="container">
          <h1>Loading crewmates...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="gallery">
      <div className="container">
        <div className="gallery-header">
          <h1>Your Crewmate Gallery</h1>
        </div>

        {crewmates.length === 0 ? (
          <div className="empty-state">
            <h2>No crewmates yet!</h2>
            <p>Create your first crewmate to get started.</p>
            <Link to="/create" className="btn btn-primary">
              Create Your First Crewmate
            </Link>
          </div>
        ) : (
          <div className="crewmates-grid">
            {crewmates.map(crewmate => (
              <div key={crewmate.id} className="crewmate-card">
                <div 
                  className="crewmate-avatar"
                  style={{ backgroundColor: getCrewmateColor(crewmate.color) }}
                >
                  <span className="crewmate-initial">
                    {crewmate.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                
                <div className="crewmate-info">
                  <h3>{crewmate.name}</h3>
                  {crewmate.category && (
                    <div className="crewmate-category">
                      <span className="category-badge">{crewmate.category}</span>
                    </div>
                  )}
                  <div className="crewmate-attributes">
                    {crewmate.speed && <span className="attribute">⚡ {crewmate.speed}</span>}
                    {crewmate.color && <span className="attribute">🎨 {crewmate.color}</span>}
                    {crewmate.strength && <span className="attribute">💪 {crewmate.strength}</span>}
                    {crewmate.personality && <span className="attribute">😊 {crewmate.personality}</span>}
                  </div>
                </div>

                <div className="crewmate-actions">
                  <Link to={`/crewmate/${crewmate.id}`} className="btn btn-view">
                    View Details
                  </Link>
                  <Link to={`/edit/${crewmate.id}`} className="btn btn-edit">
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {crewmates.length > 0 && (
          <div className="gallery-stats">
            <h3>Crew Statistics</h3>
            <div className="stats-grid">
              <div className="stat">
                <span className="stat-number">{crewmates.length}</span>
                <span className="stat-label">Total Crewmates</span>
              </div>
              <div className="stat">
                <span className="stat-number">
                  {crewmates.filter(c => c.speed === 'Fast' || c.speed === 'Super Fast').length}
                </span>
                <span className="stat-label">Fast Crewmates</span>
              </div>
              <div className="stat">
                <span className="stat-number">
                  {crewmates.filter(c => c.strength === 'Strong' || c.strength === 'Super Strong').length}
                </span>
                <span className="stat-label">Strong Crewmates</span>
              </div>
              <div className="stat">
                <span className="stat-number">
                  {Math.round((crewmates.filter(c => c.speed === 'Fast' || c.speed === 'Super Fast').length / crewmates.length) * 100)}%
                </span>
                <span className="stat-label">Speed Success Rate</span>
              </div>
            </div>
            
            {/* Success Metric */}
            <div className="success-metric">
              <h4>Crew Success Prediction</h4>
              <div className="success-bar">
                <div 
                  className="success-fill"
                  style={{ 
                    width: `${Math.min(100, (crewmates.filter(c => 
                      (c.speed === 'Fast' || c.speed === 'Super Fast') && 
                      (c.strength === 'Strong' || c.strength === 'Super Strong')
                    ).length / Math.max(1, crewmates.length)) * 100)}%`
                  }}
                ></div>
              </div>
              <p className="success-text">
                {crewmates.filter(c => 
                  (c.speed === 'Fast' || c.speed === 'Super Fast') && 
                  (c.strength === 'Strong' || c.strength === 'Super Strong')
                ).length > 0 ? 
                  `Your crew has a ${Math.round((crewmates.filter(c => 
                    (c.speed === 'Fast' || c.speed === 'Super Fast') && 
                    (c.strength === 'Strong' || c.strength === 'Super Strong')
                  ).length / Math.max(1, crewmates.length)) * 100)}% chance of success!` :
                  'Add more strong and fast crewmates to increase your success rate!'
                }
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CrewmateGallery
