const mongoose = require('mongoose');

const celebritySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
  },
  occupation: {
    type: String,
    enum: ['actor', 'singer', 'comedian', 'philosopher', 'wizard', 'unknown'],
  },
  catchPhrase: {
    type: String,
    minlength: 1,
  },
  movies: [String],
});

const Celebrity = mongoose.model('Celebrity', celebritySchema);

module.exports = Celebrity;
