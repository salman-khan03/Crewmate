import React, { useState } from 'react'
import { supabase } from '../supabaseClient'

function AddCrewmateForm({ onCrewmateAdded }) {
  const [name, setName] = useState('')
  const [attributes, setAttributes] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data, error } = await supabase
      .from('crewmates')
      .insert([{ name, attributes }])
    if (error) {
      console.error(error)
    } else {
      onCrewmateAdded(data[0])
      setName('')
      setAttributes('')
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
      <button type="submit">Add Crewmate</button>
    </form>
  )
}

export default AddCrewmateForm