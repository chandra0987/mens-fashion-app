const express = require('express');
const router = express.Router();
const {
  getProducts, getProduct, createProduct, updateProduct, deleteProduct, addReview, getCategories
} = require('../app/controllers/productController');
const { protect, adminOnly } = require('../app/middleware/Authmiddleware');

router.get('/', getProducts);
router.get('/categories', getCategories);
router.get('/:id', getProduct);
router.post('/', protect, adminOnly, createProduct);
router.put('/:id', protect, adminOnly, updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);
router.post('/:id/reviews', protect, addReview);

module.exports = router;