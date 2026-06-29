/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Category, Brand, Product, Blog, BuyingGuide } from '../types';

export const SEED_BRANDS: Brand[] = [
  {
    id: 'b1',
    name: 'Alpinestars',
    slug: 'alpinestars',
    logo: 'https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?auto=format&fit=crop&q=80&w=200',
    description: 'World-leading manufacturer of professional motorcycle racing protective gear, apparel, and footwear.',
    website: 'https://www.alpinestars.com',
    featured: true,
  },
  {
    id: 'b2',
    name: 'Dainese',
    slug: 'dainese',
    logo: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=200',
    description: 'Premium Italian brand specializing in cutting-edge protective wear for motorcycling, mountain biking, and winter sports.',
    website: 'https://www.dainese.com',
    featured: true,
  },
  {
    id: 'b3',
    name: 'MT Helmets',
    slug: 'mt-helmets',
    logo: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=200',
    description: 'Spanish helmet brand offering high safety standards (ECE 22.06 & DOT) at exceptional mid-range pricing.',
    website: 'https://mthelmets.com',
    featured: true,
  },
  {
    id: 'b4',
    name: 'LS2',
    slug: 'ls2',
    logo: 'https://images.unsplash.com/photo-1627483262112-039e9a0a0f16?auto=format&fit=crop&q=80&w=200',
    description: 'Global powerhouse delivering highly protective, features-packed helmets and riding jackets for commuters and touring pros.',
    website: 'https://ls2helmets.com',
    featured: true,
  },
  {
    id: 'b5',
    name: 'Royal Enfield',
    slug: 'royal-enfield',
    logo: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=200',
    description: 'Classic riding apparel, accessories, and helmets built with heritage styling and robust modern protection.',
    website: 'https://www.royalenfield.com',
    featured: true,
  },
  {
    id: 'b6',
    name: 'Cardo Systems',
    slug: 'cardo',
    logo: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=200',
    description: 'Pioneers and global market leaders in wireless communication systems and premium intercom mesh networks for riders.',
    website: 'https://www.cardosystems.com',
    featured: true,
  },
  {
    id: 'b7',
    name: 'Shima',
    slug: 'shima',
    logo: 'https://images.unsplash.com/photo-1542060748-10c28b629f6f?auto=format&fit=crop&q=80&w=200',
    description: 'Premium European riding gear brand designed with exceptional styling, quality materials, and meticulous safety ergonomics.',
    website: 'https://shima.pl',
    featured: false,
  },
  {
    id: 'b8',
    name: 'SMK Helmets',
    slug: 'smk',
    logo: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=200',
    description: 'World’s largest manufacturers of protective helmets for motorcyclists, delivering premium style, safety, and comfort.',
    website: 'https://smkhelmets.com',
    featured: false,
  }
];

