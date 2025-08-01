import { Link } from 'react-router-dom'
import './Home.css'


function Home() {
  return (
    <div className="home">
      <div className="hero-section">
        <h1>🚀 Welcome to Crewmate Creator</h1>
        <p>Create and manage your own team of crewmates with customizable attributes!</p>

        <h1>Ready to create your first crewmate?</h1>
        <div className="home-cards">
          <div className="home-card">
            <h3>🎨 Create Crewmates</h3>
            <p>Design unique crewmates with different categories and attributes</p>
            <Link to="/create" className="btn btn-primary">
              🚀 Start Creating
            </Link>
          </div>
          
          <div className="home-card">
            <h3>👥 View Gallery</h3>
            <p>Browse all your created crewmates in one place</p>
            <Link to="/gallery" className="btn btn-secondary">
              📸 View Gallery
            </Link>
          </div>
        </div>

        <div className="cta-section">

        </div>
      </div>
    </div>
  )
}

export default Home
