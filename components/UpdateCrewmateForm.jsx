import React, { useState } from 'react'
import { createClient } from '@supabase/supabase-js';

const UpdateCrewmateForm = ({ crewmate, onUpdateComplete }) => {
  const [name, setName] = useState(crewmate?.name || '')
  const [attributes, setAttributes] = useState(crewmate?.attributes || '')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!crewmate) {
      console.error('No crewmate provided');
      return;
    }
    const { data, error } = await supabase
      .from('crewmates')
      .update({ name, attributes })
      .eq('id', crewmate.id)
    if (error) console.error(error)
    else onUpdateComplete(data[0])
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