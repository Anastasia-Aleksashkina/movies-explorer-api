const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // Лимит запросов с одного IP в течение 15 минут
  standardHeaders: true,
  legacyHeaders: false,
});
