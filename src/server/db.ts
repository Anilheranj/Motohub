/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { SEED_BRANDS, SEED_CATEGORIES, SEED_PRODUCTS, SEED_BLOGS } from '../data/seedData';
import { Product, Category, Brand, Blog, ClickRecord, ContactMessage, NewsletterSubscriber, DashboardStats } from '../types';
import { uploadToCloudinary, deleteFromCloudinary } from './cloudinary';
import {
  MongoCategory,
  MongoBrand,
  MongoProduct,
  MongoBlog,
  MongoContactMessage,
  MongoNewsletterSubscriber,
  MongoClickRecord,
  MongoAdmin,
  ICategoryDoc,
  IBrandDoc,
  IProductDoc,
  IBlogDoc,
  IContactDoc,
  INewsletterDoc,
  IClickDoc
} from './models';

let isMongoConnected = false;

// Cloudinary Image Processing Helper
async function processProductImages(p: any): Promise<any> {
  if (!p) return p;
  try {
    if (p.primaryImage && p.primaryImage.startsWith('data:image/')) {
      p.primaryImage = await uploadToCloudinary(p.primaryImage);
    }
    if (p.thumbnail && p.thumbnail.startsWith('data:image/')) {
      p.thumbnail = await uploadToCloudinary(p.thumbnail);
    }
    if (p.featureImage && p.featureImage.startsWith('data:image/')) {
      p.featureImage = await uploadToCloudinary(p.featureImage);
    }
    
    if (p.galleryImages && Array.isArray(p.galleryImages)) {
      const urls = [];
      for (const img of p.galleryImages) {
        if (img && img.startsWith('data:image/')) {
          urls.push(await uploadToCloudinary(img));
        } else {
          urls.push(img);
        }
      }
      p.galleryImages = urls;
    }
    
    if (p.images && Array.isArray(p.images)) {
      const urls = [];
      for (const img of p.images) {
        if (img && img.startsWith('data:image/')) {
          urls.push(await uploadToCloudinary(img));
        } else {
          urls.push(img);
        }
      }
      p.images = urls;
    }
  } catch (err) {
    console.error('Error processing product images for Cloudinary:', err);
  }
  return p;
}

// Memory fallback to ensure smooth startup even if MONGODB_URI is absent
let memBrands: Brand[] = [...SEED_BRANDS];
let memCategories: Category[] = [...SEED_CATEGORIES];
let memProducts: Product[] = [...SEED_PRODUCTS];
let memBlogs: Blog[] = [...SEED_BLOGS];
let memContacts: ContactMessage[] = [
  {
    id: 'msg1',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    subject: 'Affiliate partnership query',
    message: 'Hello MotoGear Hub team, I am a retailer representing riding gear brands in South India. We would love to list our links or explore advertising options on your clean comparison grids. Keep up the good work!',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    read: false
  },
  {
    id: 'msg2',
    name: 'Sneha Patel',
    email: 'sneha.p@example.com',
    subject: 'Error in specifications for LS2 Storm',
    message: 'Hi, I noticed a minor typo in the specifications of LS2 Storm II helmet. The weight listed is 1400g, but on the official manufacturer box it lists 1490g for the medium size shell. Love the platform design though!',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    read: true
  }
];
let memSubscribers: NewsletterSubscriber[] = [
  { id: 'sub1', email: 'anilheranj812@gmail.com', subscribedAt: new Date(Date.now() - 3600000 * 12).toISOString() },
  { id: 'sub2', email: 'bikerpro@example.com', subscribedAt: new Date(Date.now() - 3600000 * 72).toISOString() }
];
let memClicks: ClickRecord[] = [
  { id: 'clk1', productId: 'p1', productName: 'MT Thunder 4 SV Solid Helmet', platform: 'amazon', url: 'https://amazon.in/dp/example1', timestamp: new Date(Date.now() - 600000).toISOString() },
  { id: 'clk2', productId: 'p1', productName: 'MT Thunder 4 SV Solid Helmet', platform: 'amazon', url: 'https://amazon.in/dp/example1', timestamp: new Date(Date.now() - 1200000).toISOString() },
  { id: 'clk3', productId: 'p4', productName: 'Cardo Packtalk Edge Bluetooth Intercom', platform: 'official', url: 'https://cardoindia.com/packtalkedge', timestamp: new Date(Date.now() - 1800000).toISOString() },
  { id: 'clk4', productId: 'p2', productName: 'Alpinestars T-GP Plus R v3 Air Jacket', platform: 'amazon', url: 'https://amazon.in/dp/example2', timestamp: new Date(Date.now() - 3600000 * 3).toISOString() },
  { id: 'clk5', productId: 'p1', productName: 'MT Thunder 4 SV Solid Helmet', platform: 'flipkart', url: 'https://flipkart.com/example1', timestamp: new Date(Date.now() - 3600000 * 5).toISOString() },
  { id: 'clk6', productId: 'p7', productName: 'Royal Enfield Nirbhay Armored Jacket', platform: 'official', url: 'https://royalenfield.com/gear/nirbhay', timestamp: new Date(Date.now() - 3600000 * 12).toISOString() },
];

