const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { isURL } = require('validator');

const movieSchema = new Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (url) => isURL(url),
      message: () => 'Введен некорректный url адрес ',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (url) => isURL(url),
      message: () => 'Введен некорректный url адрес ',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (url) => isURL(url),
      message: () => 'Введен некорректный url адрес ',
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('movie', movieSchema);
