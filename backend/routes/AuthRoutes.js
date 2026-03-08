const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfile, changePassword } = require('../app/controllers/Authcontroller');
const { protect } = require('../app/middleware/Authmiddleware');
console.log('route called')
router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);

module.exports = router;