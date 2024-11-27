import React, { useState, useEffect } from 'react';
import './App.css';
import CrewmateList from './components/CrewmateList';
import UpdateCrewmateForm from './components/UpdateCrewmateForm';
import { createClient } from '@supabase/supabase-js';
import CrewmateInfo from './components/CrewmateInfo';

// Supabase setup
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://medffzojaeszanhiborm.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1lZGZmem9qYWVzemFuaGlib3JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyMzE4NjIsImV4cCI6MjA0NzgwNzg2Mn0.i9cI6fjiBj2363K_Ww6O8LwuPysmp0fRyUrkEXmqaQE';
const supabase = createClient(supabaseUrl, supabaseKey);

const App = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [crewmates, setCrewmates] = useState([]);
  const [editingCrewmate, setEditingCrewmate] = useState(null);

  useEffect(() => {
    fetchCrewmates();
  }, []);

  const fetchCrewmates = async () => {
    const { data, error } = await supabase.from('crewmates').select('*');
    if (error) {
      console.error('Error fetching crewmates:', error);
    } else {
      setCrewmates(data);
    }
  };

  const createCrewmate = async () => {
    const { data, error } = await supabase
      .from('crewmates')
      .insert([{ name, role }]);

    if (error) {
      console.error('Error creating crewmate:', error);
    } else {
      setCrewmates([...crewmates, data[0]]);
      setName('');
      setRole('');
    }
  };

  const handleEdit = (crewmate) => {
    setEditingCrewmate(crewmate);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from('crewmates').delete().eq('id', id);
    if (error) {
      console.error('Error deleting crewmate:', error);
    } else {
      setCrewmates(crewmates.filter((crewmate) => crewmate.id !== id));
    }
  };

  const handleUpdateComplete = (updatedCrewmate) => {
    setCrewmates(
      crewmates.map((crewmate) =>
        crewmate.id === updatedCrewmate.id ? updatedCrewmate : crewmate
      )
    );
    setEditingCrewmate(null);
  };

  return (
    <Router>
      <div>
        <h1>Create Crewmate</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <button onClick={createCrewmate}>Create</button>
        <CrewmateList
          crewmates={crewmates}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        {editingCrewmate && (
          <UpdateCrewmateForm
            crewmate={editingCrewmate}
            onUpdateComplete={handleUpdateComplete}
          />
        )}
        <Switch>
          <Route path="/crewmate/:id" component={CrewmateInfo} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;