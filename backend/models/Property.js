const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  rent: { type: Number, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
  beds: { type: Number, required: true },
  baths: { type: Number, required: true },
  contact: { type: String, required: true },
  description: { type: String },
});

module.exports = mongoose.model('Property', propertySchema);
