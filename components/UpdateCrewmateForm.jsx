import React, { useState } from 'react'
import { supabase } from '../supabaseClient'

function UpdateCrewmateForm({ crewmate, onUpdateComplete }) {
  const [name, setName] = useState(crewmate.name)
  const [attributes, setAttributes] = useState(crewmate.attributes ? crewmate.attributes.join(', ') : '')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const updatedAttributes = attributes.split(',').map(attr => attr.trim())
    const { data, error } = await supabase
      .from('crewmates')
      .update({ name, attributes: updatedAttributes })
      .eq('id', crewmate.id)
    if (error) {
      console.error(error)
    } else if (data && data.length > 0) {
      onUpdateComplete(data[0])
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Attributes"
        value={attributes}
        onChange={(e) => setAttributes(e.target.value)}
        required
      />
      <button type="submit">Update Crewmate</button>
    </form>
  )
}

export default UpdateCrewmateForm