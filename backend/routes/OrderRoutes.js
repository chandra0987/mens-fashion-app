const express = require('express');
const router = express.Router();
const {
  createOrder, getMyOrders, getOrder, cancelOrder, getAllOrders, updateOrderStatus
} = require('../app/controllers/Ordercontroller');
const { protect, adminOnly } = require('../app/middleware/Authmiddleware');

router.use(protect);
router.post('/', createOrder);
router.get('/my', getMyOrders);
router.get('/:id', getOrder);
router.put('/:id/cancel', cancelOrder);

// Admin
router.get('/', adminOnly, getAllOrders);
router.put('/:id/status', adminOnly, updateOrderStatus);

module.exports = router;