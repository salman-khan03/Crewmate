import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import SetupCheck from './components/SetupCheck'
import Home from './components/Home'
import CrewmateGallery from './components/CrewmateGallery'
import CreateCrewmate from './components/CreateCrewmate'
import CrewmateDetail from './components/CrewmateDetail'
import UpdateCrewmate from './components/UpdateCrewmate'
import './App.css'

function App() {
  return (
    <Router>
      <SetupCheck>
        <div className="App">
          <nav className="navbar">
            <Link to="/" className="nav-brand">
              🚀 Crewmate Creator
            </Link>
            <div className="nav-links">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/create" className="nav-link">Create</Link>
              <Link to="/gallery" className="nav-link">Gallery</Link>
             
            </div>
          </nav>

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<CrewmateGallery />} />
              <Route path="/create" element={<CreateCrewmate />} />
              <Route path="/crewmate/:id" element={<CrewmateDetail />} />
              <Route path="/edit/:id" element={<UpdateCrewmate />} />
            </Routes>
          </main>
        </div>
      </SetupCheck>
    </Router>
  )
}

export default App
