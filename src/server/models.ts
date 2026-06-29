import mongoose, { Schema, Document } from 'mongoose';
import { Product, Category, Brand, Blog, ContactMessage, ClickRecord, NewsletterSubscriber } from '../types';

// Category Schema
export interface ICategoryDoc extends Document, Omit<Category, 'id'> {
  id: string;
}
const CategorySchema = new Schema<ICategoryDoc>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  icon: { type: String, default: '' },
  count: { type: Number, default: 0 }
}, { timestamps: true });

// Brand Schema
export interface IBrandDoc extends Document, Omit<Brand, 'id'> {
  id: string;
}
const BrandSchema = new Schema<IBrandDoc>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true },
  logo: { type: String, default: '' },
  description: { type: String, default: '' },
  website: { type: String, default: '' },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

// Product Schema
export interface IProductDoc extends Document, Omit<Product, 'id'> {
  id: string;
}
const AffiliateLinkSchema = new Schema({
  platform: { type: String, required: true },
  label: { type: String, required: true },
  url: { type: String, required: true },
  price: { type: Number, required: true }
}, { _id: false });

const ProductSchema = new Schema<IProductDoc>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true },
  shortDescription: { type: String, default: '' },
  longDescription: { type: String, default: '' },
  brand: { type: String, required: true, index: true },
  category: { type: String, required: true, index: true },
  images: [{ type: String }],
  primaryImage: { type: String },
  thumbnail: { type: String },
  galleryImages: [{ type: String }],
  featureImage: { type: String },
  optional360Url: { type: String, default: '' },
  specifications: { type: Schema.Types.Mixed, default: {} },
  pros: [{ type: String }],
  cons: [{ type: String }],
  features: [{ type: String }],
  highlights: [{ type: String }],
  price: { type: Number, required: true, min: 0 },
  mrp: { type: Number, required: true, min: 0 },
  discount: { type: Number, default: 0 },
  rating: { type: Number, default: 4.5, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  affiliateLinks: [AffiliateLinkSchema],
  seoTitle: { type: String },
  seoDescription: { type: String },
  keywords: [{ type: String }],
  tags: [{ type: String }],
  featured: { type: Boolean, default: false },
  trending: { type: Boolean, default: false },
  createdDate: { type: String }
}, { timestamps: true });

// Blog Schema
export interface IBlogDoc extends Document, Omit<Blog, 'id'> {
  id: string;
}
const BlogSchema = new Schema<IBlogDoc>({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true },
  content: { type: String, required: true },
  summary: { type: String, default: '' },
  category: { type: String, required: true, index: true },
  tags: [{ type: String }],
  author: {
    name: { type: String, required: true },
    avatar: { type: String, default: '' },
    role: { type: String, default: '' }
  },
  image: { type: String, default: '' },
  readTime: { type: String, default: '5 mins' },
  createdDate: { type: String },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

// Contact Message Schema
export interface IContactDoc extends Document, Omit<ContactMessage, 'id'> {
  id: string;
}
const ContactMessageSchema = new Schema<IContactDoc>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: String },
  read: { type: Boolean, default: false }
}, { timestamps: true });

// Newsletter Subscriber Schema
export interface INewsletterDoc extends Document, Omit<NewsletterSubscriber, 'id'> {
  id: string;
}
const NewsletterSubscriberSchema = new Schema<INewsletterDoc>({
  id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  subscribedAt: { type: String }
}, { timestamps: true });

// Click Record / Affiliate Click Analytics Schema
export interface IClickDoc extends Document, Omit<ClickRecord, 'id'> {
  id: string;
  browser?: string;
  device?: string;
  referrer?: string;
}
const ClickRecordSchema = new Schema<IClickDoc>({
  id: { type: String, required: true, unique: true },
  productId: { type: String, required: true, index: true },
  productName: { type: String, required: true },
  platform: { type: String, required: true },
  url: { type: String, required: true },
  timestamp: { type: String },
  browser: { type: String, default: '' },
  device: { type: String, default: '' },
  referrer: { type: String, default: '' }
}, { timestamps: true });

// Admin Schema
const AdminSchema = new Schema({
  username: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true }
}, { timestamps: true });

// Compile Models
export const MongoCategory = (mongoose.models.Category || mongoose.model<ICategoryDoc>('Category', CategorySchema)) as mongoose.Model<ICategoryDoc>;
export const MongoBrand = (mongoose.models.Brand || mongoose.model<IBrandDoc>('Brand', BrandSchema)) as mongoose.Model<IBrandDoc>;
export const MongoProduct = (mongoose.models.Product || mongoose.model<IProductDoc>('Product', ProductSchema)) as mongoose.Model<IProductDoc>;
export const MongoBlog = (mongoose.models.Blog || mongoose.model<IBlogDoc>('Blog', BlogSchema)) as mongoose.Model<IBlogDoc>;
export const MongoContactMessage = (mongoose.models.ContactMessage || mongoose.model<IContactDoc>('ContactMessage', ContactMessageSchema)) as mongoose.Model<IContactDoc>;
export const MongoNewsletterSubscriber = (mongoose.models.NewsletterSubscriber || mongoose.model<INewsletterDoc>('NewsletterSubscriber', NewsletterSubscriberSchema)) as mongoose.Model<INewsletterDoc>;
export const MongoClickRecord = (mongoose.models.ClickRecord || mongoose.model<IClickDoc>('ClickRecord', ClickRecordSchema)) as mongoose.Model<IClickDoc>;
export const MongoAdmin = (mongoose.models.Admin || mongoose.model('Admin', AdminSchema)) as mongoose.Model<any>;
