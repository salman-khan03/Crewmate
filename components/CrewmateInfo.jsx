import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase.js';

const CrewmateInfo = () => {
  const { id } = useParams();
  const [crewmate, setCrewmate] = useState(null);

  useEffect(() => {
    fetchCrewmate();
  }, [id]);

  const fetchCrewmate = async () => {
    const { data, error } = await supabase.from('crewmates').select('*').eq('id', id).single();
    if (error) {
      console.error('Error fetching crewmate:', error);
    } else {
      setCrewmate(data);
    }
  };

  if (!crewmate) return <div>Loading...</div>;

  return (
    <div>
      <h2>{crewmate.name}</h2>
      <p>Role: {crewmate.role}</p>
    </div>
  );
};

export default CrewmateInfo;