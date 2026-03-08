const express = require('express');
const router = express.Router();
const { getWishlist, toggleWishlist } = require('../app/controllers/Wishlistcontroller');
const { protect } = require('../app/middleware/Authmiddleware');

router.use(protect);
router.get('/', getWishlist);
router.post('/toggle', toggleWishlist);

module.exports = router;