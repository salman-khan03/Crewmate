import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

function CrewmateInfo({ supabaseUrl, supabaseKey }) {
  const { crewmateId } = useParams();
  const [crewmate, setCrewmate] = useState({ name: '', attribute: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const supabase = createClient(supabaseUrl, supabaseKey);

  useEffect(() => {
    async function fetchCrewmate() {
      try {
        const { data, error } = await supabase.from('crewmates').select('*').eq('id', crewmateId).single();
        if (error) {
          setError('Error fetching crewmate data.');
        } else if (data.length === 1) {
          setCrewmate(data[0]);
        } else {
          setError('Crewmate not found.');
        }
      } catch (error) {
        setError('An error occurred while fetching crewmate data.');
      } finally {
        setLoading(false);
      }
    }

    fetchCrewmate();
  }, [crewmateId]);

  return (
    <div>
      <h1>Crewmate Information</h1>
      {loading && <p>Loading crewmate information...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          <p><strong>Name:</strong> {crewmate.name}</p>
          <p><strong>Attribute:</strong> {crewmate.attribute}</p>
          
          {/* Add more details as needed */}
        </>
      )}
    </div>
  );
}

export default CrewmateInfo;
