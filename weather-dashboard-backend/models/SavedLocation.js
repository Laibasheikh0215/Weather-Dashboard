const mongoose = require('mongoose');

const SavedLocationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cityName: { type: String, required: true },
  lat: Number,
  lon: Number,
  customName: String
});

module.exports = mongoose.model('SavedLocation', SavedLocationSchema);