// Connection & Seeding
export async function initDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn('⚠️ MONGODB_URI environment variable is missing. Running in highly durable memory-fallback mode.');
    isMongoConnected = false;
    return;
  }

  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(uri);
    isMongoConnected = true;
    console.log('🚀 Connected to MongoDB Atlas successfully!');

    // Initialize/Seed Default Data if empty
    const productCount = await MongoProduct.countDocuments();
    if (productCount === 0) {
      console.log('🌱 Seeding MongoDB with high-quality MotoGear catalog...');
      
      // Seed Categories
      for (const cat of SEED_CATEGORIES) {
        await MongoCategory.create(cat);
      }
      
      // Seed Brands
      for (const b of SEED_BRANDS) {
        await MongoBrand.create(b);
      }

      // Seed Products
      for (const p of SEED_PRODUCTS) {
        await MongoProduct.create(p);
      }

      // Seed Blogs
      for (const bl of SEED_BLOGS) {
        await MongoBlog.create(bl);
      }

      // Seed default Contacts, Newsletter and Clicks
      for (const msg of memContacts) {
        await MongoContactMessage.create(msg);
      }
      for (const sub of memSubscribers) {
        await MongoNewsletterSubscriber.create(sub);
      }
      for (const clk of memClicks) {
        await MongoClickRecord.create(clk);
      }

      console.log('🌱 MongoDB seeding completed successfully!');
    }

    // Ensure default Admin user exists in database
    const adminCount = await MongoAdmin.countDocuments();
    if (adminCount === 0) {
      const defaultUser = (process.env.ADMIN_USERNAME || 'admin').toLowerCase().trim();
      const defaultPass = process.env.ADMIN_PASSWORD || 'admin123';
      const hashedPassword = await bcrypt.hash(defaultPass, 10);
      await MongoAdmin.create({ username: defaultUser, password: hashedPassword });
      console.log(`🔐 Initialized default admin user: "${defaultUser}" in MongoDB`);
    }

  } catch (err) {
    console.error('❌ Failed to connect to MongoDB Atlas:', err);
    isMongoConnected = false;
  }
}

// Helper to sanitize Mongoose document objects to clean plain objects
const cleanObj = <T>(doc: any): T => {
  if (!doc) return null as any;
  const obj = doc.toObject ? doc.toObject() : doc;
  delete obj._id;
  delete obj.__v;
  return obj as T;
};

// Helper to populate image fallbacks
const populateImageFallbacks = (p: any): Product => {
  if (!p) return null as any;
  const images = p.images || [];
  return {
    ...p,
    primaryImage: p.primaryImage || images[0] || 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=600',
    thumbnail: p.thumbnail || images[0] || 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=200',
    galleryImages: p.galleryImages && p.galleryImages.length > 0 ? p.galleryImages : (images.length > 0 ? images : ['https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=600']),
    featureImage: p.featureImage || images[1] || images[0] || 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600',
    optional360Url: p.optional360Url || ''
  };
};

