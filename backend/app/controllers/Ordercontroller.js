const Order = require('../models/Order');
const Cart = require('../models/Cart');

// @desc Create order
exports.createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod, notes } = req.body;
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Cart is empty' });

    const items = cart.items.map(item => ({
      product: item.product._id,
      name: item.product.name,
      image: item.product.images[0],
      price: item.price,
      quantity: item.quantity,
      size: item.size,
      color: item.color
    }));

    const shippingCharge = cart.totalAmount > 999 ? 0 : 99;
    const totalAmount = cart.totalAmount + shippingCharge;

    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

    const order = await Order.create({
      user: req.user._id, items, shippingAddress,
      paymentMethod, notes,
      itemsTotal: cart.totalAmount, shippingCharge, totalAmount,
      estimatedDelivery,
      trackingNumber: 'SNG' + Date.now()
    });

    // Clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Get user orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Get single order
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin')
      return res.status(403).json({ message: 'Not authorized' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Cancel order
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (!['placed', 'confirmed'].includes(order.orderStatus))
      return res.status(400).json({ message: 'Order cannot be cancelled at this stage' });
    order.orderStatus = 'cancelled';
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Admin - Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = status ? { orderStatus: status } : {};
    const orders = await Order.find(query)
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Order.countDocuments(query);
    res.json({ orders, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Admin - Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    if (orderStatus === 'delivered') order.deliveredAt = new Date();
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};