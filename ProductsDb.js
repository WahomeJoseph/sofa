import sql from 'better-sqlite3'

const db = new sql('sofas.db',{ verbose: console.log });

// create the sofas table
db.exec(`
  CREATE TABLE IF NOT EXISTS sofas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    price REAL NOT NULL,
    image TEXT NOT NULL,
    material TEXT NOT NULL,
    color TEXT NOT NULL,
    in_stock INTEGER NOT NULL
  );
`);

// Insert sample sofa data
const sofas = [
  {
    name: 'Classic Leather Sofa',
    slug: 'classic-leather-sofa',
    description: 'A timeless leather sofa for yosur living room.',
    price: 1200.0,
    image: '/images/gatewood.jpg',
    material: 'Leather',
    color: 'Black',
    in_stock: 1,
  },
  {
    name: 'Modern Fabric Sofa',
    slug: 'modern-fabric-sofa',
    description: 'A sleek and modern fabric sofa.',
    price: 800.0,
    image: '/images/gatewood.jpg',
    material: 'Fabric',
    color: 'Gray',
    in_stock: 1,
  },
  {
    name: 'Vintage Chesterfield Sofa',
    slug: 'vintage-chesterfield-sofa',
    description: 'A vintage-style Chesterfield sofa with tufted details.',
    price: 1500.0,
    image: '/images/gatewood.jpg',
    material: 'Leather',
    color: 'Brown',
    in_stock: 0,
  },
  {
    name: 'Minimalist Loveseat',
    slug: 'minimalistic-loveseat',
    description: 'A compact loveseat for small spaces.',
    price: 600.0,
    image: '/images/gatewood.jpg',
    material: 'Fabric',
    color: 'White',
    in_stock: 1,
  },
  {
    name: 'Sectional Sofa',
    slug: 'sectional-sofa',
    description: 'A large sectional sofa for family gatherings.',
    price: 2000.0,
    image: '/images/gatewood.jpg',
    material: 'Fabric',
    color: 'Blue',
    in_stock: 1,
  },
  {
    name: 'Reclining Sofa',
    slug: 'reclining-sofa',
    description: 'A comfortable reclining sofa with built-in footrest.',
    price: 900.0,
    image: '/images/gatewood.jpg',
    material: 'Leather',
    color: 'Beige',
    in_stock: 1,
  },
  {
    name: 'Mid-Century Sofa',
    slug: 'mid-century-sofa',
    description: 'A stylish mid-century modern sofa.',
    price: 1100.0,
    image: '/images/gatewood.jpg',
    material: 'Wood and Fabric',
    color: 'Green',
    in_stock: 0,
  },
  {
    name: 'Convertible Sleeper Sofa',
    slug: 'convertible-sleeper-sofa',
    description: 'A sofa that converts into a bed for guests.',
    price: 1300.0,
    image: '/images/gatewood.jpg',
    material: 'Fabric',
    color: 'Charcoal',
    in_stock: 1,
  },
  {
    name: 'Velvet Sofa',
    slug: 'velvet-sofa',
    description: 'A luxurious velvet sofa for a touch of elegance.',
    price: 1400.0,
    image: '/images/gatewood.jpg',
    material: 'Velvet',
    color: 'Navy',
    in_stock: 1,
  },
  {
    name: 'Rustic Wood Sofa',
    slug: 'rustic-wood-sofa',
    description: 'A rustic sofa with wooden accents.',
    price: 950.0,
    image: '/images/gatewood.jpg',
    material: 'Wood and Fabric',
    color: 'Brown',
    in_stock: 1,
  },
  {
    name: 'Sleek Leather Sofa',
    slug: 'sleek-leather-sofa',
    description: 'A sleek and modern leather sofa.',
    price: 1250.0,
    image: '/images/gatewood.jpg',
    material: 'Leather',
    color: 'White',
    in_stock: 0,
  },
  {
    name: 'Compact Sofa Bed',
    slug: 'compact-sofa-bed',
    description: 'A space-saving sofa bed for small apartments.',
    price: 700.0,
    image: '/images/gatewood.jpg',
    material: 'Fabric',
    color: 'Gray',
    in_stock: 1,
  },
  {
    name: 'L-Shaped Sectional',
    slug: 'l-shaped-sectional',
    description: 'An L-shaped sectional sofa for large living rooms.',
    price: 1800.0,
    image: '/images/gatewood.jpg',
    material: 'Fabric',
    color: 'Beige',
    in_stock: 1,
  },
  {
    name: 'Tufted Sofa',
    slug: 'tufted-sofa',
    description: 'A tufted sofa with a classic design.',
    price: 1000.0,
    image: '/images/gatewood.jpg',
    material: 'Fabric',
    color: 'Blue',
    in_stock: 1,
  },
  {
    name: 'Sleek Futon',
    slug: 'sleek-futon',
    description: 'A modern futon for versatile seating.',
    price: 500.0,
    image: '/images/gatewood.jpg',
    material: 'Fabric',
    color: 'Black',
    in_stock: 1,
  },
  {
    name: 'Boho Chic Sofa',
    slug: 'boho-chic-sofa',
    description: 'A bohemian-style sofa with vibrant colors.',
    price: 850.0,
    image: '/images/gatewood.jpg',
    material: 'Fabric',
    color: 'Multicolor',
    in_stock: 0,
  },
  {
    name: 'Industrial Sofa',
    slug: 'industrial-sofa',
    description: 'An industrial-style sofa with metal accents.',
    price: 1100.0,
    image: '/images/gatewood.jpg',
    material: 'Metal and Fabric',
    color: 'Gray',
    in_stock: 1,
  },
  {
    name: 'Cozy Loveseat',
    slug: 'cozy-loveseat',
    description: 'A cozy loveseat for intimate spaces.',
    price: 650.0,
    image: '/images/gatewood.jpg',
    material: 'Fabric',
    color: 'Pink',
    in_stock: 1,
  },
  {
    name: 'Elegant Chaise Lounge',
    slug: 'elegant-chaise-lounge',
    description: 'An elegant chaise lounge for relaxation.',
    price: 950.0,
    image: '/images/gatewood.jpg',
    material: 'Leather',
    color: 'Black',
    in_stock: 1,
  },
  {
    name: 'Modern Sleeper Sofa',
    slug: 'modern-sleeper-sofa',
    description: 'A modern sleeper sofa with a minimalist design.',
    price: 1200.0,
    image: '/images/gatewood.jpg',
    material: 'Fabric',
    color: 'White',
    in_stock: 0,
  },
];

// Insert sofas into the database
const insert = db.prepare(`
  INSERT INTO sofas (name, slug, description, price, image, material, color, in_stock)
  VALUES (@name, @slug, @description, @price, @image, @material, @color, @in_stock)
`);

const insertMany = db.transaction((sofas) => {
  for (const sofa of sofas) insert.run(sofa);
});

insertMany(sofas);

console.log('Database created and populated with sofa data.');

// Close the database connection
db.close();