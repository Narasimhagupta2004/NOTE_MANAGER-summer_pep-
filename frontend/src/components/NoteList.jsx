import React from 'react';
import { Box, Card, CardContent, Typography, IconButton, Stack } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const NoteList = ({ notes, onDelete }) => {
  return (
    <Box sx={{ mt: 4 }}>
      {notes.map((note) => (
        <Card key={note._id} sx={{ mb: 2 }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
              <Stack spacing={1}>
                <Typography variant="h6">{note.title}</Typography>
                <Typography variant="body1" color="text.secondary">
                  {note.content}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Category: {note.category}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <IconButton component={Link} to={`/edit/${note._id}`}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => onDelete(note._id)}>
                  <Delete />
                </IconButton>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default NoteList;
