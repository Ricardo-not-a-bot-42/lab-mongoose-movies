const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
  },
  genre: {
    type: [String],
    enum: ['action', 'musical', 'horror', 'scifi', 'fantasy', 'mystery', ''],
    minlength: 3,
  },
  plot: {
    type: String,
    minlength: 1,
  },
  cast: [String],
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
