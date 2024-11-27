import React from 'react';
import { Link } from 'react-router-dom';

const CrewmateList = ({ crewmates, onEdit, onDelete }) => (
  <div>
    <h2>Crewmate List</h2>
    <ul>
      {crewmates.map((crewmate) => (
        <li key={crewmate.id}>
          <Link to={`/crewmate/${crewmate.id}`}>{crewmate.name} - {crewmate.role}</Link>
          <button onClick={() => onEdit(crewmate)}>Edit</button>
          <button onClick={() => onDelete(crewmate.id)}>Delete</button>
        </li>
      ))}
    </ul>
  </div>
);

export default CrewmateList;