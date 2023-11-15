const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSession = new Schema({
  cookieId: { type: Number, required: true, unique: true },
  createdAt: { type: Date, expires: 1, default: Date.now },
  // for production can change expire to 1750 (~30 minutes)
});

module.exports = mongoose.model('Session', userSession);
