import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import './Editc.css';

function EditCrewmate({ supabaseUrl, supabaseKey }) {
  const navigate = useNavigate();
  const { crewmateId } = useParams();
  const [crewmate, setCrewmate] = useState({ name: '', attribute: '' });

  const supabase = useMemo(() => createClient(supabaseUrl, supabaseKey), [supabaseUrl, supabaseKey]);

  useEffect(() => {
    async function fetchCrewmate() {
      try {
        const { data, error } = await supabase.from('crewmates').select().eq('id', crewmateId);
        if (error) {
          console.error('Error fetching crewmate:', error);
        } else if (data && data.length === 1) {
          setCrewmate(data[0]);
        }
      } catch (error) {
        console.error('An error occurred while fetching crewmate data.');
      }
    }

    fetchCrewmate();
  }, [crewmateId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, attribute } = crewmate;

    try {
      // Update the crewmate in the Supabase database
      const { error } = await supabase.from('crewmates').upsert([{ id: crewmateId, name, attribute }]);
      if (error) {
        console.error('Error updating crewmate:', error);
      } else {
        navigate('/summary'); // Navigate back to the summary page after updating
      }
    } catch (error) {
      console.error('An error occurred while updating the crewmate.');
    }
  };

  return (
    <div>
      <h1>Edit Crewmate</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Crewmate Name"
          value={crewmate.name}
          onChange={(e) => setCrewmate({ ...crewmate, name: e.target.value })}
        />
        <select
          value={crewmate.attribute}
          onChange={(e) => setCrewmate({ ...crewmate, attribute: e.target.value })}
        >
          <option value="Engineer">Engineer</option>
          <option value="Medic">Medic</option>
          <option value="Navigator">Navigator</option>
          {/* Add more attribute options as needed */}
        </select>
        <button type="submit">Update Crewmate</button>
      </form>
    </div>
  );
}

export default EditCrewmate;
