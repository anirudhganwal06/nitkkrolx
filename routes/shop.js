const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');
const isAuth = require('../middlewares/isAuth');

router.get('/:rollNo/sell', isAuth, shopController.getSell);

router.post('/:rollNo/sell', isAuth, shopController.postSell);

router.get('/:rollNo/buy', isAuth, shopController.getBuy);

router.get('/:rollNo/product/:uniqid/details', isAuth, shopController.getProductDetails);

router.get('/:rollNo/items-out-for-sale', isAuth, shopController.getItemsOutForSale);

router.get('/:rollNo/product/:uniqid/edit', isAuth, shopController.getProductEdit);

router.post('/:rollNo/product/:uniqid/edit', isAuth, shopController.postProductEdit);

router.get('/:rollNo/product/:uniqid/delete', isAuth, shopController.getProductDelete);

module.exports = router;