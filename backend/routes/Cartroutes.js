const express = require('express');
const router = express.Router();
const { getCart, addToCart, updateCartItem, removeFromCart, clearCart } = require('../app/controllers/Cartcontroller');
const { protect } = require('../app/middleware/Authmiddleware');

router.use(protect);
router.get('/', getCart);
router.post('/', addToCart);
router.put('/:itemId', updateCartItem);
router.delete('/clear', clearCart);
router.delete('/:itemId', removeFromCart);

module.exports = router;