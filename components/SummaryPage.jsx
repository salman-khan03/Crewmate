// SummaryPage.jsx
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './Summaryp.css';

const supabaseUrl = 'https://vyvldqfxtkktozetvtgw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5dmxkcWZ4dGtrdG96ZXR2dGd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg3MTM1NjEsImV4cCI6MjAxNDI4OTU2MX0.7R41RrmKKUCjaoTkbgKAVkFT2sMQCe8b4nxOqR7AGQ8'; // Your API key

function SummaryPage({ supabaseUrl, supabaseKey }) {
    const [crewmates, setCrewmates] = useState([]);
  
    const supabase = createClient(supabaseUrl, supabaseKey);
  
    useEffect(() => {
      async function fetchCrewmates() {
        const { data, error } = await supabase.from('crewmates').select();
        if (error) {
          console.error('Error fetching crewmates:', error);
        } else {
          setCrewmates(data);
        }
      }
  
      fetchCrewmates();
    }, [supabaseUrl, supabaseKey]);
  
    return (
      <div>
        <h1>Crewmate Summary</h1>
        <ul>
          {crewmates.map((crewmate) => (
            <li key={crewmate.id} className={`success-${crewmate.successMetric}`}>
              <strong>Name:</strong> {crewmate.name} <strong>Attribute:</strong> {crewmate.attribute} <strong>Category:</strong> {crewmate.category} <strong>Success Metric:</strong> {crewmate.successMetric}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default SummaryPage;
