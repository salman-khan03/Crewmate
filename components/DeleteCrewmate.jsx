import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY);

function DeleteCrewmate() {
  const navigate = useNavigate();
  const { crewmateId } = useParams();
  const [crewmate, setCrewmate] = useState({ name: '', attribute: '' });

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
        console.error('An error occurred while fetching crewmate data.', error);
      }
    }

    fetchCrewmate();
  }, [crewmateId]);

  const handleDelete = async () => {
    try {
      // Delete the crewmate from the Supabase database
      const { error } = await supabase.from('crewmates').delete().eq('id', crewmateId);
      if (error) {
        console.error('Error deleting crewmate:', error);
      } else {
        navigate('/summary'); // Navigate back to the summary page after deleting
      }
    } catch (error) {
      console.error('An error occurred while deleting the crewmate.', error);
    }
  };

  return (
    <div>
      <h1>Delete Crewmate</h1>
      <p>Are you sure you want to delete the crewmate: {crewmate.name} ({crewmate.attribute})?</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => navigate('/summary')}>Cancel</button>
    </div>
  );
}

export default DeleteCrewmate;
