import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

function CrewPage({ supabaseUrl, supabaseKey, userId }) {
  const [attributeStats, setAttributeStats] = useState({});

  const supabase = createClient(supabaseUrl, supabaseKey);

  useEffect(() => {
    async function fetchCrew() {
      const { data, error } = await supabase.from('crewmates').select().eq('userId', userId); // Replace 'userId' with the actual user identifier.
      if (error) {
        console.error('Error fetching crew:', error);
      } else {
        setCrew(data);
      }
    }

    fetchCrew();
  }, [supabaseUrl, supabaseKey, userId]);

  const calculateAttributeStats = (crewData) => {
    const totalCrewmates = crewData.length;
    const attributeCounts = crewData.reduce((counts, crewmate) => {
      counts[crewmate.attribute] = (counts[crewmate.attribute] || 0) + 1;
      return counts;
    }, {});

    // Calculate percentages and format to two decimal places
    const attributeStats = {};
    for (const attribute in attributeCounts) {
      attributeStats[attribute] = ((attributeCounts[attribute] / totalCrewmates) * 100).toFixed(2);
    }

    setAttributeStats(attributeStats);
  };

  return (
    <div>
      <h1>Your Crew Page</h1>
      <h2>Crew Statistics</h2>
      <ul>
        {Object.entries(attributeStats).map(([attribute, percentage]) => (
          <li key={attribute}>
            <strong>{attribute}:</strong> {percentage}% of crew members
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CrewPage;