export const SEED_CATEGORIES: Category[] = [
  { id: 'c1', name: 'Helmet', slug: 'helmet', description: 'Certified full-face, modular, and off-road riding helmets.', image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=400', icon: 'ShieldAlert', count: 12 },
  { id: 'c2', name: 'Riding Jacket', slug: 'riding-jacket', description: 'All-weather, mesh, and leather armored riding jackets.', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=400', icon: 'Shirt', count: 8 },
  { id: 'c3', name: 'Gloves', slug: 'gloves', description: 'Leather, mesh, carbon fiber protection touring and racing gloves.', image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=400', icon: 'Hand', count: 10 },
  { id: 'c4', name: 'Boots', slug: 'boots', description: 'CE-certified touring, track, and adventure riding boots.', image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=400', icon: 'Footprints', count: 6 },
  { id: 'c5', name: 'Riding Pants', slug: 'riding-pants', description: 'Armored touring pants and abrasion-resistant riding denims.', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=400', icon: 'Layers', count: 5 },
  { id: 'c6', name: 'Bluetooth Intercom', slug: 'bluetooth-intercom', description: 'Mesh communicators, riders calling, music, navigation, and group chats.', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=400', icon: 'Radio', count: 4 },
  { id: 'c7', name: 'Action Camera', slug: 'action-camera', description: 'High definition 4K/5K helmet cameras for moto-vlogging.', image: 'https://images.unsplash.com/photo-1565849906461-0ee2618fa412?auto=format&fit=crop&q=80&w=400', icon: 'Camera', count: 3 },
  { id: 'c8', name: 'Tank Bag', slug: 'tank-bag', description: 'Magnetic and strap-on premium tank bags for quick access.', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=400', icon: 'Briefcase', count: 4 },
  { id: 'c9', name: 'Tail Bag', slug: 'tail-bag', description: 'Rear-seat water-resistant luggage bags for long-haul touring.', image: 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&q=80&w=400', icon: 'Package', count: 3 },
  { id: 'c10', name: 'Saddle Bag', slug: 'saddle-bag', description: 'Side panniers and saddle luggage designed for cruise and adventure bikes.', image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=400', icon: 'ShoppingBag', count: 2 },
  { id: 'c11', name: 'GPS Device', slug: 'gps-device', description: 'Turn-by-turn rugged navigational computers for motorcycles.', image: 'https://images.unsplash.com/photo-1508873696983-2df519f0397e?auto=format&fit=crop&q=80&w=400', icon: 'MapPin', count: 2 },
  { id: 'c12', name: 'Fog Lamps', slug: 'fog-lamps', description: 'High-power auxiliary LED lighting for extreme night visibility.', image: 'https://images.unsplash.com/photo-1516655855035-d5215bcb5604?auto=format&fit=crop&q=80&w=400', icon: 'Lightbulb', count: 4 },
  { id: 'c13', name: 'Tyre Inflator', slug: 'tyre-inflator', description: 'Portable electric tyre compressors with digital pressure gauges.', image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=400', icon: 'Cpu', count: 2 },
  { id: 'c14', name: 'Chain Lubricant', slug: 'chain-lubricant', description: 'Premium chain waxes, sprays, and cleaners for drivetrain health.', image: 'https://images.unsplash.com/photo-1530047625168-4b18fa25d36f?auto=format&fit=crop&q=80&w=400', icon: 'Droplet', count: 3 },
  
  // Placeholders for remaining categories to fulfill user's list of 26 categories beautifully
  { id: 'c15', name: 'Rain Gear', slug: 'rain-gear', description: '100% waterproof overlay suits and shoe covers.', image: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&q=80&w=400', icon: 'CloudRain', count: 0 },
  { id: 'c16', name: 'Mobile Holder', slug: 'mobile-holder', description: 'Vibration dampened handlebar phone mounts.', image: 'https://images.unsplash.com/photo-1584438784894-089d6a128f3e?auto=format&fit=crop&q=80&w=400', icon: 'Smartphone', count: 0 },
  { id: 'c17', name: 'Dash Camera', slug: 'dash-camera', description: 'Dual-channel front and rear motorcycle DVR cameras.', image: 'https://images.unsplash.com/photo-1500485035595-cbeaf274177e?auto=format&fit=crop&q=80&w=400', icon: 'Video', count: 0 },
  { id: 'c18', name: 'Bike Cover', slug: 'bike-cover', description: 'Heavy-duty water-resistant UV-protective bike covers.', image: 'https://images.unsplash.com/photo-1558981852-416d28066bb3?auto=format&fit=crop&q=80&w=400', icon: 'Umbrella', count: 0 },
  { id: 'c19', name: 'Phone Charger', slug: 'phone-charger', description: 'Waterproof handlebar mount fast USB ports.', image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=400', icon: 'Zap', count: 0 },
  { id: 'c20', name: 'Bike Lights', slug: 'bike-lights', description: 'Headlight upgrades and tail-light flasher relays.', image: 'https://images.unsplash.com/photo-1444858291040-58ea7f219d7b?auto=format&fit=crop&q=80&w=400', icon: 'Sun', count: 0 },
  { id: 'c21', name: 'Tool Kit', slug: 'tool-kit', description: 'Compact multi-tool sets for emergency roadside repairs.', image: 'https://images.unsplash.com/photo-1530124560612-3ee9a1417fbc?auto=format&fit=crop&q=80&w=400', icon: 'Wrench', count: 0 },
  { id: 'c22', name: 'Cleaning Kit', slug: 'cleaning-kit', description: 'Microfiber towels, washing shampoos, and detailing sprays.', image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=400', icon: 'Sparkles', count: 0 },
  { id: 'c23', name: 'Engine Oil', slug: 'engine-oil', description: 'Fully synthetic high-performance motorcycle engine lubricants.', image: 'https://images.unsplash.com/photo-1552845294-4b9a896cdcaf?auto=format&fit=crop&q=80&w=400', icon: 'Compass', count: 0 },
  { id: 'c24', name: 'Riding Goggles', slug: 'riding-goggles', description: 'Off-road and adventure high-impact UV goggles.', image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=400', icon: 'Eye', count: 0 },
  { id: 'c25', name: 'Hydration Pack', slug: 'hydration-pack', description: 'Touring backpacks with thermal bladders for hands-free drinking.', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=400', icon: 'GlassWater', count: 0 },
  { id: 'c26', name: 'Accessories', slug: 'accessories', description: 'Helmet bags, keychains, visor cleaners, and other riding essentials.', image: 'https://images.unsplash.com/photo-1527236438218-d82077ae1f85?auto=format&fit=crop&q=80&w=400', icon: 'MoreHorizontal', count: 0 }
];

export const SEED_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'MT Thunder 4 SV Solid Helmet',
    slug: 'mt-thunder-4-sv-solid-helmet',
    shortDescription: 'The pinnacle of affordable ECE 22.06 certified helmets with built-in internal sun visor.',
    longDescription: 'The MT Thunder 4 SV represents the ultimate technological breakthrough in affordable motorcycle helmet safety. Becoming one of the first in its price class to obtain the stringent ECE 22.06 safety standard, it features an advanced HIRP (High Impact Resistant Polymer) aerodynamic shell, a drop-down internal sun visor, emergency quick release cheek pads, and optimized ventilation channels. Perfect for daily commuters, weekend touring enthusiasts, and budget sport riders who refuse to compromise on safety.',
    brand: 'mt-helmets',
    category: 'helmet',
    images: [
      'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1627483262112-039e9a0a0f16?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600'
    ],
    specifications: {
      'Shell Material': 'HIRP (High Impact Resistant Polymer)',
      'Safety Certifications': 'ECE 22.06 & DOT Certified',
      'Weight': '1550g (+/- 50g)',
      'Visor': 'Max Vision Pinlock Ready Clear Visor with integrated inner Sun Visor',
      'Closure System': 'Micrometric Metal Buckle',
      'Interior': 'Hypoallergenic, breathable, removable, and washable comfort liner'
    },
    pros: [
      'ECE 22.06 certified safety rating (world standard)',
      'Integrated drop-down inner sun visor',
      'Exceptional aerodynamic design and stability at high speeds',
      'Emergency strap quick-release cheek pads'
    ],
    cons: [
      'Slightly heavier due to the internal sun visor mechanisms',
      'Wind noise is audible above 110 km/h'
    ],
    features: [
      'Max Vision anti-fog Pinlock lens included in the box',
      'Intercom pocket ready for easy Bluetooth communicator installation',
      'Rotational impact protection built directly into the EPS liner'
    ],
    highlights: [
      'ECE 22.06 World Safety Standard',
      'HIRP Lightweight Shell Technology',
      'Built-in Drop-Down Sun Visor',
      'Aerodynamic Wind Tunnel Tested'
    ],
    price: 6800,
    mrp: 8500,
    discount: 20,
    rating: 4.8,
    reviewCount: 245,
    affiliateLinks: [
      { platform: 'amazon', label: 'Buy on Amazon India', url: 'https://amazon.in/dp/example1', price: 6800 },
      { platform: 'flipkart', label: 'Buy on Flipkart', url: 'https://flipkart.com/example1', price: 6999 },
      { platform: 'official', label: 'Buy on Official Store', url: 'https://mthelmets.in/thunder4', price: 7200 }
    ],
    seoTitle: 'MT Thunder 4 SV Solid Helmet - ECE 22.06 Certified Premium Helmet',
    seoDescription: 'Discover the MT Thunder 4 SV Helmet. Featuring ECE 22.06 safety rating, HIRP shell, drop-down sun visor, and maximum comfort. Compare prices and buy today.',
    keywords: ['MT Helmets', 'Thunder 4 SV', 'ECE 22.06 helmet', 'best budget helmet India', 'helmet with sun visor'],
    tags: ['Best Seller', 'ECE 22.06', 'Sun Visor', 'Full Face'],
    featured: true,
    trending: true
  },
  {
    id: 'p2',
    name: 'Alpinestars T-GP Plus R v3 Air Jacket',
    slug: 'alpinestars-t-gp-plus-r-v3-air-jacket',
    shortDescription: 'The ultimate lightweight, CE-certified protective summer mesh jacket from Alpinestars.',
    longDescription: 'Engineered specifically for hot weather performance, the Alpinestars T-GP Plus R v3 Air Jacket features a highly durable and abrasion-resistant poly-fabric main shell with extensive mesh panels strategically placed on the chest, back, and arms. Equipped with class-leading Nucleon Flex Plus armor on the shoulders and elbows, this jacket offers superior impact protection while keeping you cool. Sleek sport styling combined with pre-curved sleeves makes this the perfect option for street performance riding during scorching summer days.',
    brand: 'alpinestars',
    category: 'riding-jacket',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=600'
    ],
    specifications: {
      'Outer Shell': '600 Denier Polyester with premium mesh panels',
      'Impact Protection': 'CE Level 1 Nucleon Flex Plus shoulder & elbow armor',
      'Back Protection': 'Pocket ready for Nucleon KR-2i Back Protector (sold separately)',
      'Fit': 'Sport fit with pre-curved sleeves and accordion stretch panels',
      'Ventilation': 'High air-flow mesh lining and front mesh core'
    },
    pros: [
      'Incredible ventilation and airflow in hot and humid weather',
      'Highly flexible Nucleon Flex Plus protectors feel virtually invisible',
      'Premium sporty aesthetics with iconic Alpinestars branding'
    ],
    cons: [
      'Not waterproof; needs an external rain layer',
      'Back protector must be purchased separately'
    ],
    features: [
      'Waist connection zipper allows attachment to Alpinestars riding pants',
      'Reflective details for improved low-light rider visibility',
      'Low profile collar construction with soft 3D textured comfort lining'
    ],
    highlights: [
      'Heavy-duty 600D Poly-fabric',
      'Nucleon Flex Plus Flex-Armor',
      'Maximum Airflow Mesh Lining',
      'CE Category II Certified'
    ],
    price: 18500,
    mrp: 21999,
    discount: 15,
    rating: 4.9,
    reviewCount: 128,
    affiliateLinks: [
      { platform: 'amazon', label: 'Get Deal on Amazon', url: 'https://amazon.in/dp/example2', price: 18500 },
      { platform: 'official', label: 'Buy Official Alpinestars India', url: 'https://alpinestarsindia.com/tgpplusv3', price: 19500 }
    ],
    seoTitle: 'Alpinestars T-GP Plus R v3 Air Jacket Review & Comparison',
    seoDescription: 'Read the comprehensive review of Alpinestars T-GP Plus R v3 Air Summer Riding Jacket. Find prices, specifications, pros, and cons.',
    keywords: ['Alpinestars', 'Summer riding jacket', 'mesh jacket', 'armored jacket', 'best premium jacket'],
    tags: ['Premium Choice', 'Summer Mesh', 'Sport Fit'],
    featured: true,
    trending: true
  },
  {
    id: 'p3',
    name: 'LS2 Storm II Solid Full Face Helmet',
    slug: 'ls2-storm-ii-solid-full-face-helmet',
    shortDescription: 'Ultra-lightweight KPA shell helmet with double-visor system and supreme touring comfort.',
    longDescription: 'The LS2 Storm II full-face motorcycle helmet offers high-performance specs at an amazing value. Built with LS2’s proprietary Kinetic Polymer Alloy (KPA) shell—a strong, lightweight composite material that flexes for energy management—it provides exceptional safety ratings. Coupled with a dynamic flow-through ventilation layout, an elegant drop-down sunshield, and an optically correct 3D class A visor, it’s a premier lightweight cruiser and sports touring helmet designed to withstand miles of adventure.',
    brand: 'ls2',
    category: 'helmet',
    images: [
      'https://images.unsplash.com/photo-1627483262112-039e9a0a0f16?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=600'
    ],
    specifications: {
      'Shell Material': 'KPA (Kinetic Polymer Alloy)',
      'Safety Standard': 'ECE 22.06',
      'Weight': '1400g (+/- 50g)',
      'Channeled Ports': 'Chin, Forehead vent, Rear exhaust exhaust port',
      'Visor Tech': 'Optically correct 3D Class-A Polycarbonate'
    },
    pros: [
      'Extremely lightweight compared to competitors (only 1400g)',
      'Highly flexible KPA shell absorbs heavy impacts brilliantly',
      'Premium laser-cut foam cheek pads provide a custom contour fit'
    ],
    cons: [
      'Visor quick release mechanism is slightly complex to operate',
      'Vent toggles can feel flimsy with thick winter gloves'
    ],
    features: [
      'Quick release metal ratchet chin strap',
      'Pinlock 70 MaxVision anti-fog lens insert included',
      'Multi-density EPS liner safety protection'
    ],
    highlights: [
      'Kinetic Polymer Alloy Shell',
      'Super Lightweight (1400g)',
      'Class A Distortion-Free Visor',
      'Channeled Dynamic Air Ventilation'
    ],
    price: 10500,
    mrp: 12500,
    discount: 16,
    rating: 4.6,
    reviewCount: 94,
    affiliateLinks: [
      { platform: 'amazon', label: 'View Price on Amazon', url: 'https://amazon.in/dp/example3', price: 10500 },
      { platform: 'flipkart', label: 'Buy from Flipkart', url: 'https://flipkart.com/example3', price: 10750 },
      { platform: 'official', label: 'Visit LS2 Official Store', url: 'https://ls2india.com/storm', price: 11000 }
    ],
    seoTitle: 'LS2 Storm II Full Face Helmet - Price, Specs, Pros/Cons',
    seoDescription: 'Review and compare the LS2 Storm II Solid helmet. Find detailed specifications, price ranges, ratings, and genuine buying options.',
    keywords: ['LS2', 'LS2 Storm II', 'KPA helmet', 'lightweight helmet', 'ECE 22.06'],
    tags: ['Lightweight', 'ECE 22.06', 'Touring Choice'],
    featured: false,
    trending: true
  },
  {
    id: 'p4',
    name: 'Cardo Packtalk Edge Bluetooth Intercom',
    slug: 'cardo-packtalk-edge-bluetooth-intercom',
    shortDescription: 'The ultimate 2nd-gen Dynamic Mesh Communication intercom featuring premium sound by JBL.',
    longDescription: 'The Cardo Packtalk Edge is the absolute pinnacle of wireless motorcycle communication. Powered by Cardo’s second-generation Dynamic Mesh Communication (DMC) technology, it supports up to 15 riders with self-healing, crystal-clear connections. It introduces a revolutionary magnetic Air Mount for effortless helmet installation, fully waterproof IP67 construction, and customized high-fidelity 40mm speakers by JBL. If you want the absolute best-in-class communications, hands-free voice operations, and rich acoustic output, look no further.',
    brand: 'cardo',
    category: 'bluetooth-intercom',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600'
    ],
    specifications: {
      'Comm Tech': '2nd Gen Dynamic Mesh Communication (DMC) & Bluetooth 5.2',
      'Rider Capacity': 'Up to 15 riders in mesh network',
      'Range': 'Up to 1.6km rider-to-rider (8km group range)',
      'Audio Hardware': 'Premium 40mm JBL speakers with custom EQ profiles',
      'Waterproofing': 'IP67 Waterproof Certified',
      'Battery Life': '13 Hours talk time with fast USB-C charging'
    },
    pros: [
      'Incredibly strong and neat magnetic Air Mount docking system',
      'Sound by JBL delivers rich bass and clear audio at highway speeds',
      'Natural voice commands let you keep hands safely on handlebars',
      'Over-the-air software updates directly through mobile application'
    ],
    cons: [
      'Extremely premium price point',
      'Lacks backwards mesh compatibility with older 1st gen Cardo DMC systems unless bridged'
    ],
    features: [
      'Bluetooth 5.2 connectivity to pair dual phones/GPS devices',
      'Auto-volume adjustments based on surrounding highway wind noise',
      'Universal pairing to hook up with non-Cardo communicators'
    ],
    highlights: [
      '2nd Gen Dynamic Mesh (DMC)',
      'Revolutionary Magnetic Air Mount',
      'Acoustic Sound by JBL',
      'Fully IP67 Waterproofing'
    ],
    price: 31500,
    mrp: 35000,
    discount: 10,
    rating: 4.9,
    reviewCount: 312,
    affiliateLinks: [
      { platform: 'amazon', label: 'Buy Cardo Edge on Amazon', url: 'https://amazon.in/dp/example4', price: 31500 },
      { platform: 'official', label: 'Buy Official Cardo India', url: 'https://cardoindia.com/packtalkedge', price: 33000 }
    ],
    seoTitle: 'Cardo Packtalk Edge Review - Best Motorcycle Intercom',
    seoDescription: 'Is the Cardo Packtalk Edge worth the premium price tag? Read our professional specifications, comparisons, reviews, and find best deals.',
    keywords: ['Cardo Packtalk Edge', 'best motorcycle intercom', 'JBL helmet speakers', 'mesh communication', 'Cardo India'],
    tags: ['Editor Choice', 'JBL Audio', 'Waterproof', 'Mesh Comm'],
    featured: true,
    trending: true
  },
  {
    id: 'p5',
    name: 'Alpinestars SMX-6 v2 Boots',
    slug: 'alpinestars-smx-6-v2-boots',
    shortDescription: 'CE-certified high-performance track and street riding boots with bio-mechanical ankle protection.',
    longDescription: 'A comprehensive racing and street track riding boot incorporating an advanced micro-fiber upper, the Alpinestars SMX-6 v2 is packed with innovative protective tech. Every component in this CE-certified boot is carefully engineered to give riders a crucial performance edge, featuring high-modulus TPU ankle braces, double-density shin protectors, calf sliders, and integrated gear shifter pads. Air vents throughout keep feet dry, and an ergonomic elastic panel design ensures comfort on and off the bike.',
    brand: 'alpinestars',
    category: 'boots',
    images: [
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=600'
    ],
    specifications: {
      'Upper Material': 'Advanced synthetic microfiber for durability and abrasion resistance',
      'Safety Rating': 'CE Certified to EN 13634:2010 safety standard',
      'Ankle Protection': 'TPU lateral bio-mechanical ankle brace protection system',
      'Sliders': 'Replaceable dual-injection TPU toe sliders with easy screw-in',
      'Sole': 'Alpinestars exclusive compound rubber sole for grip and water dispersion'
    },
    pros: [
      'Superb bio-mechanical ankle stability prevents dangerous hyper-extension',
      'Replaceable toe sliders increase longevity for aggressive track riders',
      'Highly breathable interior mesh liners keep feet sweat-free'
    ],
    cons: [
      'Quite stiff out of the box; requires a break-in period',
      'Creates a loud squeaking noise when walking initially'
    ],
    features: [
      'Elastic-mounted zippers with wide hook-and-loop flap covers for secure fit',
      'Internal toe box reinforcement layered under the microfiber upper',
      'Removable anatomical footbed with EVA and Lycra for supreme heel arch support'
    ],
    highlights: [
      'CE Certified Safety Protection',
      'Bio-Mechanical Ankle Support',
      'TPU Shin Guard & Sliders',
      'Exclusive Grip Rubber Sole'
    ],
    price: 21900,
    mrp: 24999,
    discount: 12,
    rating: 4.7,
    reviewCount: 63,
    affiliateLinks: [
      { platform: 'amazon', label: 'Buy SMX-6 on Amazon', url: 'https://amazon.in/dp/example5', price: 21900 },
      { platform: 'official', label: 'Official Alpinestars Store', url: 'https://alpinestarsindia.com/smx6v2', price: 23500 }
    ],
    seoTitle: 'Alpinestars SMX-6 v2 Boots Review, Specs & Deals',
    seoDescription: 'Compare and review the Alpinestars SMX-6 v2 Riding Boots. Certified bio-mechanical protection for track day racing and sporty weekend riding.',
    keywords: ['Alpinestars boots', 'SMX-6 v2', 'track boots', 'CE riding boots', 'motorcycle race boots'],
    tags: ['Track Ready', 'CE Certified', 'Bio-Mechanical'],
    featured: false,
    trending: false
  },
  {
    id: 'p6',
    name: 'Shima Caliber Leather Gloves',
    slug: 'shima-caliber-leather-gloves',
    shortDescription: 'Classic, vintage styled leather gloves with Poron®XRD impact absorbers and carbon knuckles.',
    longDescription: 'The Shima Caliber combines classic, retro cruiser elegance with highly technical modern armor. Made from premium quality soft goatskin leather, it features a pre-curved shape for an outstanding handle grip. Underneath the timeless aesthetic lies hard carbon fiber knuckle protectors, backed by Poron®XRD high-performance impact-absorbing materials, plus reinforced double-layered leather on critical sliding zones. Perfect for café racers, vintage scramblers, and cruiser riders who cherish leather styling with ultimate protection.',
    brand: 'shima',
    category: 'gloves',
    images: [
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1542060748-10c28b629f6f?auto=format&fit=crop&q=80&w=600'
    ],
    specifications: {
      'Main Material': 'Premium-grade soft goatskin leather',
      'Knuckle Shield': 'Hard-shell carbon fiber protective plate',
      'Impact Absorbers': 'Poron®XRD panels on palm and wrist zones',
      'Ventilation': 'Perforated leather panels on fingers and back of hand',
      'Stitching': 'External seam stitching on fingers to eliminate interior pressure points'
    },
    pros: [
      'Extremely soft goatskin leather provides excellent throttle and lever feel',
      'External finger stitching prevents inner rubbing irritation',
      'Stunning retro vintage look that pairs perfectly with classic motorcycles'
    ],
    cons: [
      'Not waterproof; gets soaked in heavy rain and takes time to dry',
      'Lacks smart-touch conductive fingertips for mobile phone usage'
    ],
    features: [
      'Pulling strap on wrist for easy slip-on convenience',
      'Accordion leather stretch expansion zones on fingers',
      'Perforated cooling zones for pleasant hot weather airflow'
    ],
    highlights: [
      'Premium Soft Goatskin',
      'Hard Carbon Knuckles',
      'Poron®XRD Shock Absorption',
      'Classic Vintage Aesthetics'
    ],
    price: 5499,
    mrp: 6499,
    discount: 15,
    rating: 4.5,
    reviewCount: 42,
    affiliateLinks: [
      { platform: 'amazon', label: 'Buy Shima Gloves on Amazon', url: 'https://amazon.in/dp/example6', price: 5499 },
      { platform: 'official', label: 'Buy Shima Caliber Official', url: 'https://shimaindia.com/caliber', price: 5999 }
    ],
    seoTitle: 'Shima Caliber Goatskin Leather Gloves Review & Prices',
    seoDescription: 'Review of the vintage Shima Caliber Leather Gloves. Features goatskin leather, carbon knuckles, Poron XRD protectors, and supreme retro comfort.',
    keywords: ['Shima Caliber', 'vintage leather gloves', 'goatskin gloves', 'retro motorcycle gloves'],
    tags: ['Retro Styled', 'Goatskin Leather', 'High Comfort'],
    featured: false,
    trending: false
  },
  {
    id: 'p7',
    name: 'Royal Enfield Nirbhay Armored Jacket',
    slug: 'royal-enfield-nirbhay-armored-jacket',
    shortDescription: 'Heavy-duty 450D high abrasion-resistant polyester touring jacket with D3O armor.',
    longDescription: 'Built in partnership with D3O, the global standard in impact safety, the Royal Enfield Nirbhay (Fearless) Riding Jacket is a heavy-duty touring jacket designed for Indian riding conditions. Crafted from 450D high-density abrasion-resistant polyester mesh and solid fabrics, it comes pre-equipped with premium CE Level 2 certified D3O T5 Evo protectors at the shoulders and elbows, plus a thick EVA back shield. Featuring extensive adjustments for a personalized fit, it’s a rugged and reliable armor designed for long Himalayan highway journeys.',
    brand: 'royal-enfield',
    category: 'riding-jacket',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=600'
    ],
    specifications: {
      'Main Frame': '450 Denier heavy polyester with breathable mesh sections',
      'Elbow & Shoulder': 'CE Level 2 D3O T5 Evo impact protectors',
      'Back Guard': 'High-density premium EVA foam pad (upgradable)',
      'Waterproofing': 'Detachable thermal liner + waterproof rain liner included',
      'Adjustments': 'Cinch tabs on sleeves, waist, cuffs, and collar'
    },
    pros: [
      'Comes bundled with both independent winter thermal and rain liners',
      'Equipped with top-tier D3O Level 2 armor out of the box',
      'Incredible value for money for an all-weather modular touring jacket'
    ],
    cons: [
      'Heavy bulk and weight when all liners are attached',
      'Fits slightly loose; sport riders may prefer a tighter fit'
    ],
    features: [
      'Large reflective Royal Enfield brand logo prints for nighttime touring safety',
      'Two spacious micro-fleece lined handwarmer front pockets',
      'Waterproof internal zipper chest pocket to keep smartphones dry'
    ],
    highlights: [
      'Integrated D3O Level 2 Armor',
      'Triple Liner Configuration',
      'Heavy Duty 450D Polyester',
      'Optimized Indian Tour Fitting'
    ],
    price: 8900,
    mrp: 9999,
    discount: 11,
    rating: 4.7,
    reviewCount: 154,
    affiliateLinks: [
      { platform: 'amazon', label: 'Buy RE Nirbhay on Amazon', url: 'https://amazon.in/dp/example7', price: 8900 },
      { platform: 'official', label: 'Shop Royal Enfield Store', url: 'https://royalenfield.com/gear/nirbhay', price: 8900 }
    ],
    seoTitle: 'Royal Enfield Nirbhay Armored Jacket Price & Review',
    seoDescription: 'Read reviews and compare prices for the Royal Enfield Nirbhay Riding Jacket. Equipped with genuine D3O Level 2 armor and tri-liner all-weather versatility.',
    keywords: ['Royal Enfield Nirbhay', 'RE riding jacket', 'D3O armor jacket', 'best touring jacket India', 'budget winter riding jacket'],
    tags: ['Best Seller', 'D3O Armor', 'All Weather', 'Triple Liner'],
    featured: true,
    trending: false
  }
];

export const SEED_BLOGS: Blog[] = [
  {
    id: 'b1',
    title: 'Understanding ECE 22.06: The New Standard for Helmet Safety',
    slug: 'understanding-ece-22-06-helmet-safety',
    summary: 'The ECE 22.05 safety standard ruled for two decades. Now, the tougher ECE 22.06 is mandatory. Here is exactly what changed and why you must upgrade.',
    content: `
# Understanding ECE 22.06: The Ultimate Guide to Helmet Safety

For over 20 years, the European Commission for Europe (ECE) 22.05 certification was the gold standard for motorcycle helmet safety in dozens of countries. However, as motorcycle performance increased and crash biomechanics research advanced, a revamp was drastically needed.

Enter **ECE 22.06** — the toughest, most rigorous testing standard ever designed for motorcycle helmets.

In this guide, we break down exactly what ECE 22.06 testing involves, how it compares to older certifications, and why your next helmet purchase absolutely must have this badge.

---

## What is ECE 22.06?
Implemented fully in 2023, ECE 22.06 is a regulation that defines the absolute minimum safety criteria a helmet must achieve to be sold legally across Europe and other international markets. 

Compared to the old 22.05 rules, 22.06 expands the test criteria exponentially, changing how impacts are measured and incorporating advanced biomechanical metrics.

---

## 1. More Impact Points (And Random Speeds)
Under ECE 22.05, engineers knew exactly where the impact sensors would strike the helmet during tests. This allowed some budget manufacturers to selectively reinforce those specific points while leaving other shell areas vulnerable.

**ECE 22.06 eliminates this loophole.** It defines:
*   **18 distinct impact zones** (up from 5 points).
*   **High-speed impacts (8.2 m/s)** to simulate heavy direct hits.
*   **Low-speed impacts (6.0 m/s)**. *Why?* Because a shell that is too stiff won't flex during low-speed drops, transferring dangerous G-forces straight to the rider's brain.

---

## 2. Rotational Impact Testing (The Silent Killer)
In real-world crashes, riders rarely hit the pavement at a perfectly flat 90-degree angle. Most impacts are oblique, causing the helmet to catch and spin rapidly. This rotational force twists the brain inside the skull, leading to severe Traumatic Brain Injuries (TBI).

ECE 22.06 introduces a **Rotational Impact Test**:
*   Helmets are dropped onto an angled anvil covered in abrasive grip-paper.
*   Ultra-fast brain-simulating sensors inside the test headform measure rotational acceleration.
*   Helmets must successfully slip or absorb this twisting kinetic energy to pass.

---

## 3. Mandatory Accessory Integration Testing
Do you ride with an internal drop-down sun visor? Or do you clamp on a Bluetooth intercom system?

Under the old standard, accessories were ignored. ECE 22.06 dictates that:
1.  **Dual Visor Systems** must be tested both with the internal sun visor up AND fully deployed.
2.  Any official brand **intercom systems** must be mounted during the crash drops to verify that rigid plastic clamps don't puncture the EPS liner.

---

## Summary: Should You Upgrade Today?
If you currently own a helmet certified under ECE 22.05 or ISI that is in good, crash-free condition and under 5 years old, you do not need to throw it away immediately.

However, if you are buying a **new helmet today**, selecting an **ECE 22.06 certified helmet** (like the *MT Thunder 4 SV* or *LS2 Storm II*) guarantees you are wrapping your head in the absolute latest, scientifically proven protective technology available on Earth.

Stay safe, ride hard!
    `,
    category: 'Safety',
    tags: ['Helmet', 'Safety Standards', 'ECE 22.06', 'Riding Tips'],
    author: {
      name: 'Aditya Vardhan',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
      role: 'Chief Gear Reviewer & Veteran Tourer'
    },
    image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=600',
    readTime: '5 mins read',
    createdDate: 'June 24, 2026',
    featured: true
  },
  {
    id: 'b2',
    title: 'Top 5 Essential Motorcycle Touring Accessories Under ₹10,000',
    slug: 'top-5-essential-touring-accessories-under-10000',
    summary: 'Preparing for a long-distance road trip? These budget-friendly premium accessories will dramatically enhance your comfort, luggage convenience, and communication.',
    content: `
# Top 5 Essential Motorcycle Touring Accessories Under ₹10,000

Embarking on a cross-country motorcycle tour is one of the most liberating experiences a rider can have. However, spending hours in the saddle can quickly turn painful or frustrating if you lack the right preparation.

You don't need a massive budget to prepare your motorcycle for long journeys. Here are the **top 5 essential touring upgrades and accessories under ₹10,000** that will elevate your next adventure.

---

## 1. Heavy-Duty Armored Mesh Gloves (e.g., Shima Caliber / Alpinestars)
*   **Price Range:** ₹4,500 - ₹7,000
*   **Why it is essential:** Tourers spend hours gripping throttle grips. A high-quality leather/mesh composite glove protects your hands from heavy weather, reduces road handlebar vibrations, and provides critical carbon fiber knuckle armor in case of a slide.

## 2. Dynamic Handlebar Phone Mount with Vibration Dampener
*   **Price Range:** ₹2,500 - ₹4,000
*   **Why it is essential:** Navigating unfamiliar highways requires a steady GPS screen. Standard cheap metal holders can destroy your premium smartphone’s delicate optical camera stabilizers due to high-frequency engine vibrations. Look for holders with integrated rubberized dampeners.

## 3. High-Capacity Magnetic Tank Bag (e.g., Viaterra / Rynox)
*   **Price Range:** ₹3,500 - ₹5,500
*   **Why it is essential:** Stashing your wallet, rain suit, visor cleaners, and snack bars in rear saddlebags is highly inconvenient. A quick-release magnetic or strap tank bag sits directly in front of you, offering easy clear-pocket access for electronic toll tags and cards.

## 4. Rugged Portable Electric Tyre Inflator (e.g., Mi Portable Air Compressor)
*   **Price Range:** ₹2,800 - ₹3,500
*   **Why it is essential:** Remote mountain passes lack gas stations. Having a compact, USB-rechargeable electric pump with an integrated pressure gauge lets you repair punctures on the roadside and re-inflate tubeless tyres within minutes.

## 5. Basic Universal Bluetooth Communicator
*   **Price Range:** ₹7,500 - ₹9,999
*   **Why it is essential:** Solitary touring can lead to fatigue. A budget-friendly Bluetooth intercom lets you stream navigational turn-by-turn alerts, answer phone calls hands-free, and play soothing background music to keep your mind sharp and alert.

---

### Conclusion
A great touring setup is built on smart utility, not expensive bragging rights. By investing in these 5 critical budget accessories, you protect your body, secure your luggage, and keep your communications flowing seamlessly.
    `,
    category: 'Touring',
    tags: ['Touring Accessories', 'Budget Gear', 'Motorcycle Riding', 'Luggage'],
    author: {
      name: 'Vikram Sethi',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
      role: 'Adventure Rallyist & MotoJournalist'
    },
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=600',
    readTime: '4 mins read',
    createdDate: 'May 18, 2026',
    featured: false
  }
];

export const SEED_BUYING_GUIDES: BuyingGuide[] = [
  {
    id: 'g1',
    title: 'How to Choose the Perfect Fitting Motorcycle Helmet',
    slug: 'how-to-choose-perfect-fitting-helmet',
    category: 'helmet',
    summary: 'A poorly fitting helmet is both uncomfortable and incredibly dangerous during a crash. Here is a scientific step-by-step guide to measuring your head shape and selecting the right size.',
    image: 'https://images.unsplash.com/photo-1627483262112-039e9a0a0f16?auto=format&fit=crop&q=80&w=600',
    content: `
# How to Choose the Perfect Fitting Helmet: A Step-by-Step Guide

Many riders believe that choosing a helmet is as simple as picking "Medium" or "Large" off a display rack. In reality, a helmet that does not fit your unique head shape correctly will either cause blinding headaches within 30 minutes, or fly right off your head during a high-speed accident.

Follow this systematic guide to ensure you buy a helmet that protects your brain and keeps you perfectly comfortable.

---

## Step 1: Determine Your Head Shape
Every human skull is unique, but helmet manufacturers design interior liners around three primary head shapes:
1.  **Long Oval:** Head is significantly longer from front-to-back than side-to-side.
2.  **Intermediate Oval (Most Common):** Head is slightly longer front-to-back than side-to-side. Most helmets in India are designed for this.
3.  **Round Oval:** Head is nearly identical in length and width.

*How to find yours:* Have a friend take a top-down photo of your head with your hair flattened. This will instantly reveal your natural profile shape.

---

## Step 2: Measure Your Head Circumference
Take a flexible fabric measuring tape and wrap it horizontally around your head:
*   Position it about **1 inch (2.5 cm) above your eyebrows**.
*   Pass it over the widest, most prominent part of the back of your skull.
*   Record the measurement in centimeters.

Compare this exact centimeter reading with the brand's unique sizing chart (e.g., 57-58cm is usually Medium, 59-60cm is Large). *Never assume sizing across different brands! An Alpinestars Medium fits very differently than an MT Helmets Medium.*

---

## Step 3: The Fitting Test (How it should feel)
When you first slip a correctly-sized brand new helmet onto your head, it should feel **tight**.
*   **The Cheek Check:** Your cheeks should be pushed up slightly like a "chipmunk." There should be no gap between your brow and the forehead liner.
*   **The Roll Test:** Fasten the chin strap securely. Grab the rear chin bar of the helmet and try to roll it forward off your head. If it slips off or uncovers your eyes, the helmet is too large.
*   **The Wear Test:** Keep the helmet on inside your house for 15-20 minutes. If you feel any painful "hotspots" or pinching on your temples or forehead, the shape is too round or small. If it feels snug but uniform, it is a perfect match!

*Remember: Interior cheek liners compress by about 15% after the first 10-15 hours of riding, so a slightly snug helmet is ideal.*
    `,
    lastUpdated: 'June 12, 2026'
  }
];

export const SEED_FAQS = [
  {
    q: 'Does MotoGear Hub sell riding gear directly?',
    a: 'No. MotoGear Hub is a discovery, comparison, and review platform. We do not stock inventory or sell products directly. We help riders compare prices, features, and specifications, and provide affiliate links to purchase from trusted networks like Amazon, Flipkart, and official brand stores.'
  },
  {
    q: 'Are the prices shown on the website accurate?',
    a: 'We fetch and update prices regularly from our partner affiliate stores. However, since marketplaces alter prices dynamically based on discounts and seller offers, we recommend clicking on the "View on Store" buttons to see the absolute latest live price.'
  },
  {
    q: 'What is ECE 22.06 and should I buy ECE 22.05 helmets?',
    a: 'ECE 22.06 is the latest and most stringent European safety standard for motorcycle helmets, introducing oblique impact testing and multi-speed drops. While ECE 22.05 helmets still offer high protection, we highly recommend upgrading to ECE 22.06 certified helmets for the best modern safety protection.'
  },
  {
    q: 'How does your product comparison tool work?',
    a: 'Our Comparison Engine aggregates detailed structural specifications, user ratings, pros/cons, and pricing from our database. It calculates an automated "Recommendation Score" based on safety-to-price ratios, so riders can make unbiased purchasing decisions.'
  }
];
