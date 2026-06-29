/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../AppContext';
import { SEO } from '../components/SEO';
import { ImageUploader } from '../components/ImageUploader';
import { 
  Shield, 
  Lock, 
  LayoutDashboard, 
  Package, 
  FileText, 
  Mail, 
  Compass, 
  Plus, 
  Trash2, 
  Eye, 
  TrendingUp, 
  Users, 
  LogOut, 
  CheckCircle,
  X,
  AlertTriangle,
  BookmarkCheck,
  Sparkles,
  FileSpreadsheet,
  Send,
  MessageSquare,
  Loader2,
  ExternalLink
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    isAdmin,
    adminToken,
    setAdminLoggedIn,
    products,
    categories,
    blogs,
    refreshData,
    googleUser,
    googleToken,
    loginWithGoogle,
    logoutFromGoogle
  } = useApp();

  // Login Form States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Dashboard Active Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'blogs' | 'messages' | 'newsletter'>('overview');

  // Dashboard Aggregated Stats state
  const [stats, setStats] = useState<any>(null);
  const [statsLoading, setStatsLoading] = useState(false);

  // Entity Lists State
  const [contacts, setContacts] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);

  // Modals for adding products/blogs
  const [showProductModal, setShowProductModal] = useState(false);
  const [showBlogModal, setShowBlogModal] = useState(false);

  // New Product Form States
  const [newProdName, setNewProdName] = useState('');
  const [newProdBrand, setNewProdBrand] = useState('mt-helmets');
  const [newProdCat, setNewProdCat] = useState('helmet');
  const [newProdPrice, setNewProdPrice] = useState(6000);
  const [newProdMrp, setNewProdMrp] = useState(7500);
  const [newProdShortDesc, setNewProdShortDesc] = useState('');
  const [newProdLongDesc, setNewProdLongDesc] = useState('');
  const [newProdImg, setNewProdImg] = useState('https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=600');
  
  // Premium Image Fields
  const [newProdPrimaryImg, setNewProdPrimaryImg] = useState('');
  const [newProdThumbnail, setNewProdThumbnail] = useState('');
  const [newProdGallery, setNewProdGallery] = useState<string[]>([]);
  const [newProdFeatureImg, setNewProdFeatureImg] = useState('');
  const [newProd360Url, setNewProd360Url] = useState('');

  // Sizing & Stock Fields
  const [newProdStockStatus, setNewProdStockStatus] = useState<'In Stock' | 'Out of Stock' | 'Coming Soon'>('In Stock');
  const [newProdRating, setNewProdRating] = useState(4.5);

  // Specifications, Features, Pros, Cons
  const [newProdSpecMaterial, setNewProdSpecMaterial] = useState('HIRP / High-Performance Polycarbonate');
  const [newProdSpecSafety, setNewProdSpecSafety] = useState('ECE 22.06 & ISI Vetted');
  const [newProdSpecClosure, setNewProdSpecClosure] = useState('Micrometric Metal Buckle');
  const [newProdSpecWeight, setNewProdSpecWeight] = useState('1500 grams');
  const [newProdFeatures, setNewProdFeatures] = useState('Pinlock anti-fog lens compatible, Removable sweat-free padding');
  const [newProdPros, setNewProdPros] = useState('ECE 22.06 certified safety rating, Optimized aerodynamics');
  const [newProdCons, setNewProdCons] = useState('Slightly noisy above 110 km/h');

  // Affiliate & SEO
  const [newProdAmazon, setNewProdAmazon] = useState('https://amazon.in/dp/custom');
  const [newProdFlipkart, setNewProdFlipkart] = useState('https://flipkart.com/custom');
  const [newProdSeoTitle, setNewProdSeoTitle] = useState('');
  const [newProdSeoDesc, setNewProdSeoDesc] = useState('');
  const [newProdSeoKeywords, setNewProdSeoKeywords] = useState('');

  // New Blog Form States
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogCat, setNewBlogCat] = useState('Safety');
  const [newBlogSummary, setNewBlogSummary] = useState('');
  const [newBlogContent, setNewBlogContent] = useState('');
  const [newBlogImg, setNewBlogImg] = useState('https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=600');

  // Google Workspace Integration States
  const [sheetsSyncLoading, setSheetsSyncLoading] = useState(false);
  const [sheetsSyncResult, setSheetsSyncResult] = useState<{ url: string; msg: string } | null>(null);

  const [chatSpaces, setChatSpaces] = useState<any[]>([]);
  const [chatSpacesLoading, setChatSpacesLoading] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState('');
  const [chatAlertText, setChatAlertText] = useState('New high-performance riding helmet added to the catalog! Check specifications.');
  const [chatStatus, setChatStatus] = useState<string | null>(null);
  const [chatLoading, setChatLoading] = useState(false);

  const [gmailTo, setGmailTo] = useState('');
  const [gmailSubject, setGmailSubject] = useState('Special Offer from MotoGear Hub 🏍️');
  const [gmailBody, setGmailBody] = useState('Hi Rider,\n\nThank you for choosing MotoGear Hub as your trusted partner for premium protective motorcycle gear reviews and direct affiliate deals.\n\nRide safe!');
  const [gmailStatus, setGmailStatus] = useState<string | null>(null);
  const [gmailLoading, setGmailLoading] = useState(false);

  const [docsDraftingMap, setDocsDraftingMap] = useState<Record<string, { loading: boolean; url?: string; error?: string }>>({});

  // Sync Google Sheets Handler
  const handleSheetsSync = async () => {
    if (!googleToken) return;
    try {
      setSheetsSyncLoading(true);
      setSheetsSyncResult(null);
      const res = await fetch('/api/workspace/sheets/sync', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${googleToken}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSheetsSyncResult({ url: data.spreadsheetUrl, msg: data.message });
      } else {
        alert(data.error || 'Failed to sync with Google Sheets.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error during Google Sheets synchronization.');
    } finally {
      setSheetsSyncLoading(false);
    }
  };

  // Fetch Chat Spaces Handler
  const fetchChatSpaces = async () => {
    if (!googleToken) return;
    try {
      setChatSpacesLoading(true);
      const res = await fetch('/api/workspace/chat/spaces', {
        headers: { 'Authorization': `Bearer ${googleToken}` }
      });
      const data = await res.json();
      if (res.ok && Array.isArray(data)) {
        setChatSpaces(data);
        if (data.length > 0) {
          setSelectedSpace(data[0].name);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setChatSpacesLoading(false);
    }
  };

  // Trigger loading of Chat spaces on token availability
  useEffect(() => {
    if (googleToken) {
      fetchChatSpaces();
    }
  }, [googleToken]);

  // Send Google Chat Alert
  const handleSendChatAlert = async () => {
    if (!googleToken || !selectedSpace || !chatAlertText) return;
    try {
      setChatLoading(true);
      setChatStatus(null);
      const res = await fetch('/api/workspace/chat/notify', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${googleToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          spaceId: selectedSpace,
          text: chatAlertText
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setChatStatus('Success! Alert successfully delivered to Google Chat Space.');
        setTimeout(() => setChatStatus(null), 5000);
      } else {
        setChatStatus(`Error: ${data.error || 'Failed to dispatch Chat notification'}`);
      }
    } catch (err: any) {
      setChatStatus(`Network Error: ${err.message}`);
    } finally {
      setChatLoading(false);
    }
  };

  // Send Gmail Message
  const handleSendGmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleToken || !gmailTo || !gmailSubject || !gmailBody) return;
    try {
      setGmailLoading(true);
      setGmailStatus(null);
      const res = await fetch('/api/workspace/gmail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${googleToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: gmailTo,
          subject: gmailSubject,
          bodyText: gmailBody
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setGmailStatus('Success! Email successfully sent from your inbox.');
        setGmailTo('');
        setTimeout(() => setGmailStatus(null), 5000);
      } else {
        setGmailStatus(`Error: ${data.error || 'Failed to send email'}`);
      }
    } catch (err: any) {
      setGmailStatus(`Network Error: ${err.message}`);
    } finally {
      setGmailLoading(false);
    }
  };

  // Draft Docs Blog Draft
  const handleCreateDocDraft = async (blogId: string) => {
    if (!googleToken) return;
    try {
      setDocsDraftingMap(prev => ({ ...prev, [blogId]: { loading: true } }));
      const res = await fetch('/api/workspace/docs/draft', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${googleToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ blogId })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setDocsDraftingMap(prev => ({
          ...prev,
          [blogId]: { loading: false, url: data.documentUrl }
        }));
      } else {
        setDocsDraftingMap(prev => ({
          ...prev,
          [blogId]: { loading: false, error: data.error || 'Failed to create Google Doc' }
        }));
      }
    } catch (err: any) {
      setDocsDraftingMap(prev => ({
        ...prev,
        [blogId]: { loading: false, error: err.message }
      }));
    }
  };

  // Load stats and lists once logged in
  const loadStatsAndLists = async () => {
    if (!isAdmin) return;
    try {
      setStatsLoading(true);
      const headers: any = { 'Content-Type': 'application/json' };
      if (adminToken) headers['Authorization'] = `Bearer ${adminToken}`;

      const [resStats, resContacts, resSubs] = await Promise.all([
        fetch('/api/analytics', { headers }).then(r => r.json()),
        fetch('/api/contact/list', { headers }).then(r => r.json()),
        fetch('/api/newsletter/list', { headers }).then(r => r.json())
      ]);

      if (resStats && !resStats.error) setStats(resStats);
      if (Array.isArray(resContacts)) setContacts(resContacts);
      if (Array.isArray(resSubs)) setSubscribers(resSubs);
    } catch (err) {
      console.error(err);
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadStatsAndLists();
    }
  }, [isAdmin, activeTab]);

  // Handle Admin Auth
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    try {
      setLoginLoading(true);
      setLoginError('');
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        setAdminLoggedIn(data.token);
      } else {
        setLoginError(data.error || 'Invalid username or password.');
      }
    } catch (err) {
      setLoginError('Server authentication failed.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Mark message as read
  const markAsRead = async (id: string) => {
    try {
      const headers: any = {};
      if (adminToken) headers['Authorization'] = `Bearer ${adminToken}`;

      await fetch(`/api/contact/${id}/read`, {
        method: 'PUT',
        headers
      });
      loadStatsAndLists();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete product
  const deleteProductItem = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product listing? This action cannot be undone.')) return;
    try {
      const headers: any = {};
      if (adminToken) headers['Authorization'] = `Bearer ${adminToken}`;

      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers
      });
      if (res.ok) {
        refreshData();
        loadStatsAndLists();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Blog
  const deleteBlogItem = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    try {
      const headers: any = {};
      if (adminToken) headers['Authorization'] = `Bearer ${adminToken}`;

      const res = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
        headers
      });
      if (res.ok) {
        refreshData();
        loadStatsAndLists();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Add Product Submit
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdShortDesc || !newProdLongDesc) return;

    const slug = newProdName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const headers: any = { 'Content-Type': 'application/json' };
    if (adminToken) headers['Authorization'] = `Bearer ${adminToken}`;

    const parseCommaList = (str: string) => str.split(',').map(s => s.trim()).filter(Boolean);

    const newProd = {
      name: newProdName,
      slug,
      shortDescription: newProdShortDesc,
      longDescription: newProdLongDesc,
      brand: newProdBrand,
      category: newProdCat,
      images: [newProdPrimaryImg || newProdImg, ...newProdGallery],
      primaryImage: newProdPrimaryImg || newProdImg,
      thumbnail: newProdThumbnail || newProdImg,
      galleryImages: newProdGallery.length > 0 ? newProdGallery : [newProdImg],
      featureImage: newProdFeatureImg || newProdImg,
      optional360Url: newProd360Url,
      specifications: {
        'Material Frame': newProdSpecMaterial,
        'Safety Rating': newProdSpecSafety,
        'Closure Style': newProdSpecClosure,
        'Weight Factor': newProdSpecWeight
      },
      pros: parseCommaList(newProdPros),
      cons: parseCommaList(newProdCons),
      features: parseCommaList(newProdFeatures),
      highlights: [newProdSpecSafety, 'Premium comfort liner'],
      price: Number(newProdPrice),
      mrp: Number(newProdMrp),
      rating: Number(newProdRating),
      stockStatus: newProdStockStatus,
      affiliateLinks: [
        { platform: 'amazon', label: 'Check price on Amazon', url: newProdAmazon, price: Number(newProdPrice) },
        { platform: 'flipkart', label: 'Buy on Flipkart', url: newProdFlipkart, price: Number(newProdPrice) + 150 }
      ],
      seoTitle: newProdSeoTitle || `${newProdName} - Premium Review & Comparison`,
      seoDescription: newProdSeoDesc || `${newProdShortDesc}`,
      keywords: parseCommaList(newProdSeoKeywords || `${newProdName}, ${newProdBrand}, motorcycle gear`)
    };

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers,
        body: JSON.stringify(newProd)
      });
      if (res.ok) {
        setShowProductModal(false);
        setNewProdName('');
        setNewProdShortDesc('');
        setNewProdLongDesc('');
        setNewProdPrimaryImg('');
        setNewProdThumbnail('');
        setNewProdGallery([]);
        setNewProdFeatureImg('');
        setNewProd360Url('');
        setNewProdSeoTitle('');
        setNewProdSeoDesc('');
        setNewProdSeoKeywords('');
        refreshData();
        loadStatsAndLists();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Add Blog Submit
  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlogTitle || !newBlogSummary || !newBlogContent) return;

    const slug = newBlogTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const headers: any = { 'Content-Type': 'application/json' };
    if (adminToken) headers['Authorization'] = `Bearer ${adminToken}`;

    const newBlog = {
      title: newBlogTitle,
      slug,
      summary: newBlogSummary,
      content: newBlogContent,
      category: newBlogCat,
      tags: ['Safety', 'Riding Tips', 'Guides'],
      image: newBlogImg,
      readTime: '4 mins read',
      author: {
        name: 'Senior Reviewer Desk',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
        role: 'Veteran Motorcyclist'
      }
    };

    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers,
        body: JSON.stringify(newBlog)
      });
      if (res.ok) {
        setShowBlogModal(false);
        setNewBlogTitle('');
        setNewBlogSummary('');
        setNewBlogContent('');
        refreshData();
        loadStatsAndLists();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // RENDER ADMIN LOGIN IF NOT AUTHENTICATED
  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 fade-in">
        <SEO title="Administrative Gateway" description="Security checkpoint for administrative access." />
        
        <div className="bg-white dark:bg-slate-900 border border-slate-200/10 dark:border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          {/* Accent decoration */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-600 to-amber-500" />
          
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/20 text-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Lock className="w-5 h-5 animate-pulse" />
            </div>
            <h1 className="font-display font-bold text-xl text-slate-900 dark:text-white leading-tight">Admin Gateway</h1>
            <p className="text-[11px] text-slate-500 mt-1 uppercase font-mono">MotoGear Hub Secure Checkpoint</p>
          </div>

          {loginError && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl text-xs mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono uppercase text-slate-400">Username</label>
              <input
                type="text"
                required
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="px-4 py-2 text-xs bg-slate-100 dark:bg-slate-950/60 border border-slate-200/20 rounded-xl focus:outline-none focus:border-orange-500 text-slate-800 dark:text-white"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono uppercase text-slate-400">Password</label>
              <input
                type="password"
                required
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-2 text-xs bg-slate-100 dark:bg-slate-950/60 border border-slate-200/20 rounded-xl focus:outline-none focus:border-orange-500 text-slate-800 dark:text-white"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-orange-500/20 transition-colors cursor-pointer flex items-center justify-center gap-1.5 mt-2"
            >
              <Shield className="w-3.5 h-3.5" /> <span>{loginLoading ? 'Verifying Gateway...' : 'Unlock Dashboard'}</span>
            </button>
          </form>

          <div className="mt-6 border-t border-slate-200/10 pt-4 text-[10px] text-slate-500 font-mono text-center">
            🔒 IP recorded for compliance auditing.
          </div>
        </div>
      </div>
    );
  }

  // RENDER COMPLETE ADMIN DASHBOARD
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 fade-in">
      <SEO title="Administrative Management Console" description="Full-stack administrative interface." />

      {/* DASHBOARD HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 border-b border-slate-200/10 dark:border-white/5 pb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/30 text-orange-500 rounded-2xl flex items-center justify-center">
            <LayoutDashboard className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-slate-900 dark:text-white leading-tight">Admin Console</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] text-slate-400 font-mono uppercase">Full-Stack Database Online</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setAdminLoggedIn(null)}
          className="px-4 py-2 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl text-xs font-semibold hover:bg-rose-500 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
        >
          <LogOut className="w-4 h-4" /> <span>Sign Out</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* SIDE BAR NAVIGATION TABS (Col 3) */}
        <nav className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200/10 dark:border-white/5 p-4 rounded-3xl flex flex-col gap-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-3 cursor-pointer ${
              activeTab === 'overview' ? 'bg-orange-500 text-white shadow-lg' : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400'
            }`}
          >
            <Compass className="w-4 h-4" /> Overview & Clicks
          </button>
          
          <button
            onClick={() => setActiveTab('products')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-3 cursor-pointer ${
              activeTab === 'products' ? 'bg-orange-500 text-white shadow-lg' : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400'
            }`}
          >
            <Package className="w-4 h-4" /> Manage Products ({products.length})
          </button>

          <button
            onClick={() => setActiveTab('blogs')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-3 cursor-pointer ${
              activeTab === 'blogs' ? 'bg-orange-500 text-white shadow-lg' : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400'
            }`}
          >
            <FileText className="w-4 h-4" /> Manage Blogs ({blogs.length})
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-3 cursor-pointer ${
              activeTab === 'messages' ? 'bg-orange-500 text-white shadow-lg' : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400'
            }`}
          >
            <Mail className="w-4 h-4" /> Messages ({contacts.length})
          </button>

          <button
            onClick={() => setActiveTab('newsletter')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-3 cursor-pointer ${
              activeTab === 'newsletter' ? 'bg-orange-500 text-white shadow-lg' : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400'
            }`}
          >
            <Users className="w-4 h-4" /> Newsletter Subscribers ({subscribers.length})
          </button>
        </nav>

        {/* TAB WORKSPACE (Col 9) */}
        <main className="lg:col-span-9 flex flex-col gap-6">
          
          {/* TAB 1: OVERVIEW & ANALYTICS CLICK STREAMS */}
          {activeTab === 'overview' && stats && (
            <div className="flex flex-col gap-6 fade-in">
              {/* Stats bento grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200/10 dark:border-white/5 rounded-2xl">
                  <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1">Affiliate Outgoing Clicks</span>
                  <span className="block font-display font-bold text-2xl text-slate-900 dark:text-white">{stats.totalClicks}</span>
                </div>
                <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200/10 dark:border-white/5 rounded-2xl">
                  <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1">Subscribed Emails</span>
                  <span className="block font-display font-bold text-2xl text-slate-900 dark:text-white">{stats.totalSubscribers}</span>
                </div>
                <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200/10 dark:border-white/5 rounded-2xl">
                  <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1">User Messages</span>
                  <span className="block font-display font-bold text-2xl text-slate-900 dark:text-white">{stats.totalMessages}</span>
                </div>
                <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200/10 dark:border-white/5 rounded-2xl">
                  <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1">Vetted Listings</span>
                  <span className="block font-display font-bold text-2xl text-slate-900 dark:text-white">{stats.totalProducts}</span>
                </div>
              </div>

              {/* Click aggregates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Platform aggregation */}
                <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/10 dark:border-white/5 rounded-3xl">
                  <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white mb-4">Click Outgoings By Affiliate Store</h4>
                  <div className="flex flex-col gap-3">
                    {Object.entries(stats.clicksByPlatform).map(([plat, count]: any) => (
                      <div key={plat} className="flex flex-col gap-1 text-xs">
                        <div className="flex justify-between font-semibold">
                          <span className="uppercase font-mono text-[10px] text-slate-400">{plat}</span>
                          <span className="text-slate-900 dark:text-white">{count} clicks</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-orange-500 h-full animate-pulse" style={{ width: `${stats.totalClicks > 0 ? (count / stats.totalClicks) * 100 : 0}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top compared/clicked products */}
                <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/10 dark:border-white/5 rounded-3xl">
                  <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white mb-4">Top Clicked Gear Listings</h4>
                  <div className="flex flex-col gap-3.5">
                    {stats.clicksByProduct.map((prod: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2 truncate">
                          <span className="font-bold text-orange-500 font-mono">#{idx+1}</span>
                          <span className="truncate font-semibold text-slate-700 dark:text-slate-300">{prod.name}</span>
                        </div>
                        <span className="font-mono text-[11px] bg-white/5 border border-white/5 px-2 py-0.5 rounded-lg text-slate-300 font-bold">{prod.count} clicks</span>
                      </div>
                    ))}
                    {stats.clicksByProduct.length === 0 && (
                      <div className="text-slate-500 text-xs py-10 text-center">No affiliate clicks recorded yet.</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Click audit stream log */}
              <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/10 dark:border-white/5 rounded-3xl">
                <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white mb-4">Live Click Auditing Stream (Max 10)</h4>
                <div className="flex flex-col gap-2.5">
                  {stats.recentClicks.map((c: any) => (
                    <div key={c.id} className="p-3 bg-slate-100/50 dark:bg-slate-950/60 rounded-xl border border-slate-200/5 dark:border-white/5 flex justify-between text-[11px] gap-4">
                      <div className="truncate">
                        <span className="font-bold text-slate-800 dark:text-white">{c.productName}</span>
                        <span className="text-slate-500 text-[10px] block font-mono">Clicked for redirect on {c.platform.toUpperCase()}</span>
                      </div>
                      <span className="font-mono text-slate-400 shrink-0 text-right">{new Date(c.timestamp).toLocaleTimeString()}</span>
                    </div>
                  ))}
                  {stats.recentClicks.length === 0 && (
                    <div className="text-slate-500 text-xs py-10 text-center">Audit stream waiting for rider click triggers.</div>
                  )}
                </div>
              </div>

              {/* -------------------------------------------------------- */}
              {/* GOOGLE WORKSPACE INTEGRATION CONTROL CENTER */}
              {/* -------------------------------------------------------- */}
              <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/10 dark:border-white/5 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/10 pb-6 mb-6">
                  <div>
                    <h4 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-orange-500" /> Google Workspace Power Integrations
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">Connect your Google Account to manage Sheets, Gmail, Chat spaces and Doc compilers.</p>
                  </div>

                  <div>
                    {googleUser ? (
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="block text-[11px] font-bold text-slate-900 dark:text-white">{googleUser.displayName || 'Authorized Admin'}</span>
                          <span className="block text-[10px] font-mono text-slate-500">{googleUser.email}</span>
                        </div>
                        <button
                          onClick={logoutFromGoogle}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 rounded-xl text-[10px] font-mono font-bold transition-all cursor-pointer border border-slate-200/10"
                        >
                          Disconnect
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={loginWithGoogle}
                        className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-orange-500/15 cursor-pointer"
                      >
                        <Lock className="w-3.5 h-3.5" /> <span>Connect Google Account</span>
                      </button>
                    )}
                  </div>
                </div>

                {!googleUser ? (
                  <div className="p-8 text-center bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-dashed border-slate-200/20">
                    <Shield className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                    <h5 className="font-bold text-xs text-slate-800 dark:text-slate-300">Workspace Integrations Offline</h5>
                    <p className="text-[11px] text-slate-500 max-w-sm mx-auto mt-1">
                      Authorize access to enable premium features like automatic spreadsheet syncs, instant blog draft document creation, and custom chat alerts.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                    {/* CARD 1: GOOGLE SHEETS */}
                    <div className="p-5 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-200/10 dark:border-white/5 flex flex-col justify-between">
                      <div>
                        <div className="w-9 h-9 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-xl flex items-center justify-center mb-3">
                          <FileSpreadsheet className="w-4 h-4" />
                        </div>
                        <h5 className="font-bold text-xs text-slate-900 dark:text-white">Motorcycle Catalog Exporter</h5>
                        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                          Generates a live multi-tab Google Spreadsheet capturing all {products.length} listed gear review specs and live comparison click analytics.
                        </p>
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-200/10">
                        {sheetsSyncResult && (
                          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-lg text-[10px] mb-3 flex flex-col gap-1">
                            <span className="font-bold">Sync Completed!</span>
                            <a
                              href={sheetsSyncResult.url}
                              target="_blank"
                              rel="noreferrer"
                              className="font-mono underline flex items-center gap-1 hover:text-emerald-400"
                            >
                              Open spreadsheet <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}
                        <button
                          onClick={handleSheetsSync}
                          disabled={sheetsSyncLoading}
                          className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        >
                          {sheetsSyncLoading ? (
                            <>
                              <Loader2 className="w-3 h-3 animate-spin" />
                              <span>Syncing Catalog...</span>
                            </>
                          ) : (
                            <span>Export Live to Sheets</span>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* CARD 2: GOOGLE CHAT */}
                    <div className="p-5 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-200/10 dark:border-white/5 flex flex-col justify-between">
                      <div>
                        <div className="w-9 h-9 bg-blue-500/10 border border-blue-500/20 text-blue-500 rounded-xl flex items-center justify-center mb-3">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <h5 className="font-bold text-xs text-slate-900 dark:text-white">Rider Notification Center</h5>
                        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                          Publish real-time safety advisories, promotional gear discounts, and stock alerts to your team Google Chat space.
                        </p>

                        <div className="flex flex-col gap-2 mt-3">
                          <label className="text-[10px] font-mono uppercase text-slate-400">Target Chat Space</label>
                          {chatSpacesLoading ? (
                            <span className="text-[10px] font-mono text-slate-400">Retrieving Spaces...</span>
                          ) : chatSpaces.length > 0 ? (
                            <select
                              value={selectedSpace}
                              onChange={(e) => setSelectedSpace(e.target.value)}
                              className="px-3 py-1.5 text-[11px] bg-slate-100 dark:bg-slate-950 border border-slate-200/10 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                            >
                              {chatSpaces.map((space) => (
                                <option key={space.name} value={space.name}>
                                  {space.displayName || space.name.replace('spaces/', 'Space ')}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <span className="text-[10px] font-mono text-slate-500 bg-white/5 p-1 rounded">No chat spaces discovered</span>
                          )}

                          <label className="text-[10px] font-mono uppercase text-slate-400 mt-1">Notification Body</label>
                          <textarea
                            rows={2}
                            value={chatAlertText}
                            onChange={(e) => setChatAlertText(e.target.value)}
                            className="px-3 py-1.5 text-[11px] bg-slate-100 dark:bg-slate-950 border border-slate-200/10 rounded-lg text-slate-800 dark:text-slate-200 resize-none focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-200/10">
                        {chatStatus && (
                          <div className={`p-2 rounded-lg text-[10px] mb-3 ${chatStatus.startsWith('Error') ? 'bg-rose-500/10 text-rose-500' : 'bg-blue-500/10 text-blue-500'}`}>
                            {chatStatus}
                          </div>
                        )}
                        <button
                          onClick={handleSendChatAlert}
                          disabled={chatLoading || chatSpaces.length === 0}
                          className="w-full py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        >
                          {chatLoading ? (
                            <>
                              <Loader2 className="w-3 h-3 animate-spin" />
                              <span>Dispatching Alert...</span>
                            </>
                          ) : (
                            <span>Publish Space Notice</span>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* CARD 3: GMAIL DISPATCH */}
                    <div className="p-5 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-200/10 dark:border-white/5 flex flex-col justify-between">
                      <form onSubmit={handleSendGmail} className="flex flex-col h-full justify-between">
                        <div>
                          <div className="w-9 h-9 bg-orange-500/10 border border-orange-500/20 text-orange-500 rounded-xl flex items-center justify-center mb-3">
                            <Mail className="w-4 h-4" />
                          </div>
                          <h5 className="font-bold text-xs text-slate-900 dark:text-white">Gmail Admin Dispatcher</h5>
                          
                          <div className="flex flex-col gap-2 mt-3">
                            <div className="flex flex-col gap-1">
                              <label className="text-[10px] font-mono uppercase text-slate-400">Recipient Email</label>
                              <input
                                type="email"
                                required
                                placeholder="recipient@example.com"
                                value={gmailTo}
                                onChange={(e) => setGmailTo(e.target.value)}
                                className="px-3 py-1 bg-slate-100 dark:bg-slate-950 border border-slate-200/10 rounded-lg text-[11px] focus:outline-none focus:border-orange-500"
                              />
                            </div>

                            <div className="flex flex-col gap-1">
                              <label className="text-[10px] font-mono uppercase text-slate-400">Subject</label>
                              <input
                                type="text"
                                required
                                value={gmailSubject}
                                onChange={(e) => setGmailSubject(e.target.value)}
                                className="px-3 py-1 bg-slate-100 dark:bg-slate-950 border border-slate-200/10 rounded-lg text-[11px] focus:outline-none focus:border-orange-500"
                              />
                            </div>

                            <div className="flex flex-col gap-1">
                              <label className="text-[10px] font-mono uppercase text-slate-400">Message</label>
                              <textarea
                                rows={2}
                                required
                                value={gmailBody}
                                onChange={(e) => setGmailBody(e.target.value)}
                                className="px-3 py-1 bg-slate-100 dark:bg-slate-950 border border-slate-200/10 rounded-lg text-[11px] resize-none focus:outline-none focus:border-orange-500"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-200/10">
                          {gmailStatus && (
                            <div className={`p-2 rounded-lg text-[10px] mb-3 ${gmailStatus.startsWith('Error') ? 'bg-rose-500/10 text-rose-500' : 'bg-orange-500/10 text-orange-500'}`}>
                              {gmailStatus}
                            </div>
                          )}
                          <button
                            type="submit"
                            disabled={gmailLoading}
                            className="w-full py-2 bg-orange-600 hover:bg-orange-500 disabled:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                          >
                            {gmailLoading ? (
                              <>
                                <Loader2 className="w-3 h-3 animate-spin" />
                                <span>Sending Email...</span>
                              </>
                            ) : (
                              <span>Dispatch Direct Mail</span>
                            )}
                          </button>
                        </div>
                      </form>
                    </div>

                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: MANAGE PRODUCTS */}
          {activeTab === 'products' && (
            <div className="flex flex-col gap-4 fade-in">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Active Catalog Listings</h3>
                <button
                  onClick={() => setShowProductModal(true)}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add Gear Listing
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {products.map(item => (
                  <div 
                    key={item.id}
                    className="p-4 bg-white dark:bg-slate-900 border border-slate-200/10 dark:border-white/5 rounded-2xl flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <img src={item.images[0]} alt="" className="w-12 h-12 object-cover rounded-lg shrink-0" />
                      <div className="truncate">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">{item.name}</h4>
                        <span className="text-[10px] font-mono text-slate-500 uppercase">{item.brand} • {item.category}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <span className="font-mono text-xs font-bold text-orange-500">₹{item.price.toLocaleString()}</span>
                      <button
                        onClick={() => deleteProductItem(item.id)}
                        className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all cursor-pointer"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: MANAGE BLOGS */}
          {activeTab === 'blogs' && (
            <div className="flex flex-col gap-4 fade-in">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Research & Guide Articles</h3>
                <button
                  onClick={() => setShowBlogModal(true)}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add Guide Post
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {blogs.map(item => (
                  <div 
                    key={item.id}
                    className="p-4 bg-white dark:bg-slate-900 border border-slate-200/10 dark:border-white/5 rounded-2xl flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <img src={item.image} alt="" className="w-12 h-12 object-cover rounded-lg shrink-0" />
                      <div className="truncate">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">{item.title}</h4>
                        <span className="text-[10px] font-mono text-slate-500 uppercase">{item.category} • {item.readTime}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {googleToken && (
                        <>
                          {docsDraftingMap[item.id]?.url ? (
                            <a
                              href={docsDraftingMap[item.id].url}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2.5 py-1.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-xl text-[10px] font-bold flex items-center gap-1 hover:bg-emerald-500 hover:text-white transition-all"
                            >
                              Open Doc <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <button
                              onClick={() => handleCreateDocDraft(item.id)}
                              disabled={docsDraftingMap[item.id]?.loading}
                              className="px-2.5 py-1.5 bg-slate-100 dark:bg-white/5 border border-slate-200/10 hover:border-orange-500 text-slate-800 dark:text-slate-200 rounded-xl text-[10px] font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:bg-slate-800"
                            >
                              {docsDraftingMap[item.id]?.loading ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <FileText className="w-3 h-3" />
                              )}
                              <span>Draft in Docs</span>
                            </button>
                          )}
                        </>
                      )}

                      <button
                        onClick={() => deleteBlogItem(item.id)}
                        className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: MESSAGES */}
          {activeTab === 'messages' && (
            <div className="flex flex-col gap-4 fade-in">
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Rider Inquiries</h3>
              
              <div className="flex flex-col gap-4">
                {contacts.map((msg: any) => (
                  <div 
                    key={msg.id}
                    className={`p-6 bg-white dark:bg-slate-900 border border-slate-200/10 dark:border-white/5 rounded-3xl relative overflow-hidden ${
                      !msg.read ? 'border-l-4 border-l-orange-500' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-none mb-1">{msg.name}</h4>
                        <span className="text-[10px] text-slate-500 font-mono">{msg.email}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{new Date(msg.createdAt).toLocaleDateString()}</span>
                    </div>

                    <div className="p-3 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200/5 text-xs text-slate-700 dark:text-slate-300 mb-3 font-semibold">
                      Subject: {msg.subject}
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                      {msg.message}
                    </p>

                    {!msg.read && (
                      <button
                        onClick={() => markAsRead(msg.id)}
                        className="mt-4 px-3 py-1 bg-orange-600/10 hover:bg-orange-600 text-orange-500 hover:text-white border border-orange-500/20 rounded-xl text-[10px] font-bold transition-all cursor-pointer"
                      >
                        Mark as Read
                      </button>
                    )}
                  </div>
                ))}
                {contacts.length === 0 && (
                  <div className="text-slate-500 text-xs py-10 text-center bg-white dark:bg-slate-900 rounded-3xl">No rider messages recorded.</div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: NEWSLETTER LIST */}
          {activeTab === 'newsletter' && (
            <div className="flex flex-col gap-4 fade-in">
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white font-semibold">Newsletter Audience</h3>
              
              <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/10 dark:border-white/5 rounded-3xl">
                <div className="flex flex-col gap-2">
                  {subscribers.map((sub: any) => (
                    <div key={sub.id} className="p-3 bg-slate-100/60 dark:bg-slate-950/40 rounded-xl border border-slate-200/5 flex justify-between items-center text-xs text-slate-800 dark:text-slate-200">
                      <span className="font-bold font-mono">{sub.email}</span>
                      <span className="text-[10px] text-slate-500 font-mono">Joined {new Date(sub.subscribedAt).toLocaleDateString()}</span>
                    </div>
                  ))}
                  {subscribers.length === 0 && (
                    <div className="text-slate-500 text-xs py-10 text-center">No audience subscribers currently.</div>
                  )}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* MODAL: ADD PRODUCT */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/10 dark:border-white/5 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn relative">
            <button
              onClick={() => setShowProductModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-6">Create New Gear Listing</h3>
            
            <form onSubmit={handleAddProduct} className="flex flex-col gap-6">
              {/* Basic Info */}
              <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-200/10 dark:border-white/5 flex flex-col gap-4">
                <span className="text-[10px] font-mono font-bold uppercase text-orange-500 block">1. Basic Specifications</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono uppercase text-slate-400">Product Model Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. LS2 Storm Carbon Helmet"
                      value={newProdName}
                      onChange={(e) => setNewProdName(e.target.value)}
                      className="px-4 py-2 text-xs bg-slate-100 dark:bg-slate-950/60 border border-slate-200/20 rounded-xl focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono uppercase text-slate-400">Brand</label>
                      <select
                        value={newProdBrand}
                        onChange={(e) => setNewProdBrand(e.target.value)}
                        className="px-4 py-2 text-xs bg-slate-100 dark:bg-slate-950/60 border border-slate-200/20 rounded-xl text-slate-700 dark:text-slate-300"
                      >
                        <option value="mt-helmets">MT Helmets</option>
                        <option value="alpinestars">Alpinestars</option>
                        <option value="ls2">LS2</option>
                        <option value="royal-enfield">Royal Enfield</option>
                        <option value="cardo">Cardo Systems</option>
                        <option value="shima">Shima</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono uppercase text-slate-400">Category</label>
                      <select
                        value={newProdCat}
                        onChange={(e) => setNewProdCat(e.target.value)}
                        className="px-4 py-2 text-xs bg-slate-100 dark:bg-slate-950/60 border border-slate-200/20 rounded-xl text-slate-700 dark:text-slate-300"
                      >
                        <option value="helmet">Helmet</option>
                        <option value="riding-jacket">Riding Jacket</option>
                        <option value="gloves">Gloves</option>
                        <option value="boots">Boots</option>
                        <option value="bluetooth-intercom">Bluetooth Intercom</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono uppercase text-slate-400">Lowest Deal Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={newProdPrice}
                      onChange={(e) => setNewProdPrice(Number(e.target.value))}
                      className="px-4 py-2 text-xs bg-slate-100 dark:bg-slate-950/60 border border-slate-200/20 rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono uppercase text-slate-400">Retail MRP (₹)</label>
                    <input
                      type="number"
                      required
                      value={newProdMrp}
                      onChange={(e) => setNewProdMrp(Number(e.target.value))}
                      className="px-4 py-2 text-xs bg-slate-100 dark:bg-slate-950/60 border border-slate-200/20 rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono uppercase text-slate-400">Stock Status</label>
                    <select
                      value={newProdStockStatus}
                      onChange={(e) => setNewProdStockStatus(e.target.value as any)}
                      className="px-4 py-2 text-xs bg-slate-100 dark:bg-slate-950/60 border border-slate-200/20 rounded-xl text-slate-700 dark:text-slate-300"
                    >
                      <option value="In Stock">In Stock</option>
                      <option value="Out of Stock">Out of Stock</option>
                      <option value="Coming Soon">Coming Soon</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono uppercase text-slate-400">Vetted Rating</label>
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      required
                      value={newProdRating}
                      onChange={(e) => setNewProdRating(Number(e.target.value))}
                      className="px-4 py-2 text-xs bg-slate-100 dark:bg-slate-950/60 border border-slate-200/20 rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Image Manager */}
              <ImageUploader
                primaryImage={newProdPrimaryImg}
                setPrimaryImage={setNewProdPrimaryImg}
                thumbnail={newProdThumbnail}
                setThumbnail={setNewProdThumbnail}
                featureImage={newProdFeatureImg}
                setFeatureImage={setNewProdFeatureImg}
                galleryImages={newProdGallery}
                setGalleryImages={setNewProdGallery}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono uppercase text-slate-400">Main Graphic Backup URL</label>
                  <input
                    type="text"
                    required
                    value={newProdImg}
                    onChange={(e) => setNewProdImg(e.target.value)}
                    className="px-4 py-2 text-xs bg-slate-100 dark:bg-slate-950/60 border border-slate-200/20 rounded-xl"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono uppercase text-slate-400">Optional 360° Image URL</label>
                  <input
                    type="text"
                    placeholder="e.g. https://images.unsplash.com/photo-360-placeholder"
                    value={newProd360Url}
                    onChange={(e) => setNewProd360Url(e.target.value)}
                    className="px-4 py-2 text-xs bg-slate-100 dark:bg-slate-950/60 border border-slate-200/20 rounded-xl"
                  />
                </div>
              </div>

              {/* Pitch */}
              <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-200/10 dark:border-white/5 flex flex-col gap-4">
                <span className="text-[10px] font-mono font-bold uppercase text-orange-500 block">2. Editorial Descriptions</span>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono uppercase text-slate-400">Short Pitch</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ultra-lightweight racing helmet certified for professional track usage."
                    value={newProdShortDesc}
                    onChange={(e) => setNewProdShortDesc(e.target.value)}
                    className="px-4 py-2 text-xs bg-slate-100 dark:bg-slate-950/60 border border-slate-200/20 rounded-xl"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono uppercase text-slate-400">Detailed Spec Paragraphs</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe material layering, visor structures, safety ratings and pros..."
                    value={newProdLongDesc}
                    onChange={(e) => setNewProdLongDesc(e.target.value)}
                    className="px-4 py-3 text-xs bg-slate-100 dark:bg-slate-950/60 border border-slate-200/20 rounded-xl resize-none"
                  />
                </div>
              </div>

              {/* Specs & bullet points */}
              <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-200/10 dark:border-white/5 flex flex-col gap-4">
                <span className="text-[10px] font-mono font-bold uppercase text-orange-500 block">3. Structured Spec Details</span>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono uppercase text-slate-400">Material Frame</label>
                    <input
                      type="text"
                      value={newProdSpecMaterial}
                      onChange={(e) => setNewProdSpecMaterial(e.target.value)}
                      className="px-4 py-2 text-xs bg-slate-100 dark:bg-slate-950/60 border border-slate-200/20 rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono uppercase text-slate-400">Safety Rating</label>
                    <input
                      type="text"
                      value={newProdSpecSafety}
                      onChange={(e) => setNewProdSpecSafety(e.target.value)}
                      className="px-4 py-2 text-xs bg-slate-100 dark:bg-slate-950/60 border border-slate-200/20 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono uppercase text-slate-400">Closure Style</label>
                    <input
                      type="text"
                      value={newProdSpecClosure}
                      onChange={(e) => setNewProdSpecClosure(e.target.value)}
                      className="px-4 py-2 text-xs bg-slate-100 dark:bg-slate-950/60 border border-slate-200/20 rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono uppercase text-slate-400">Weight Factor</label>
                    <input
                      type="text"
                      value={newProdSpecWeight}
                      onChange={(e) => setNewProdSpecWeight(e.target.value)}
                      className="px-4 py-2 text-xs bg-slate-100 dark:bg-slate-950/60 border border-slate-200/20 rounded-xl"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono uppercase text-slate-400">Bullet Features (comma-separated)</label>
                  <input
                    type="text"
                    value={newProdFeatures}
                    onChange={(e) => setNewProdFeatures(e.target.value)}
                    className="px-4 py-2 text-xs bg-slate-100 dark:bg-slate-950/60 border border-slate-200/20 rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono uppercase text-slate-400">Pros (comma-separated)</label>
                    <input
                      type="text"
                      value={newProdPros}
                      onChange={(e) => setNewProdPros(e.target.value)}
                      className="px-4 py-2 text-xs bg-slate-100 dark:bg-slate-950/60 border border-slate-200/20 rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono uppercase text-slate-400">Cons (comma-separated)</label>
                    <input
                      type="text"
                      value={newProdCons}
                      onChange={(e) => setNewProdCons(e.target.value)}
                      className="px-4 py-2 text-xs bg-slate-100 dark:bg-slate-950/60 border border-slate-200/20 rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Affiliate & SEO */}
              <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-200/10 dark:border-white/5 flex flex-col gap-4">
                <span className="text-[10px] font-mono font-bold uppercase text-orange-500 block">4. Affiliation & Search Engine SEO</span>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono uppercase text-slate-400">Amazon Referral Link</label>
                    <input
                      type="text"
                      required
                      value={newProdAmazon}
                      onChange={(e) => setNewProdAmazon(e.target.value)}
                      className="px-4 py-2 text-xs bg-slate-100 dark:bg-slate-950/60 border border-slate-200/20 rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono uppercase text-slate-400">Flipkart Referral Link</label>
                    <input
                      type="text"
                      required
                      value={newProdFlipkart}
                      onChange={(e) => setNewProdFlipkart(e.target.value)}
                      className="px-4 py-2 text-xs bg-slate-100 dark:bg-slate-950/60 border border-slate-200/20 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono uppercase text-slate-400">Meta SEO Title</label>
                    <input
                      type="text"
                      placeholder="Custom browser title..."
                      value={newProdSeoTitle}
                      onChange={(e) => setNewProdSeoTitle(e.target.value)}
                      className="px-4 py-2 text-xs bg-slate-100 dark:bg-slate-950/60 border border-slate-200/20 rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono uppercase text-slate-400">Keywords (comma-separated)</label>
                    <input
                      type="text"
                      placeholder="safety helmet, review, best price..."
                      value={newProdSeoKeywords}
                      onChange={(e) => setNewProdSeoKeywords(e.target.value)}
                      className="px-4 py-2 text-xs bg-slate-100 dark:bg-slate-950/60 border border-slate-200/20 rounded-xl"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono uppercase text-slate-400">Meta SEO Description</label>
                  <input
                    type="text"
                    placeholder="Short summary for Google search snippet..."
                    value={newProdSeoDesc}
                    onChange={(e) => setNewProdSeoDesc(e.target.value)}
                    className="px-4 py-2 text-xs bg-slate-100 dark:bg-slate-950/60 border border-slate-200/20 rounded-xl"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="py-3 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-orange-500/10 cursor-pointer text-center uppercase tracking-wider"
              >
                Publish Listing
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD BLOG */}
      {showBlogModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/10 dark:border-white/5 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn relative">
            <button
              onClick={() => setShowBlogModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-6">Write New Riding Guide</h3>
            
            <form onSubmit={handleAddBlog} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono uppercase text-slate-400">Guide Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Best D3O Jackets Under 15000"
                    value={newBlogTitle}
                    onChange={(e) => setNewBlogTitle(e.target.value)}
                    className="px-4 py-2 text-xs bg-slate-100 dark:bg-slate-950/60 border border-slate-200/20 rounded-xl focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono uppercase text-slate-400">Category Tag</label>
                  <select
                    value={newBlogCat}
                    onChange={(e) => setNewBlogCat(e.target.value)}
                    className="px-4 py-2 text-xs bg-slate-100 dark:bg-slate-950/60 border border-slate-200/20 rounded-xl text-slate-700 dark:text-slate-300"
                  >
                    <option value="Safety">Safety Standards</option>
                    <option value="Touring">Touring Tips</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono uppercase text-slate-400">Graphic Cover Image URL</label>
                <input
                  type="text"
                  required
                  value={newBlogImg}
                  onChange={(e) => setNewBlogImg(e.target.value)}
                  className="px-4 py-2 text-xs bg-slate-100 dark:bg-slate-950/60 border border-slate-200/20 rounded-xl"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono uppercase text-slate-400">Short Summary</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Read this before buying any armored mesh jacket for summers."
                  value={newBlogSummary}
                  onChange={(e) => setNewBlogSummary(e.target.value)}
                  className="px-4 py-2 text-xs bg-slate-100 dark:bg-slate-950/60 border border-slate-200/20 rounded-xl"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono uppercase text-slate-400">Article Content (Markdown Compatible)</label>
                <textarea
                  required
                  rows={8}
                  placeholder="# Guide Title\nWrite paragraphs using standard headings like ## Section name and * for bullet points..."
                  value={newBlogContent}
                  onChange={(e) => setNewBlogContent(e.target.value)}
                  className="px-4 py-3 text-xs bg-slate-100 dark:bg-slate-950/60 border border-slate-200/20 rounded-xl font-mono resize-none"
                />
              </div>

              <button
                type="submit"
                className="py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-xl mt-4 cursor-pointer"
              >
                Publish Guide Article
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
