const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');

router.get('/', shopController.getShops);
router.post('/', shopController.addShop);
router.get('/:id', shopController.getShop);
router.put('/:id', shopController.updateShop);
router.delete('/:id', shopController.deleteShop);

module.exports = router;