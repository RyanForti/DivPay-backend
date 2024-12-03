const express = require('express');
const { createOrder, scanQrCode, divideOrder, payOrder, checkStatus } = require('../controllers/orderController');
const router = express.Router();

router.post('/create', createOrder);
router.post('/scan', scanQrCode);
router.post('/divide', divideOrder);
router.post('/pay', payOrder);
router.get('/status/:orderId', checkStatus);

module.exports = router;
