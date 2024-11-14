const express = require('express');
const router = express.Router();
const userController = require('./userController');

router.post('/api/user', userController.saveUserInfo);
router.get('/api/user/:id', userController.getUserInfo);

module.exports = router;
