const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('uri')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Import controller
const { createNote, getNotes, getSingleNote, updateNote, deleteNote } = require('./controllers/noteController');

// Routes
app.route('/api/notes').get(getNotes).post(createNote);
app.route('/api/notes/:id').get(getSingleNote).put(updateNote).delete(deleteNote);



const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
