import React from 'react'
import PropTypes from 'prop-types'

function CrewmateList({ crewmates, onUpdate, onDelete }) {
  return (
    <div>
      <h2>Crewmate List</h2>
      <ul>
        {crewmates.map((crewmate) => (
          <li key={crewmate.id}>
            {crewmate.name} - {JSON.stringify(crewmate.attributes)}
            <button onClick={() => onUpdate(crewmate)}>Update</button>
            <button onClick={() => onDelete(crewmate.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
CrewmateList.propTypes = {
  crewmates: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      attributes: PropTypes.object.isRequired,
    })
  ).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default CrewmateList