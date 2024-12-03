const Order = require('../models/Order');
const Group = require('../models/Group');
const User = require('../models/User');
const qr = require('qr-image');
const mongo = require('mongodb');

// Cria��o de Pedido
exports.createOrder = async (req, res) => {
  try {
    const { restaurantId, totalAmount } = req.body;
    const order = await Order.create({ restaurantId, totalAmount });
    const qrCode = qr.imageSync(`order:${order._id}:${restaurantId}:${totalAmount}`, { type: 'svg' });
    order.qrCode = qrCode;
    order.save();
    res.json({ orderId: order._id, qrCode: qrCode.toString('base64') });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Escaneamento do QR Code
exports.scanQrCode = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(new mongo.ObjectId(orderId));
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Divis�o de Pedido
exports.divideOrder = async (req, res) => {
  try {
    const { orderId, members, splitAmounts, creatorId } = req.body;
    const group = await Group.create({ orderId, members, splitAmounts, creatorId });
    await Order.findByIdAndUpdate(orderId, { groupId: group._id });
    res.json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Pagamento
exports.payOrder = async (req, res) => {
  try {
    const { orderId, userId } = req.body;
    const order = await Order.findById(orderId);
    const group = await Group.findOne({orderId: orderId})
    if (!order) return res.status(404).json({ message: 'Order not found' });

    console.log(order)
    console.log(group)

    order.paidBy.push(userId);
    await order.save();

    if (order.paidBy.length === group.members.length) {
      order.status = 'paid';
      await order.save();
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Verificar Status
exports.checkStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ status: order.status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
