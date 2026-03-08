const Product = require('../models/Product');

// @desc Get all products
exports.getProducts = async (req, res) => {
  try {
    const {
      category, brand, minPrice, maxPrice, size, rating,
      sort, search, page = 1, limit = 12,
      featured, newArrival, bestSeller
    } = req.query;

    const query = {};
    if (category) query.category = category;
    if (brand) query.brand = { $in: brand.split(',') };
    if (minPrice || maxPrice) query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
    if (rating) query.rating = { $gte: Number(rating) };
    if (search) query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { brand: { $regex: search, $options: 'i' } },
      { tags: { $in: [new RegExp(search, 'i')] } }
    ];
    if (featured === 'true') query.isFeatured = true;
    if (newArrival === 'true') query.isNewArrival = true;
    if (bestSeller === 'true') query.isBestSeller = true;

    const sortOptions = {
      'price-asc': { price: 1 }, 'price-desc': { price: -1 },
      'rating': { rating: -1 }, 'newest': { createdAt: -1 }, 'popular': { numReviews: -1 }
    };

    const products = await Product.find(query)
      .sort(sortOptions[sort] || { createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.json({
      products, total,
      pages: Math.ceil(total / limit),
      currentPage: Number(page)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Get single product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('reviews.user', 'name avatar');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Create product (admin)
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Update product (admin)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Delete product (admin)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Add review
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());
    if (alreadyReviewed) return res.status(400).json({ message: 'Product already reviewed' });

    product.reviews.push({ user: req.user._id, name: req.user.name, rating: Number(rating), comment });
    await product.save();
    res.status(201).json({ message: 'Review added' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Get categories with counts
exports.getCategories = async (req, res) => {
  try {
    const categories = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 }, minPrice: { $min: '$price' } } },
      { $sort: { count: -1 } }
    ]);
    res.json(categories);
    console.log(categories)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};