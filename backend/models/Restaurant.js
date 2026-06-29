const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  itemName:    { type: String, required: true },
  price:       { type: Number, required: true },
  category:    { type: String, enum: ['Starters', 'Mains', 'Desserts'], required: true },
  description: { type: String },
  imageUrl:    { type: String }
});

const restaurantSchema = new mongoose.Schema({
  name:      { type: String, required: true, index: 'text' },
  cuisine:   { type: String, required: true },
  rating:    { type: Number, required: true, min: 0, max: 5, index: 1 },
  address:   { type: String, required: true },
  imageUrl:  { type: String, required: true },
  menu:      [menuItemSchema]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);