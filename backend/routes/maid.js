const express = require('express');
const router = express.Router();
const maidController = require('../controllers/maidController');

router.get('/', maidController.getMaids);
router.post('/', maidController.addMaid);

module.exports = router;