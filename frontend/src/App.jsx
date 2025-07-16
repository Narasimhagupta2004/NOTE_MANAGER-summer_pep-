import React, { useState, useEffect } from 'react';
import { Container, Box, Button, Stack, Typography, Alert, Link } from '@mui/material';
import { Add } from '@mui/icons-material';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';

function App() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/notes');
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch notes');
      setNotes(data);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    // Fetch notes on initial load and when location changes
    fetchNotes();
    // Also fetch notes when notes state changes
    if (location.pathname === '/') {
      fetchNotes();
    }
  }, [location.pathname, notes]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/notes/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete note');
      setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">Note Manager</Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate('/new')}
          >
            New Note
          </Button>
        </Stack>

        {error && <Alert severity="error">{error}</Alert>}

        <Routes>
          <Route path="/" element={<NoteList notes={notes} onDelete={handleDelete} />} />
          <Route path="/new" element={<NoteForm notes={notes} navigate={navigate} />} />
          <Route path="/edit/:id" element={<NoteForm notes={notes} navigate={navigate} />} />
        </Routes>
      </Box>
    </Container>
  );
}

export default App;
