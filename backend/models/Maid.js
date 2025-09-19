const mongoose = require('mongoose');

const maidSchema = new mongoose.Schema({
  name: { type: String, required: true },
  services: [{ type: String, required: true }],
  hourlyRate: { type: Number, required: true },
  rating: { type: Number, required: true },
  contact: { type: String, required: true },
  experience: { type: String, required: true },
  availability: { type: String, required: true },
  description: { type: String, required: true }
});

module.exports = mongoose.model('Maid', maidSchema);