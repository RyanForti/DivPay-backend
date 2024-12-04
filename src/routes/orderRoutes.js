const express = require('express');
const { createOrder, scanQrCode, divideOrder, payOrder, checkStatus, scanOrderByAccessCode } = require('../controllers/orderController');
const router = express.Router();

router.post('/create', createOrder);
router.post('/scan', scanQrCode);
router.get('/scanOrderByAccessCode', scanOrderByAccessCode);
router.post('/divide', divideOrder);
router.post('/pay', payOrder);
router.get('/status/:orderId', checkStatus);

module.exports = router;
