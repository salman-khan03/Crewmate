// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import SummaryPage from './components/SummaryPage';
import CreateCrewmate from './components/CreateCrewmate';
import EditCrewmate from './components/EditCrewmate';
import DeleteCrewmate from './components/DeleteCrewmate';
import CrewmateInfo from './components/CrewmateInfo';
import CrewPage from './components/CrewPage';

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <Link to="/">Create Crewmate</Link>
          <Link to="/summary">Crewmate Summary</Link>
        </nav>
        <Routes>
          <Route path="/" element={<CreateCrewmate />} />
          <Route path="/summary" element={<SummaryPage />} />
          <Route path="/edit/:crewmateId" element={<EditCrewmate />} />
          <Route path="/delete/:crewmateId" element={<DeleteCrewmate />} />
          <Route path="/info/:crewmateId" element={<CrewmateInfo />} />
          <Route path="/crew" element={<CrewPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
// src/components/CrewPage.jsx