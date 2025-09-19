const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  uniqueId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  specialty: {
    type: String,
    required: true,
    enum: ['general', 'cardiology', 'dermatology', 'psychiatry', 'orthopedic', 'gynecology', 'pediatrics']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 4.0
  },
  experience: {
    type: String,
    required: true
  },
  education: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  availability: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Doctor', doctorSchema);