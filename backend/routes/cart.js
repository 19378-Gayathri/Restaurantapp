const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// GET cart for a user
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart ? cart.items : []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// SAVE (replace) full cart for a user
router.post('/:userId', async (req, res) => {
  try {
    const { items } = req.body;
    const cart = await Cart.findOneAndUpdate(
      { userId: req.params.userId },
      { items },
      { upsert: true, new: true }
    );
    res.json(cart.items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CLEAR cart
router.delete('/:userId', async (req, res) => {
  try {
    await Cart.findOneAndUpdate(
      { userId: req.params.userId },
      { items: [] }
    );
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;