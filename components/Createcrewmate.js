// src/components/CreateCrewmate.js
import React, { useState } from 'react';
import supabase from '../supabaseClient';

function CreateCrewmate() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data, error } = await supabase.from('crewmates').insert([{ name, role }]);
    if (error) {
      console.error('Error creating crewmate:', error);
    } else {
      console.log('Crewmate created:', data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Role:
        <input value={role} onChange={(e) => setRole(e.target.value)} />
      </label>
      <button type="submit">Create Crewmate</button>
    </form>
  );
}

export default CreateCrewmate;