// Core db database controller matching the existing interface
export const db = {
  isMongo: () => isMongoConnected,
  isFirebase: () => false,

  // CATEGORIES
  getCategories: async (): Promise<Category[]> => {
    if (isMongoConnected) {
      const docs = await MongoCategory.find({}).sort({ name: 1 });
      return docs.map(d => cleanObj<Category>(d));
    }
    return memCategories;
  },

  createCategory: async (data: Omit<Category, 'id'>): Promise<Category> => {
    const id = 'cat_' + Date.now();
    const newCat = { ...data, id, count: 0 };
    if (isMongoConnected) {
      const created = await MongoCategory.create(newCat);
      return cleanObj<Category>(created);
    }
    memCategories.push(newCat);
    return newCat;
  },

  // BRANDS
  getBrands: async (): Promise<Brand[]> => {
    if (isMongoConnected) {
      const docs = await MongoBrand.find({}).sort({ name: 1 });
      return docs.map(d => cleanObj<Brand>(d));
    }
    return memBrands;
  },

  createBrand: async (data: Omit<Brand, 'id'>): Promise<Brand> => {
    const id = 'brand_' + Date.now();
    const newBrand = { ...data, id };
    if (isMongoConnected) {
      const created = await MongoBrand.create(newBrand);
      return cleanObj<Brand>(created);
    }
    memBrands.push(newBrand);
    return newBrand;
  },

  // PRODUCTS
  getProducts: async (): Promise<Product[]> => {
    if (isMongoConnected) {
      const docs = await MongoProduct.find({}).sort({ createdAt: -1 });
      return docs.map(d => populateImageFallbacks(cleanObj<Product>(d)));
    }
    return memProducts.map(populateImageFallbacks);
  },

  getProductBySlug: async (slug: string): Promise<Product | null> => {
    if (isMongoConnected) {
      const doc = await MongoProduct.findOne({ slug });
      return doc ? populateImageFallbacks(cleanObj<Product>(doc)) : null;
    }
    const item = memProducts.find(x => x.slug === slug);
    return item ? populateImageFallbacks(item) : null;
  },

  createProduct: async (data: Omit<Product, 'id'>): Promise<Product> => {
    const processedData = await processProductImages({ ...data });
    const discPercent = processedData.mrp > 0 ? Math.round(((processedData.mrp - processedData.price) / processedData.mrp) * 100) : 0;
    const id = 'prod_' + Date.now();
    const newProd = {
      ...processedData,
      id,
      discount: discPercent,
      rating: processedData.rating || 4.5,
      reviewCount: processedData.reviewCount || 0,
      createdDate: new Date().toISOString()
    } as Product;

    if (isMongoConnected) {
      const created = await MongoProduct.create(newProd);
      return populateImageFallbacks(cleanObj<Product>(created));
    }
    memProducts.push(newProd);
    return newProd;
  },

  updateProduct: async (id: string, data: Partial<Product>): Promise<Product | null> => {
    const processedData = await processProductImages({ ...data });
    if (isMongoConnected) {
      const oldProd = await MongoProduct.findOne({ id });
      if (oldProd) {
        if (processedData.primaryImage && oldProd.primaryImage && processedData.primaryImage !== oldProd.primaryImage) {
          await deleteFromCloudinary(oldProd.primaryImage);
        }
        if (processedData.thumbnail && oldProd.thumbnail && processedData.thumbnail !== oldProd.thumbnail) {
          await deleteFromCloudinary(oldProd.thumbnail);
        }
        if (processedData.featureImage && oldProd.featureImage && processedData.featureImage !== oldProd.featureImage) {
          await deleteFromCloudinary(oldProd.featureImage);
        }
      }
      const doc = await MongoProduct.findOneAndUpdate({ id }, { $set: processedData }, { new: true });
      return doc ? populateImageFallbacks(cleanObj<Product>(doc)) : null;
    }
    const idx = memProducts.findIndex(x => x.id === id);
    if (idx !== -1) {
      memProducts[idx] = { ...memProducts[idx], ...processedData } as Product;
      return memProducts[idx];
    }
    return null;
  },

  deleteProduct: async (id: string): Promise<boolean> => {
    if (isMongoConnected) {
      const oldProd = await MongoProduct.findOne({ id });
      if (oldProd) {
        if (oldProd.primaryImage) await deleteFromCloudinary(oldProd.primaryImage);
        if (oldProd.thumbnail) await deleteFromCloudinary(oldProd.thumbnail);
        if (oldProd.featureImage) await deleteFromCloudinary(oldProd.featureImage);
        if (oldProd.galleryImages) {
          for (const img of oldProd.galleryImages) {
            await deleteFromCloudinary(img);
          }
        }
      }
      const result = await MongoProduct.deleteOne({ id });
      return result.deletedCount > 0;
    }
    const lenBefore = memProducts.length;
    memProducts = memProducts.filter(x => x.id !== id);
    return memProducts.length < lenBefore;
  },

  // BLOGS
  getBlogs: async (): Promise<Blog[]> => {
    if (isMongoConnected) {
      const docs = await MongoBlog.find({}).sort({ createdAt: -1 });
      return docs.map(d => cleanObj<Blog>(d));
    }
    return memBlogs;
  },

  getBlogBySlug: async (slug: string): Promise<Blog | null> => {
    if (isMongoConnected) {
      const doc = await MongoBlog.findOne({ slug });
      return doc ? cleanObj<Blog>(doc) : null;
    }
    const item = memBlogs.find(x => x.slug === slug);
    return item ? item : null;
  },

  createBlog: async (data: Omit<Blog, 'id' | 'createdDate'>): Promise<Blog> => {
    const formattedDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const id = 'blog_' + Date.now();
    const newBlog = { ...data, id, createdDate: formattedDate };

    if (isMongoConnected) {
      const created = await MongoBlog.create(newBlog);
      return cleanObj<Blog>(created);
    }
    memBlogs.push(newBlog);
    return newBlog;
  },

  updateBlog: async (id: string, data: Partial<Blog>): Promise<Blog | null> => {
    if (isMongoConnected) {
      const doc = await MongoBlog.findOneAndUpdate({ id }, { $set: data }, { new: true });
      return doc ? cleanObj<Blog>(doc) : null;
    }
    const idx = memBlogs.findIndex(x => x.id === id);
    if (idx !== -1) {
      memBlogs[idx] = { ...memBlogs[idx], ...data } as Blog;
      return memBlogs[idx];
    }
    return null;
  },

  deleteBlog: async (id: string): Promise<boolean> => {
    if (isMongoConnected) {
      const result = await MongoBlog.deleteOne({ id });
      return result.deletedCount > 0;
    }
    const lenBefore = memBlogs.length;
    memBlogs = memBlogs.filter(x => x.id !== id);
    return memBlogs.length < lenBefore;
  },

  // NEWSLETTER SUBSCRIBERS
  getNewsletterSubscribers: async (): Promise<NewsletterSubscriber[]> => {
    if (isMongoConnected) {
      const docs = await MongoNewsletterSubscriber.find({}).sort({ createdAt: -1 });
      return docs.map(d => cleanObj<NewsletterSubscriber>(d));
    }
    return memSubscribers;
  },

  addNewsletterSubscriber: async (email: string): Promise<boolean> => {
    const normalizedEmail = email.trim().toLowerCase();
    const id = 'sub_' + Date.now();
    const newSub = { id, email: normalizedEmail, subscribedAt: new Date().toISOString() };

    if (isMongoConnected) {
      const existing = await MongoNewsletterSubscriber.findOne({ email: normalizedEmail });
      if (existing) return false;
      await MongoNewsletterSubscriber.create(newSub);
      return true;
    }

    const existing = memSubscribers.find(x => x.email === normalizedEmail);
    if (existing) return false;
    memSubscribers.push(newSub);
    return true;
  },

  // CONTACT MESSAGES
  getContactMessages: async (): Promise<ContactMessage[]> => {
    if (isMongoConnected) {
      const docs = await MongoContactMessage.find({}).sort({ createdAt: -1 });
      return docs.map(d => cleanObj<ContactMessage>(d));
    }
    return memContacts;
  },

  addContactMessage: async (data: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>): Promise<ContactMessage> => {
    const id = 'msg_' + Date.now();
    const newMsg: ContactMessage = {
      ...data,
      id,
      createdAt: new Date().toISOString(),
      read: false
    };

    if (isMongoConnected) {
      const created = await MongoContactMessage.create(newMsg);
      return cleanObj<ContactMessage>(created);
    }
    memContacts.unshift(newMsg);
    return newMsg;
  },

  markContactMessageRead: async (id: string): Promise<boolean> => {
    if (isMongoConnected) {
      const result = await MongoContactMessage.updateOne({ id }, { $set: { read: true } });
      return result.modifiedCount > 0;
    }
    const msg = memContacts.find(x => x.id === id);
    if (msg) {
      msg.read = true;
      return true;
    }
    return false;
  },

  // CLICK TRACKING & REDIRECT LOGGING
  trackClick: async (
    productId: string,
    platform: string,
    url: string,
    browser?: string,
    device?: string,
    referrer?: string
  ): Promise<void> => {
    const prods = await db.getProducts();
    const product = prods.find(x => x.id === productId);
    const productName = product ? product.name : 'Unknown Product';
    const id = 'click_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    const clk: any = {
      id,
      productId,
      productName,
      platform,
      url,
      timestamp: new Date().toISOString(),
      browser: browser || '',
      device: device || '',
      referrer: referrer || ''
    };

    if (isMongoConnected) {
      await MongoClickRecord.create(clk);
      return;
    }
    memClicks.unshift(clk);
  },

  getDashboardStats: async (): Promise<DashboardStats> => {
    const products = await db.getProducts();
    const blogs = await db.getBlogs();
    const subs = await db.getNewsletterSubscribers();
    const msgs = await db.getContactMessages();

    let clicks: any[] = [];
    let totalClicks = 0;

    if (isMongoConnected) {
      clicks = await MongoClickRecord.find({}).sort({ createdAt: -1 }).lean();
      totalClicks = clicks.length;
    } else {
      clicks = memClicks;
      totalClicks = memClicks.length;
    }

    const clicksByPlatform: Record<string, number> = { amazon: 0, flipkart: 0, official: 0, other: 0 };
    const prodCounts: Record<string, number> = {};

    clicks.forEach(c => {
      const plat = (c.platform || '').toLowerCase();
      if (clicksByPlatform[plat] !== undefined) {
        clicksByPlatform[plat]++;
      } else {
        clicksByPlatform.other = (clicksByPlatform.other || 0) + 1;
      }

      const pName = c.productName || 'Unknown Product';
      prodCounts[pName] = (prodCounts[pName] || 0) + 1;
    });

    const clicksByProduct = Object.entries(prodCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      totalClicks,
      totalProducts: products.length,
      totalBlogs: blogs.length,
      totalSubscribers: subs.length,
      totalMessages: msgs.length,
      clicksByPlatform,
      clicksByProduct,
      recentClicks: clicks.slice(0, 10).map(c => ({
        id: c.id,
        productName: c.productName || 'Unknown Product',
        platform: c.platform,
        timestamp: c.timestamp || c.createdAt || new Date().toISOString()
      }))
    };
  },

  verifyAdmin: async (username: string, passwordPlain: string): Promise<boolean> => {
    if (isMongoConnected) {
      const admin = await MongoAdmin.findOne({ username: username.toLowerCase().trim() });
      if (admin) {
        return bcrypt.compare(passwordPlain, admin.password);
      }
    }
    // Fallback or Seeding fallback
    const expectedUsername = (process.env.ADMIN_USERNAME || 'admin').toLowerCase().trim();
    const expectedPassword = process.env.ADMIN_PASSWORD || 'admin123';
    return username.toLowerCase().trim() === expectedUsername && passwordPlain === expectedPassword;
  }
};
