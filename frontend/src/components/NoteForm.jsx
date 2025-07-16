import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const NoteForm = ({ notes, navigate }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const { id } = useParams();
  const categories = ['General', 'Programming', 'Design', 'Business', 'Personal'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = id
        ? await fetch(`http://localhost:5001/api/notes/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content, category }),
          })
        : await fetch('http://localhost:5001/api/notes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content, category }),
          });

      if (!response.ok) throw new Error('Failed to save note');
      
      // Navigate back to home page after saving
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5001/api/notes/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setTitle(data.title);
          setContent(data.content);
          setCategory(data.category);
        })
        .catch((error) => console.error('Error fetching note:', error));
    }
  }, [id]);

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          {id ? 'Edit Note' : 'New Note'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Category"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" type="submit">
                {id ? 'Save Changes' : 'Create Note'}
              </Button>
              <Button variant="outlined" onClick={handleCancel}>
                Cancel
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default NoteForm;
