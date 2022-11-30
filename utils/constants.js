const MONGO_DB_CODE = 11000;
const REGEXP_URL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
const allowedCors = [ // Домены, с которых разрешены кросс-доменные запросы
  'http://localhost:3000',
  'https://aleksashkina.movies.nomoredomains.club',
  'http://aleksashkina.movies.nomoredomains.club',
];
const MONGO_URL = 'mongodb://127.0.0.1:27017/moviesdb';
const CAST_ERROR = 'CastError';
const VALIDATION_ERROR = 'Validation failed';

module.exports = {
  MONGO_DB_CODE,
  REGEXP_URL,
  MONGO_URL,
  CAST_ERROR,
  VALIDATION_ERROR,
  allowedCors,
};
