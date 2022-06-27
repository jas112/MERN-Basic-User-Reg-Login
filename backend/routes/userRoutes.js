const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserNfo } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.post('/me', protect, getUserNfo);

module.exports = router;