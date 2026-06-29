/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import helmet from 'helmet';
import { initDatabase, db } from './src/server/db';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'motogear-hub-super-secret-key-2026';

// ---------------------------------------------------------------------------
// MIDDLEWARE & SECURITY CONFIGURATION
// ---------------------------------------------------------------------------

// Production HTTP headers security
app.use(helmet({
  contentSecurityPolicy: false // Disabled to support Unsplash, YouTube and development iframe integration
}));

// CORS Configuration
app.use(cors({
  origin: true, // Allow all origins for simplicity in previews
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Custom In-Memory Rate Limiter (efficient and zero package-bloat)
const ipLimits = new Map<string, { count: number; resetAt: number }>();
function rateLimiter(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip || req.headers['x-forwarded-for']?.toString() || 'unknown';
  const now = Date.now();
  const limitWindow = 60 * 1000; // 1 minute
  const maxRequests = 150; // generous 150 requests per minute
  
  const record = ipLimits.get(ip);
  if (!record || now > record.resetAt) {
    ipLimits.set(ip, { count: 1, resetAt: now + limitWindow });
    return next();
  }
  
  record.count++;
  if (record.count > maxRequests) {
    return res.status(429).json({ error: 'Too many requests from this IP. Please try again after a minute.' });
  }
  next();
}

app.use(rateLimiter);

// Request validation middlewares for input safety
function validateLogin(req: Request, res: Response, next: NextFunction) {
  const { username, password } = req.body;
  if (!username || typeof username !== 'string' || username.trim().length === 0) {
    return res.status(400).json({ error: 'Valid username is required.' });
  }
  if (!password || typeof password !== 'string' || password.length < 4) {
    return res.status(400).json({ error: 'Password must be at least 4 characters long.' });
  }
  next();
}

function validateProduct(req: Request, res: Response, next: NextFunction) {
  const { name, slug, brand, category, price, mrp } = req.body;
  if (!name || typeof name !== 'string') return res.status(400).json({ error: 'Product name is required.' });
  if (!slug || typeof slug !== 'string') return res.status(400).json({ error: 'Product SEO slug is required.' });
  if (!brand || typeof brand !== 'string') return res.status(400).json({ error: 'Product brand identifier is required.' });
  if (!category || typeof category !== 'string') return res.status(400).json({ error: 'Product category is required.' });
  if (typeof price !== 'number' || price < 0) return res.status(400).json({ error: 'Product price must be a positive number.' });
  if (typeof mrp !== 'number' || mrp < 0) return res.status(400).json({ error: 'Product MRP must be a positive number.' });
  next();
}


// ---------------------------------------------------------------------------
// AUTHENTICATION MIDDLEWARES
// ---------------------------------------------------------------------------

export interface AuthenticatedRequest extends Request {
  adminUser?: {
    username: string;
  };
}

export function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const token = req.cookies.admin_token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(418).json({ error: 'Authentication required. Admin access only.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { username: string };
    req.adminUser = { username: decoded.username };
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired admin token.' });
  }
}

// ---------------------------------------------------------------------------
// BACKEND API ROUTING
// ---------------------------------------------------------------------------

// Auth Routes
app.post('/api/auth/login', validateLogin, async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
    const isValid = await db.verifyAdmin(username, password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid admin credentials.' });
    }

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '30d' });

    // Set cookie
    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    return res.json({
      success: true,
      token,
      user: { username }
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Login failed.' });
  }
});

app.post('/api/auth/logout', (req: Request, res: Response) => {
  res.clearCookie('admin_token');
  return res.json({ success: true, message: 'Successfully logged out.' });
});

app.get('/api/auth/me', (req: Request, res: Response) => {
  const token = req.cookies.admin_token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ isAuthenticated: false });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { username: string };
    return res.json({ isAuthenticated: true, user: { username: decoded.username } });
  } catch (err) {
    return res.status(401).json({ isAuthenticated: false });
  }
});

