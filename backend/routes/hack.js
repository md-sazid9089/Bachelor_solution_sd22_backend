const express = require('express');
const router = express.Router();
const hackController = require('../controllers/hackController');

router.get('/', hackController.list);
router.post('/', hackController.create);
router.post('/:id/like', hackController.toggleLike);

module.exports = router;
