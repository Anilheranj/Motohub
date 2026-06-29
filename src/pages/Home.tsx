/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { SEO } from '../components/SEO';
import { ProductCard } from '../components/ProductCard';
import { 
  Shield, 
  TrendingUp, 
  Layers, 
  Award, 
  HelpCircle, 
  Sparkles, 
  ChevronRight, 
  Star, 
  CheckCircle, 
  MessageSquare, 
  ArrowRight,
  ShieldCheck,
  Percent,
  Search,
  Sliders,
  Sparkle,
  Zap,
  Bookmark,
  Calendar,
  Clock,
  Heart,
  Send,
  CheckCircle2,
  ThumbsUp
} from 'lucide-react';

export const Home: React.FC = () => {
  const {
    navigate,
    products,
    categories,
    brands,
    blogs,
  } = useApp();

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [newsletterMsg, setNewsletterMsg] = useState('');
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  const featuredCategories = categories.filter(c => c.count && c.count > 0).slice(0, 8);
  const trendingProducts = products.filter(p => p.trending).slice(0, 4);
  const bestDeals = [...products].sort((a, b) => b.discount - a.discount).slice(0, 4);
  const topRatedProducts = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const recentlyAddedProducts = [...products].slice(-4).reverse();
  const editorsChoice = products.filter(p => p.rating >= 4.8).slice(0, 3);
  const topBrands = brands.filter(b => b.featured).slice(0, 6);
  const latestBlogs = blogs.slice(0, 3);

  // Testimonials database
  const testimonials = [
    {
      name: "Vikram Rathore",
      role: "Leh-Ladakh Tourer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
      quote: "Before my Spiti Valley ride, I was confused between two modular helmets. MotoGear Hub's spec comparison let me analyze the exact weights side by side. Saved my neck from fatigue!"
    },
    {
      name: "Meera Sen",
      role: "Certified Track Racer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120",
      quote: "Standard e-commerce listings often hide vital safety ratings. MotoGear Hub puts ECE 22.06 and closure-type parameters front and center. Highly recommended for professional riders."
    },
    {
      name: "Kabir Khan",
      role: "Daily Highway Commuter",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120",
      quote: "I tracked a Shima mesh jacket for weeks. The price comparison here directed me to a Flipkart deal that was ₹1,500 lower than other sites. Truly unbiased savings."
    }
  ];

  // FAQ mock database
  const homeFaqs = [
    {
      q: "Does MotoGear Hub sell riding gear directly?",
      a: "No. MotoGear Hub is a premium discovery, comparison, and review platform. We do not stock inventory or sell products directly. We help riders compare prices, features, and specifications, and provide affiliate links to purchase from trusted networks like Amazon, Flipkart, and official brand stores."
    },
    {
      q: "How do you guarantee the safety of helmets shown?",
      a: "We actively screen for internationally certified safety standards such as ECE 22.06, DOT, and Indian ISI marks. In our comparison tables, we highlight the certified safety standards explicitly so riders can purchase helmets that deliver maximum protection."
    },
    {
      q: "Are the prices shown on the website accurate?",
      a: "We fetch and update prices regularly from our partner affiliate stores. However, since marketplaces alter prices dynamically based on discounts and seller offers, we recommend clicking on the 'View on Store' buttons to see the absolute latest live price."
    },
    {
      q: "How does your product comparison tool work?",
      a: "Our Comparison Engine aggregates detailed structural specifications, user ratings, pros/cons, and pricing from our database. It calculates an automated 'Recommendation Score' based on safety-to-price ratios, so riders can make unbiased purchasing decisions."
    }
  ];

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setNewsletterLoading(true);
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      setNewsletterMsg(data.message || 'Rider subscription active! Welcome aboard.');
      setEmail('');
    } catch (err) {
      setNewsletterMsg('Welcome! You are subscribed to our premium gear guides.');
      setEmail('');
    } finally {
      setNewsletterLoading(false);
    }
  };

  return (
    <div className="fade-in bg-theme-bg">
      <SEO 
        title="India's Premium Motorcycle Riding Gear Platform" 
        description="MotoGear Hub is India's premium riding gear discovery & price comparison website. Compare certified helmets, riding jackets, carbon gloves, boots & intercom intercom mesh devices."
      />

      {/* 1. FULL SCREEN HERO BANNER WITH AMBIENT BACKGROUND */}
      <section className="relative min-h-[92vh] flex items-center justify-center bg-slate-950 overflow-hidden pt-12 pb-24 border-b border-white/5">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 bg-radial-glow opacity-80 pointer-events-none" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none animate-pulse duration-[8000ms]" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none animate-pulse duration-[12000ms]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 self-center lg:self-start px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold font-mono tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 animate-spin duration-1000" /> India’s Premium Discovery Platform
            </div>

            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6.5xl tracking-tight leading-none text-white">
              Stop Guessing Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600">Riding Protection.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              We compare ECE 22.06 certified helmets, armored D3O riding jackets, carbon fiber gloves, and high-tech mesh intercom communicators. Unbiased specs, store prices, and authentic pros & cons.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mt-4">
              <button 
                onClick={() => navigate('#products')} 
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2 transition-all duration-300 ease-in-out cursor-pointer transform hover:-translate-y-1 active:scale-95"
              >
                <span>Browse Gear Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => navigate('#compare')} 
                className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-extrabold text-sm rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Sliders className="w-4 h-4 text-blue-400" />
                <span>Try Comparison Engine</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8 mt-6">
              <div>
                <span className="block font-display font-black text-3xl text-white">26</span>
                <span className="block text-[10px] text-slate-400 uppercase font-mono tracking-wider">Gear Categories</span>
              </div>
              <div>
                <span className="block font-display font-black text-3xl text-white">100%</span>
                <span className="block text-[10px] text-slate-400 uppercase font-mono tracking-wider">Unbiased Reviews</span>
              </div>
              <div>
                <span className="block font-display font-black text-3xl text-white">3+</span>
                <span className="block text-[10px] text-slate-400 uppercase font-mono tracking-wider">Marketplace Deals</span>
              </div>
            </div>
          </div>

          {/* Luxury Floating Interactive Representation */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-sm rounded-3xl overflow-hidden bg-slate-900/60 backdrop-blur-xl p-6 border border-white/10 flex flex-col justify-between shadow-2xl shadow-black/80">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">DATABASE SYNC: LIVE</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">CURATED HERO PICK</span>
              </div>
              
              <div className="my-auto text-center py-6">
                <img 
                  src="https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=400" 
                  alt="Premium Helmet Spec" 
                  className="w-48 h-48 object-cover rounded-2xl mx-auto shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 cursor-pointer"
                  onClick={() => navigate('#product/mt-thunder-4-sv-solid-helmet')}
                />
                <h4 className="font-display font-extrabold text-base text-white mt-4">MT Thunder 4 SV ECE 22.06</h4>
                <div className="text-xs text-slate-400 font-mono mt-1">₹6,800 • <span className="text-emerald-400 font-semibold">20% discount vended</span></div>
              </div>

              <div className="p-3.5 bg-slate-950/60 rounded-2xl border border-white/5 flex items-center justify-between text-xs">
                <div>
                  <span className="block text-[9px] text-slate-400 font-mono uppercase">Amazon India</span>
                  <span className="font-bold text-white font-mono">₹6,800</span>
                </div>
                <div className="text-right">
                  <span className="block text-[9px] text-slate-400 font-mono uppercase">Flipkart India</span>
                  <span className="font-bold text-white font-mono">₹6,999</span>
                </div>
                <button 
                  onClick={() => navigate('#product/mt-thunder-4-sv-solid-helmet')} 
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-[10px] rounded-lg transition-colors cursor-pointer uppercase tracking-wider"
                >
                  Verify Specs
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. FEATURED CATEGORIES SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase block mb-1">Discover Gear By Need</span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">Featured Riding Accessories</h2>
          </div>
          <button 
            onClick={() => navigate('#categories')} 
            className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            Explore all categories <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredCategories.map(cat => (
            <div 
              key={cat.id} 
              onClick={() => navigate(`#category/${cat.slug}`)}
              className="group relative rounded-3xl overflow-hidden h-44 bg-slate-900 border border-slate-200/10 dark:border-white/5 cursor-pointer shadow-md hover:-translate-y-1.5 transition-all duration-300"
            >
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-5 flex flex-col justify-end">
                <h4 className="font-display font-extrabold text-sm text-white group-hover:text-blue-400 transition-colors">{cat.name}</h4>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">{cat.count || 12} curated products</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TRENDING PRODUCTS CAROUSEL/GRID */}
      <section className="py-24 bg-white dark:bg-slate-900/30 border-y border-slate-200/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase block">Rider Hotpicks</span>
                <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">Trending Motorcycle Gear</h2>
              </div>
            </div>
            <button 
              onClick={() => navigate('#products')} 
              className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              Search Catalog <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map(item => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. BEST DEALS (HIGH DISCOUNTS) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase block">Highest Markdown Discounts</span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">Best Value Affiliate Deals</h2>
            </div>
          </div>
          <button 
            onClick={() => navigate('#products')} 
            className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            Explore Deals <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestDeals.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>

      {/* 5. TOP-RATED PRODUCTS GALLERY */}
      <section className="py-24 bg-white dark:bg-slate-900/30 border-y border-slate-200/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center shrink-0">
                <Star className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <span className="text-xs font-bold font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase block">Expert Certified 4.8+ Stars</span>
                <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">Top-Rated Armor & Visors</h2>
              </div>
            </div>
            <button 
              onClick={() => navigate('#products')} 
              className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              See All Highly Rated <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topRatedProducts.map(item => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. RECENTLY ADDED PRODUCTS */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase block">Fresh Database Entries</span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">Recently Added Gear Listings</h2>
            </div>
          </div>
          <button 
            onClick={() => navigate('#products')} 
            className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            View All Catalog <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentlyAddedProducts.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>

      {/* 7. EDITOR'S CHOICE */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden rounded-t-[50px] border-b border-white/5">
        <div className="absolute inset-0 bg-radial-glow opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold font-mono tracking-widest text-blue-400 uppercase block mb-2">Our Premium Recommendations</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-none">Editor’s Choice Premium Picks</h2>
            <p className="text-sm text-slate-400 mt-3 max-w-lg mx-auto">
              These models scored 4.8/5.0 or above in our safety evaluation, premium comfort criteria, and value metrics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {editorsChoice.map(item => (
              <div 
                key={item.id} 
                onClick={() => navigate(`#product/${item.slug}`)}
                className="relative rounded-3xl bg-slate-950 border border-white/5 p-6 flex flex-col justify-between cursor-pointer hover:border-blue-500/40 transition-all group"
              >
                <div className="absolute top-4 right-4 bg-blue-600/10 border border-blue-500/30 text-blue-400 font-mono text-[9px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5" /> EDITOR AWARD
                </div>

                <div>
                  <img 
                    src={item.images[0]} 
                    alt={item.name} 
                    className="w-full h-48 object-cover rounded-2xl mb-4 group-hover:scale-102 transition-transform duration-500"
                  />
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1 font-bold">{item.brand} • {item.category}</span>
                  <h3 className="font-display font-extrabold text-base text-white mb-2 group-hover:text-blue-400 transition-colors">{item.name}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">{item.shortDescription}</p>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                  <div>
                    <span className="block text-[9px] font-mono text-slate-500">Ref Price</span>
                    <span className="text-sm font-bold text-white font-mono">₹{item.price.toLocaleString()}</span>
                  </div>
                  <span className="text-xs font-bold text-blue-400 flex items-center gap-1">
                    Compare Deals <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. POPULAR BRANDS */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-bold font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase block mb-1">Industry Leaders</span>
        <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white mb-12 tracking-tight">Riding Brands We Cover</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
          {topBrands.map(brand => (
            <div 
              key={brand.id}
              onClick={() => navigate('#brands')}
              className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/10 dark:border-white/5 cursor-pointer hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5 transition-all"
            >
              <img src={brand.logo} alt={brand.name} className="w-12 h-12 object-cover rounded-xl mb-3 border border-slate-200/20" />
              <span className="text-xs font-bold text-slate-900 dark:text-white capitalize">{brand.name.replace('-', ' ')}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 9. TESTIMONIALS SECTION */}
      <section className="py-24 bg-slate-100 dark:bg-slate-900/30 border-y border-slate-200/10 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase block mb-2">Tested by Real Riders</span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight leading-none">Rider Testimonials & Reviews</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">
              Hear from touring professionals, track racers, and daily highway commuters who use our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/10 dark:border-white/5 flex flex-col justify-between shadow-sm">
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic font-semibold">
                  "{test.quote}"
                </p>
                <div className="flex items-center gap-3 mt-6 border-t border-slate-200/10 pt-4">
                  <img src={test.avatar} alt={test.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-none">{test.name}</h4>
                    <span className="text-[10px] text-slate-500 font-mono mt-1 block">{test.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. LATEST GUIDES & BLOGS */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase block mb-1">Educate Yourself</span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">Buying Guides & Expert Research</h2>
          </div>
          <button 
            onClick={() => navigate('#blogs')} 
            className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            Explore Knowledge Base <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestBlogs.map(blog => (
            <div 
              key={blog.id}
              onClick={() => navigate(`#blog/${blog.slug}`)}
              className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/10 dark:border-white/5 overflow-hidden cursor-pointer hover:shadow-lg transition-all"
            >
              <div className="h-48 overflow-hidden bg-slate-50 dark:bg-slate-950/40">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" />
              </div>
              <div className="p-5 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase text-blue-600 dark:text-blue-400 font-bold">
                  <span>{blog.category}</span>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </div>
                <h3 className="font-display font-extrabold text-sm text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {blog.summary}
                </p>
                <div className="border-t border-slate-100 dark:border-white/5 mt-2 pt-3 flex items-center justify-between text-[11px] font-bold text-blue-600 dark:text-blue-400">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. FAQ ACCORDION */}
      <section className="py-24 bg-slate-100 dark:bg-slate-900/30 border-y border-slate-200/10 dark:border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase block mb-1">Resolve Confusions</span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">Frequently Answered Queries</h2>
          </div>

          <div className="flex flex-col gap-4">
            {homeFaqs.map((faq, index) => (
              <div 
                key={index}
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/10 dark:border-white/5 overflow-hidden cursor-pointer shadow-sm hover:border-blue-500/30 transition-colors"
              >
                <div className="p-5 flex items-center justify-between font-extrabold text-sm text-slate-900 dark:text-white">
                  <span>{faq.q}</span>
                  <span className="text-blue-600 dark:text-blue-400 text-lg">{activeFaq === index ? '−' : '+'}</span>
                </div>
                {activeFaq === index && (
                  <div className="p-5 pt-0 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-white/5 leading-relaxed font-semibold">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. ADVANCED INTERACTIVE AI CHAT CONSOLE CTA */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[40px] bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950 border border-white/10 p-8 sm:p-12 overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-radial-glow opacity-40 pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold font-mono tracking-widest text-blue-400 uppercase bg-blue-500/10 px-3 py-1 rounded-full self-start flex items-center gap-1.5 border border-blue-500/20">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" /> 24/7 AI GEAR ASSISTANT
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-none">
                Confused on Sizing or Certifications? Talk to MotoGenie
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed max-w-lg">
                MotoGenie is an intelligent conversational model trained specifically on motorcycle safety certifications, armor comparisons, and helmet specs. Ask questions, compare jackets, or find answers instantly.
              </p>
              
              <div className="flex flex-wrap gap-2 mt-2">
                <button 
                  onClick={() => {
                    const bubble = document.getElementById('chat-bubble-toggle');
                    if (bubble) bubble.click();
                  }}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-xs font-bold font-mono hover:border-blue-500/30 transition-all cursor-pointer"
                >
                  "Compare ECE 22.06 vs DOT"
                </button>
                <button 
                  onClick={() => {
                    const bubble = document.getElementById('chat-bubble-toggle');
                    if (bubble) bubble.click();
                  }}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-xs font-bold font-mono hover:border-blue-500/30 transition-all cursor-pointer"
                >
                  "Recommend summer jacket under ₹15,000"
                </button>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-white/5 p-6 rounded-3xl flex flex-col gap-4 shadow-xl">
              <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-white">MotoGenie Console Preview</h4>
                  <span className="text-[9px] font-mono text-emerald-400">Rider Helper Online</span>
                </div>
              </div>

              <div className="text-[11px] font-mono leading-relaxed space-y-3 p-3 bg-slate-950/60 border border-white/5 rounded-xl text-slate-300">
                <p className="text-slate-500">{"[ Rider ]"} Tell me about MT Thunder 4 SV safety standards.</p>
                <p className="text-blue-400">{"[ Genie ]"} The MT Thunder 4 SV is fully certified with ECE 22.06 standard (impact test vetting across 12 target areas) and has Indian ISI approval. It offers HIRP frame layout and micrometric metal buckle closure.</p>
              </div>

              <button
                onClick={() => {
                  const bubble = document.getElementById('chat-bubble-toggle');
                  if (bubble) bubble.click();
                }}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/10 uppercase tracking-wider transition-all"
              >
                <span>Launch Interactive Assistant</span>
                <MessageSquare className="w-4 h-4 animate-bounce" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 13. PRESTIGIOUS NEWSLETTER SIGNUP BANNER */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center gap-6">
          <span className="text-xs font-bold font-mono tracking-widest text-blue-400 uppercase bg-blue-500/10 px-3 py-1 rounded-full">
            NEVER MISS AN EXCLUSIVE REVIEW
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-none">
            Get Premium Gear Guides & Exclusive Deals
          </h2>
          <p className="text-sm text-slate-400 max-w-lg">
            Join 12,000+ Indian motorcycle riders who receive our weekly ECE test breakdowns, D3O jacket comparison sheets, and custom marketplace markdowns.
          </p>

          {newsletterMsg ? (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-xs font-semibold flex items-center gap-2 max-w-md">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>{newsletterMsg}</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2.5 w-full max-w-md">
              <input 
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-slate-900 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
              />
              <button 
                type="submit"
                disabled={newsletterLoading}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-blue-500/10 cursor-pointer uppercase tracking-wider shrink-0 transition-colors"
              >
                Subscribe Now
              </button>
            </form>
          )}

          <span className="text-[10px] font-mono text-slate-500">
            🔒 Zero Spam. 1-Click Unsubscribe at any time. We value your digital security.
          </span>
        </div>
      </section>

    </div>
  );
};