// Category Routes
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await db.getCategories();
    res.json(categories);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/categories', requireAdmin, async (req, res) => {
  try {
    const created = await db.createCategory(req.body);
    res.status(201).json(created);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Brand Routes
app.get('/api/brands', async (req, res) => {
  try {
    const brands = await db.getBrands();
    res.json(brands);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/brands', requireAdmin, async (req, res) => {
  try {
    const created = await db.createBrand(req.body);
    res.status(201).json(created);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Product Routes
app.get('/api/products', async (req, res) => {
  try {
    const products = await db.getProducts();
    res.json(products);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/products/:slug', async (req, res) => {
  try {
    const product = await db.getProductBySlug(req.params.slug);
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    res.json(product);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/products', requireAdmin, validateProduct, async (req, res) => {
  try {
    const created = await db.createProduct(req.body);
    res.status(201).json(created);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/products/:id', requireAdmin, async (req, res) => {
  try {
    const updated = await db.updateProduct(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/products/:id', requireAdmin, async (req, res) => {
  try {
    const deleted = await db.deleteProduct(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    res.json({ success: true, message: 'Product deleted successfully.' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Blog Routes
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await db.getBlogs();
    res.json(blogs);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/blogs/:slug', async (req, res) => {
  try {
    const blog = await db.getBlogBySlug(req.params.slug);
    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found.' });
    }
    res.json(blog);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/blogs', requireAdmin, async (req, res) => {
  try {
    const created = await db.createBlog(req.body);
    res.status(201).json(created);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/blogs/:id', requireAdmin, async (req, res) => {
  try {
    const updated = await db.updateBlog(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Blog not found.' });
    }
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/blogs/:id', requireAdmin, async (req, res) => {
  try {
    const deleted = await db.deleteBlog(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Blog not found.' });
    }
    res.json({ success: true, message: 'Blog deleted successfully.' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Click Tracking Route
app.post('/api/clicks', async (req, res) => {
  const { productId, platform, url } = req.body;
  if (!productId || !platform || !url) {
    return res.status(400).json({ error: 'Missing click tracking parameters.' });
  }

  try {
    const userAgent = req.headers['user-agent'] || '';
    const referrer = req.headers['referer'] || req.headers['referrer'] || '';
    
    let browser = 'Other';
    if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Chrome') || userAgent.includes('CriOS')) browser = 'Chrome';
    else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) browser = 'Safari';
    else if (userAgent.includes('Edge') || userAgent.includes('Edg')) browser = 'Edge';

    let device = 'Desktop';
    if (/Mobi|Android|iPhone|iPad|Tablet/i.test(userAgent)) {
      device = 'Mobile';
    }

    await db.trackClick(productId, platform, url, browser, device, String(referrer));
    res.json({ success: true, message: 'Affiliate redirect click tracked successfully.' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Contact Route
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const created = await db.addContactMessage({ name, email, subject, message });
    res.status(201).json({ success: true, message: 'Message sent successfully!', data: created });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/contact/list', requireAdmin, async (req, res) => {
  try {
    const messages = await db.getContactMessages();
    res.json(messages);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/contact/:id/read', requireAdmin, async (req, res) => {
  try {
    const updated = await db.markContactMessageRead(req.params.id);
    res.json({ success: updated });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Newsletter Route
app.post('/api/newsletter/subscribe', async (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'A valid email address is required.' });
  }

  try {
    const isNew = await db.addNewsletterSubscriber(email);
    if (!isNew) {
      return res.status(200).json({ message: 'You are already subscribed to our riding newsletter!' });
    }
    res.status(201).json({ success: true, message: 'Thank you for subscribing to MotoGear Hub guides!' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/newsletter/list', requireAdmin, async (req, res) => {
  try {
    const list = await db.getNewsletterSubscribers();
    res.json(list);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// AI Chat Support Route
app.post('/api/ai-chat', async (req, res) => {
  const { message, history = [] } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  try {
    const products = await db.getProducts();
    const categories = await db.getCategories();
    const brands = await db.getBrands();

    const productsSummary = products.map((p: any) => {
      const affiliateInfo = p.affiliateLinks && p.affiliateLinks.length > 0
        ? `Prices starting at INR ${p.price} (MRP: INR ${p.mrp}, Discount: ${p.discount}%). Buy links: ${p.affiliateLinks.map((a: any) => `${a.label} (${a.platform})`).join(', ')}`
        : `Price: INR ${p.price}`;
      return `- **${p.name}** (Slug: ${p.slug}, Category: ${p.category}, Brand: ${p.brand}): ${p.shortDescription}. ${affiliateInfo}. Rating: ${p.rating}/5 (${p.reviewCount} reviews). Specs: ${Object.entries(p.specifications || {}).map(([k, v]) => `${k}: ${v}`).join(', ')}. Pros: ${p.pros.join(', ')}. Cons: ${p.cons.join(', ')}.`;
    }).join('\n');

    const categoriesSummary = categories.map((c: any) => `- ${c.name} (Slug: ${c.slug}): ${c.description}`).join('\n');
    const brandsSummary = brands.map((b: any) => `- ${b.name} (Slug: ${b.slug}): ${b.description}`).join('\n');

    const systemInstruction = `You are the ultimate luxury, premium motorcycle gear AI assistant for MotoGear Hub.
You provide professional, expert recommendations inspired by luxury brands like Ducati, Triumph, BMW Motorrad, and RevZilla.
You should:
1. Answer questions about riding gear, helmets, jackets, gloves, boots, and Bluetooth intercoms.
2. Recommend accessories based on style (e.g., street, track, touring, adventure, off-road).
3. Compare product specifications, prices, pros, and cons.
4. Suggest helmets based on the user's budget.
5. Guide users through our website pages (e.g., Home, Products, Comparison, Blogs, About, Contact).
6. Provide actual info from our catalog. Keep answers concise, direct, helpful, and free of fluff.
7. If the user asks for links, suggest using our Comparison page (#compare) or Products page (#products) or individual product slugs (e.g., #product/<slug>).
8. IMPORTANT: If you cannot answer the user's query because it is out of scope (e.g. general questions unrelated to riding gear/helmets/motorcycles), or if the user asks to submit a contact message, open a ticket, or speak to a senior rider/human, you MUST append the exact tag \`[STORE_CONTACT_REQUEST]\` at the very end of your response. Politely state that you have filed a secure ticket and a senior reviewer will follow up.

Our current categories:
${categoriesSummary}

Our premium brands:
${brandsSummary}

Our product catalog:
${productsSummary}

Provide a friendly, highly professional, premium response. Format your output nicely with clean Markdown headers, bullet points, and bold text. No marketing jargon, but with genuine motorcycle passion!`;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Graceful offline simulated fallback
      const lower = message.toLowerCase();
      let reply = "I am MotoGear's Premium AI Assistant. Currently, my live AI core is in simulation mode, but I can still help you with our gear catalog! ";
      let shouldStore = false;

      if (lower.includes('ticket') || lower.includes('human') || lower.includes('senior') || lower.includes('contact') || lower.includes('message')) {
        reply = "I understand you'd like to reach our senior reviewers directly. I've automatically created a priority ticket for you in our systems. A veteran rider will reach out to you via email shortly!";
        shouldStore = true;
      } else if (lower.includes('helmet')) {
        reply += "For helmets, I highly recommend checking out the **MT Thunder 4 SV** or **LS2 Storm II**. They offer incredible ECE 22.06 certified safety and high-speed aerodynamics. Navigate to our Products section and select Helmets to compare them!";
      } else if (lower.includes('jacket')) {
        reply += "For riding jackets, we have premium gear like the **Alpinestars T-GP Plus R v3 Air Jacket** for hot weather, or the heavy-duty **Dainese Racing 4** leather jacket. They feature Level 2 armored shoulders and elbows.";
      } else if (lower.includes('intercom') || lower.includes('cardo')) {
        reply += "For communication, the **Cardo Packtalk Edge** is the undisputed champion. It features JBL speakers and natural voice operations, supporting up to 15 riders with dynamic mesh technology.";
      } else if (lower.includes('compare')) {
        reply += "You can use our **Interactive Comparison Tool** by clicking the Compare button on any product card, then opening the compare dock! It displays detailed specifications side-by-side.";
      } else {
        reply += "We offer high-performance helmets, jackets, gloves, and intercoms from Alpinestars, Dainese, MT Helmets, LS2, and Cardo Systems. What kind of gear or budget are you looking for today?";
      }

      if (shouldStore) {
        await db.addContactMessage({
          name: 'AI Chat Guest',
          email: 'aichat@motogearhub.in',
          subject: 'Escalated from AI Chatbot Fallback',
          message: message
        });
      }

      return res.json({ reply });
    }

    const aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    // Map history to Google GenAI format
    const contents = history.map((h: any) => ({
      role: h.sender === 'user' ? 'user' : 'model',
      parts: [{ text: h.text || h.message || '' }]
    })).filter((c: any) => c.parts[0].text !== '');

    // Add current user message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.5-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    let reply = response.text || 'I am sorry, I could not generate a response right now.';
    if (reply.includes('[STORE_CONTACT_REQUEST]')) {
      reply = reply.replace('[STORE_CONTACT_REQUEST]', '').trim();
      try {
        await db.addContactMessage({
          name: 'AI Chat Guest',
          email: 'aichat@motogearhub.in',
          subject: 'Escalated from AI Chatbot',
          message: message
        });
        console.log('📝 Saved AI-escalated contact ticket in MongoDB!');
      } catch (saveErr) {
        console.error('Failed to automatically record AI escalated ticket:', saveErr);
      }
    }

    res.json({ reply });
  } catch (err: any) {
    console.error('AI Chat Error:', err);
    res.status(500).json({ error: 'Failed to process AI chat. Please try again.' });
  }
});

// ---------------------------------------------------------------------------
// GOOGLE WORKSPACE API ENDPOINTS (Sheets, Docs, Gmail, Chat)
// ---------------------------------------------------------------------------

function requireGoogleToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Google Access Token is required to complete this integration task.' });
  }
  const token = authHeader.substring(7);
  (req as any).googleToken = token;
  next();
}

// Google Sheets Catalog Sync
app.post('/api/workspace/sheets/sync', requireGoogleToken, async (req, res) => {
  const token = (req as any).googleToken;
  try {
    const products = await db.getProducts();
    const stats = await db.getDashboardStats();

    // 1. Create a fresh Google Spreadsheet
    const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        properties: {
          title: `MotoGear Hub - Premium Catalog & Analytics (${new Date().toLocaleDateString()})`
        },
        sheets: [
          { properties: { title: 'Gear Catalog' } },
          { properties: { title: 'Affiliate Analytics' } }
        ]
      })
    });

    if (!createRes.ok) {
      const errText = await createRes.text();
      return res.status(createRes.status).json({ error: `Failed to create Google Sheet: ${errText}` });
    }

    const spreadsheet = await createRes.json();
    const spreadsheetId = spreadsheet.spreadsheetId;
    const spreadsheetUrl = spreadsheet.spreadsheetUrl;

    // 2. Prepare Data for Gear Catalog sheet
    const catalogRows = [
      ['ID', 'Product Name', 'Brand', 'Category', 'Price (INR)', 'MRP (INR)', 'Rating', 'Review Count', 'Direct URL'],
      ...products.map(p => [
        p.id || '',
        p.name || '',
        p.brand || '',
        p.category || '',
        p.price || 0,
        p.mrp || 0,
        p.rating || 0,
        p.reviewCount || 0,
        p.affiliateLinks && p.affiliateLinks[0] ? p.affiliateLinks[0].url : ''
      ])
    ];

    // 3. Prepare Data for Affiliate Analytics sheet
    const analyticsRows = [
      ['Platform', 'Click Volume'],
      ['Amazon India', stats.clicksByPlatform?.amazon || 0],
      ['Flipkart', stats.clicksByPlatform?.flipkart || 0],
      ['Official Brand Store', stats.clicksByPlatform?.official || 0],
      ['Other Channels', stats.clicksByPlatform?.other || 0],
      [],
      ['Top Clicked Products', 'Redirection Clicks Count'],
      ...stats.clicksByProduct.map(p => [p.name, p.count])
    ];

    // 4. Update both sheets using append values API
    const writeCatalogRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/'Gear Catalog'!A1:append?valueInputOption=USER_ENTERED`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ values: catalogRows })
    });

    const writeAnalyticsRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/'Affiliate Analytics'!A1:append?valueInputOption=USER_ENTERED`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ values: analyticsRows })
    });

    res.json({
      success: true,
      spreadsheetId,
      spreadsheetUrl,
      message: 'Motorcycle catalog and live click analytics successfully synced to Google Sheets!'
    });
  } catch (err: any) {
    console.error('Google Sheets Sync Error:', err);
    res.status(500).json({ error: err.message || 'Failed to sync with Google Sheets' });
  }
});

// Google Docs Draft Generator
app.post('/api/workspace/docs/draft', requireGoogleToken, async (req, res) => {
  const token = (req as any).googleToken;
  const { blogId } = req.body;

  if (!blogId) {
    return res.status(400).json({ error: 'Blog post ID is required.' });
  }

  try {
    const blogs = await db.getBlogs();
    const blog = blogs.find(b => b.id === blogId);
    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found in database.' });
    }

    // 1. Create Google Doc
    const docRes = await fetch('https://docs.googleapis.com/v1/documents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: `MotoGear Hub Draft: ${blog.title}`
      })
    });

    if (!docRes.ok) {
      const errText = await docRes.text();
      return res.status(docRes.status).json({ error: `Failed to create Google Doc: ${errText}` });
    }

    const docData = await docRes.json();
    const documentId = docData.documentId;
    const documentUrl = `https://docs.google.com/document/d/${documentId}/edit`;

    // 2. Draft content of the blog post
    const textContent = [
      `TITLE: ${blog.title.toUpperCase()}`,
      `AUTHOR: ${blog.author?.name || 'MotoGear Hub Editorial Team'}`,
      `DATE: ${blog.createdDate || new Date().toLocaleDateString()}`,
      `CATEGORY: ${blog.category}`,
      `READ TIME: ${blog.readTime || '5 mins'}`,
      `TAGS: ${(blog.tags || []).join(', ')}`,
      '',
      `SUMMARY:`,
      blog.summary,
      '',
      `DRAFT ARTICLE CONTENT:`,
      blog.content,
      '',
      '---',
      '© 2026 MotoGear Hub. Exported automatically via Google Docs Workspace API.'
    ].join('\n');

    // 3. Batch update the text content
    const updateRes = await fetch(`https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        requests: [
          {
            insertText: {
              index: 1,
              text: textContent
            }
          }
        ]
      })
    });

    if (!updateRes.ok) {
      const errText = await updateRes.text();
      return res.status(updateRes.status).json({ error: `Failed to populate document text: ${errText}` });
    }

    res.json({
      success: true,
      documentId,
      documentUrl,
      message: 'Blog post draft compiled and exported to Google Docs successfully!'
    });
  } catch (err: any) {
    console.error('Google Docs Draft Error:', err);
    res.status(500).json({ error: err.message || 'Failed to draft in Google Docs' });
  }
});

// Gmail Response dispatcher
app.post('/api/workspace/gmail/send', requireGoogleToken, async (req, res) => {
  const token = (req as any).googleToken;
  const { to, subject, bodyText } = req.body;

  if (!to || !subject || !bodyText) {
    return res.status(400).json({ error: 'Recipient email (to), subject, and body text are required.' });
  }

  try {
    const rawEmail = [
      `To: ${to}`,
      `Subject: ${subject}`,
      'Content-Type: text/plain; charset=utf-8',
      'MIME-Version: 1.0',
      '',
      bodyText
    ].join('\r\n');

    const encodedEmail = Buffer.from(rawEmail)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const gmailRes = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        raw: encodedEmail
      })
    });

    if (!gmailRes.ok) {
      const errText = await gmailRes.text();
      return res.status(gmailRes.status).json({ error: `Failed to send email via Gmail: ${errText}` });
    }

    res.json({
      success: true,
      message: `Email successfully dispatched via your Gmail account to ${to}!`
    });
  } catch (err: any) {
    console.error('Gmail Sending Error:', err);
    res.status(500).json({ error: err.message || 'Failed to dispatch email via Gmail' });
  }
});

// Google Chat spaces retriever
app.get('/api/workspace/chat/spaces', requireGoogleToken, async (req, res) => {
  const token = (req as any).googleToken;
  try {
    const chatRes = await fetch('https://chat.googleapis.com/v1/spaces', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!chatRes.ok) {
      const errText = await chatRes.text();
      return res.status(chatRes.status).json({ error: `Failed to fetch Google Chat Spaces: ${errText}` });
    }

    const chatData = await chatRes.json();
    res.json(chatData.spaces || []);
  } catch (err: any) {
    console.error('Google Chat Spaces Fetch Error:', err);
    res.status(500).json({ error: err.message || 'Failed to fetch Google Chat Spaces' });
  }
});

// Google Chat Alert dispatcher
app.post('/api/workspace/chat/notify', requireGoogleToken, async (req, res) => {
  const token = (req as any).googleToken;
  const { spaceId, text } = req.body;

  if (!spaceId || !text) {
    return res.status(400).json({ error: 'Space ID and notification message text are required.' });
  }

  try {
    const chatRes = await fetch(`https://chat.googleapis.com/v1/${spaceId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: `🏍️ *MotoGear Hub Workspace Alert*\n\n${text}`
      })
    });

    if (!chatRes.ok) {
      const errText = await chatRes.text();
      return res.status(chatRes.status).json({ error: `Failed to send Google Chat message: ${errText}` });
    }

    res.json({
      success: true,
      message: 'Alert notification published to your Google Chat space successfully!'
    });
  } catch (err: any) {
    console.error('Google Chat Post Error:', err);
    res.status(500).json({ error: err.message || 'Failed to publish message to Google Chat' });
  }
});

// Analytics Route
app.get('/api/analytics', requireAdmin, async (req, res) => {
  try {
    const stats = await db.getDashboardStats();
    res.json(stats);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Global unhandled error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled server error caught:', err);
  res.status(err.status || err.statusCode || 500).json({
    error: err.message || 'An unexpected internal server error occurred.'
  });
});

// ---------------------------------------------------------------------------
// INITIALIZE AND START FULL-STACK CONTAINER
// ---------------------------------------------------------------------------

async function startServer() {
  // Connect to database (gracefully falls back to RAM database if Mongo keys are missing)
  await initDatabase();

  // Vite Integration for Hot Reload / Rendering SPA in Development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve production built bundles
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🏍️  MotoGear Hub listening at http://0.0.0.0:${PORT}`);
  });
}

startServer();
