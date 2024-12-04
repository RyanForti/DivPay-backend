const express = require('express');
const { createOrder, scanQrCode, divideOrder, payOrder, checkStatus, scanOrderByAccessCode, checkGroupMembers } = require('../controllers/orderController');
const router = express.Router();

router.post('/create', createOrder);
router.post('/scan', scanQrCode);
router.post('/scanOrderByAccessCode', scanOrderByAccessCode);
router.post('/checkGroupMembers', checkGroupMembers);
router.post('/divide', divideOrder);
router.post('/pay', payOrder);
router.get('/status/:orderId', checkStatus);

module.exports = router;
