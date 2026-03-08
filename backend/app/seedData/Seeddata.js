const Product = require('./models/Product');
const User = require('./models/User');

const seedData = async () => {
  try {
    const count = await Product.countDocuments();
    if (count > 0) return;

    // Create admin user
    const adminExists = await User.findOne({ email: 'admin@singam.com' });
    if (!adminExists) {
      await User.create({
        name: 'Singam Admin',
        email: 'admin@singam.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('✅ Admin user created: admin@singam.com / admin123');
    }

    const products = [
      {
        name: 'Royal Blue Oxford Shirt',
        description: 'Crafted from premium Egyptian cotton, this oxford shirt offers exceptional comfort and style. Perfect for business meetings or casual outings.',
        price: 2499,
        originalPrice: 3499,
        category: 'shirts',
        brand: 'SINGAM',
        images: [
          'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600',
          'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600'
        ],
        sizes: [
          { size: 'S', stock: 10 }, { size: 'M', stock: 15 },
          { size: 'L', stock: 12 }, { size: 'XL', stock: 8 }
        ],
        colors: [{ name: 'Royal Blue', hex: '#4169e1' }, { name: 'White', hex: '#ffffff' }],
        material: '100% Egyptian Cotton',
        tags: ['shirt', 'formal', 'oxford', 'blue'],
        isFeatured: true, isBestSeller: true, discount: 28
      },
      {
        name: 'Charcoal Slim Fit Suit',
        description: 'A masterpiece of tailoring. This slim-fit suit in premium charcoal wool blend commands attention in every room.',
        price: 12999,
        originalPrice: 18999,
        category: 'suits',
        brand: 'SINGAM Elite',
        images: [
          'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600',
          'https://images.unsplash.com/photo-1594938298603-c8148c4b4267?w=600'
        ],
        sizes: [
          { size: '38', stock: 5 }, { size: '40', stock: 8 },
          { size: '42', stock: 6 }, { size: '44', stock: 4 }
        ],
        colors: [{ name: 'Charcoal', hex: '#36454f' }, { name: 'Navy', hex: '#1b2a4a' }],
        material: '70% Wool, 30% Polyester',
        tags: ['suit', 'formal', 'charcoal', 'premium'],
        isFeatured: true, isNewArrival: false, discount: 31
      },
      {
        name: 'Midnight Black Chinos',
        description: 'Versatile slim-fit chinos that transition effortlessly from office to evening. Made with stretch fabric for ultimate comfort.',
        price: 1799,
        originalPrice: 2499,
        category: 'trousers',
        brand: 'SINGAM',
        images: [
          'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600',
          'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600'
        ],
        sizes: [
          { size: '28', stock: 10 }, { size: '30', stock: 15 },
          { size: '32', stock: 20 }, { size: '34', stock: 12 }, { size: '36', stock: 8 }
        ],
        colors: [{ name: 'Black', hex: '#000000' }, { name: 'Khaki', hex: '#c3b091' }],
        material: '97% Cotton, 3% Elastane',
        tags: ['chinos', 'trousers', 'black', 'slim-fit'],
        isBestSeller: true, discount: 28
      },
      {
        name: 'Leather Biker Jacket',
        description: 'Genuine full-grain leather jacket with a timeless biker silhouette. Ages beautifully to develop a unique character.',
        price: 8999,
        originalPrice: 13999,
        category: 'jackets',
        brand: 'SINGAM Black Label',
        images: [
          'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600',
          'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=600'
        ],
        sizes: [
          { size: 'S', stock: 4 }, { size: 'M', stock: 6 },
          { size: 'L', stock: 8 }, { size: 'XL', stock: 5 }
        ],
        colors: [{ name: 'Jet Black', hex: '#0a0a0a' }, { name: 'Brown', hex: '#5c3d2e' }],
        material: '100% Full-Grain Leather',
        tags: ['jacket', 'leather', 'biker', 'premium'],
        isFeatured: true, isNewArrival: true, discount: 35
      },
      {
        name: 'Premium Derby Shoes',
        description: 'Handcrafted Oxford-style derby shoes in Italian leather. Features Goodyear welt construction for longevity.',
        price: 5999,
        originalPrice: 8999,
        category: 'shoes',
        brand: 'SINGAM Footwear',
        images: [
          'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600',
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600'
        ],
        sizes: [
          { size: '40', stock: 5 }, { size: '41', stock: 8 },
          { size: '42', stock: 10 }, { size: '43', stock: 7 }, { size: '44', stock: 4 }
        ],
        colors: [{ name: 'Cognac', hex: '#9b5523' }, { name: 'Black', hex: '#000000' }],
        material: 'Italian Full-Grain Leather',
        tags: ['shoes', 'derby', 'oxford', 'formal', 'leather'],
        isBestSeller: true, discount: 33
      },
      {
        name: 'Silk Pocket Square Set',
        description: 'Elevate any suit with this premium silk pocket square set. Includes 3 squares in complementary colors.',
        price: 899,
        originalPrice: 1299,
        category: 'accessories',
        brand: 'SINGAM',
        images: [
          'https://images.unsplash.com/photo-1594938298603-c8148c4b4267?w=600'
        ],
        sizes: [{ size: 'M', stock: 50 }],
        colors: [{ name: 'Multi', hex: '#ff6b35' }],
        material: '100% Pure Silk',
        tags: ['accessories', 'pocket square', 'silk', 'gift'],
        isNewArrival: true, discount: 30
      },
      {
        name: 'Bandhgala Jodhpuri Suit',
        description: 'Regal bandhgala suit in rich Jodhpuri style. Perfect for weddings and festive occasions. Royal craftsmanship meets modern cut.',
        price: 9999,
        originalPrice: 15999,
        category: 'ethnic',
        brand: 'SINGAM Heritage',
        images: [
          'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600'
        ],
        sizes: [
          { size: 'S', stock: 6 }, { size: 'M', stock: 10 },
          { size: 'L', stock: 8 }, { size: 'XL', stock: 5 }
        ],
        colors: [{ name: 'Ivory', hex: '#fffff0' }, { name: 'Royal Blue', hex: '#4169e1' }, { name: 'Maroon', hex: '#800000' }],
        material: 'Silk Blend',
        tags: ['ethnic', 'bandhgala', 'wedding', 'kurta', 'jodhpuri'],
        isFeatured: true, isNewArrival: true, discount: 37
      },
      {
        name: 'Casual Linen Shirt',
        description: 'Breathable linen shirt perfect for summer. The relaxed fit and natural texture make it ideal for beach outings or brunch.',
        price: 1299,
        originalPrice: 1799,
        category: 'casuals',
        brand: 'SINGAM',
        images: [
          'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600'
        ],
        sizes: [
          { size: 'S', stock: 12 }, { size: 'M', stock: 20 },
          { size: 'L', stock: 18 }, { size: 'XL', stock: 10 }, { size: 'XXL', stock: 6 }
        ],
        colors: [{ name: 'Sand', hex: '#c2b280' }, { name: 'Sky Blue', hex: '#87ceeb' }, { name: 'Olive', hex: '#808000' }],
        material: '100% Pure Linen',
        tags: ['casual', 'linen', 'summer', 'beach'],
        isBestSeller: true, discount: 27
      }
    ];

    await Product.insertMany(products);
    console.log('✅ Seed data inserted - 8 products');
  } catch (err) {
    console.error('Seed error:', err.message);
  }
};

module.exports = seedData();