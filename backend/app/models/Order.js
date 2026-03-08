const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    image: String,
    price: Number,
    quantity: Number,
    size: String,
    color: { name: String, hex: String }
  }],
  shippingAddress: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    country: { type: String, default: 'India' }
  },
  paymentMethod: { type: String, enum: ['cod', 'card', 'upi', 'netbanking'], default: 'cod' },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
  orderStatus: {
    type: String,
    enum: ['placed', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
    default: 'placed'
  },
  itemsTotal: { type: Number, required: true },
  shippingCharge: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  trackingNumber: { type: String },
  estimatedDelivery: { type: Date },
  deliveredAt: { type: Date },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);