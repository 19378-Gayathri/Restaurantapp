const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  itemId:    { type: String, required: true },
  itemName:  { type: String, required: true },
  price:     { type: Number, required: true },
  imageUrl:  { type: String },
  category:  { type: String },
  quantity:  { type: Number, default: 1, min: 1 }
});

const cartSchema = new mongoose.Schema({
  userId:    { type: String, required: true, unique: true }, // Clerk userId
  items:     [cartItemSchema]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);