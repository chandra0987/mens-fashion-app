const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true }
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  originalPrice: { type: Number },
  category: {
    type: String,
    required: true,
    enum: ['shirts', 'trousers', 'suits', 'jackets', 'shoes', 'accessories', 'ethnic', 'casuals']
  },
  subCategory: { type: String },
  brand: { type: String, required: true },
  images: [{ type: String }],
  sizes: [{
    size: { type: String, enum: ['XS','S','M','L','XL','XXL','28','30','32','34','36','38','40','42'] },
    stock: { type: Number, default: 0 }
  }],
  colors: [{ name: String, hex: String }],
  material: { type: String },
  care: [{ type: String }],
  tags: [{ type: String }],
  reviews: [reviewSchema],
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
  discount: { type: Number, default: 0 },
  totalStock: { type: Number, default: 0 }
}, { timestamps: true });

productSchema.pre('save', function(next) {
  if (this.reviews.length > 0) {
    this.rating = this.reviews.reduce((acc, r) => acc + r.rating, 0) / this.reviews.length;
    this.numReviews = this.reviews.length;
  }
  this.totalStock = this.sizes.reduce((acc, s) => acc + s.stock, 0);
  next();
});

module.exports = mongoose.model('Product', productSchema);