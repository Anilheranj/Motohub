/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../AppContext';
import { SEO } from '../components/SEO';
import { ProductCard } from '../components/ProductCard';
import { 
  Star, 
  Check, 
  X, 
  ExternalLink, 
  ShieldCheck, 
  Award, 
  Sliders, 
  Heart, 
  CornerDownRight, 
  ChevronLeft,
  ShoppingBag,
  Sparkles,
  BookmarkCheck,
  Package2
} from 'lucide-react';

export const ProductDetails: React.FC = () => {
  const {
    currentHash,
    products,
    wishlist,
    toggleWishlist,
    compareList,
    toggleCompare,
    navigate
  } = useApp();

  const [activeImg, setActiveImg] = useState('');
  const [product, setProduct] = useState<any>(null);

  // Extract slug from hash e.g. #product/mt-thunder-4-sv-solid-helmet
  useEffect(() => {
    const parts = currentHash.split('/');
    if (parts.length > 1) {
      const slug = parts[1].split('?')[0]; // strip query params
      const matched = products.find(p => p.slug === slug);
      if (matched) {
        setProduct(matched);
        setActiveImg(matched.primaryImage || matched.images[0]);
      }
    }
  }, [currentHash, products]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center flex flex-col items-center justify-center gap-4 fade-in">
        <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center">
          <X className="w-6 h-6" />
        </div>
        <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white">Gear Model Not Found</h2>
        <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
          The requested riding accessory slug is either expired or spelling is incorrect. Let's get you back to safety.
        </p>
        <button 
          onClick={() => navigate('#products')}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl cursor-pointer"
        >
          Return to Riding Catalog
        </button>
      </div>
    );
  }

  const isLiked = wishlist.includes(product.id);
  const isCompared = compareList.some(p => p.id === product.id);

  // Filter 3 related products
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 3);

  // Click tracking API proxy trigger
  const trackAffiliateRedirect = async (platform: string, url: string) => {
    try {
      await fetch('/api/clicks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          platform,
          url
        })
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Structured FAQ JSON-LD Schema
  const structuredSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.images,
    "description": product.shortDescription,
    "brand": {
      "@type": "Brand",
      "name": product.brand.replace('-', ' ')
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating.toString(),
      "reviewCount": product.reviewCount.toString()
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 fade-in">
      <SEO 
        title={product.seoTitle || product.name} 
        description={product.seoDescription || product.shortDescription}
        keywords={product.keywords || [product.name, 'price comparison', 'riding gear review']}
        type="product"
        schema={structuredSchema}
      />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-8 select-none">
        <span onClick={() => navigate('#home')} className="hover:text-blue-500 cursor-pointer">Home</span>
        <span>/</span>
        <span onClick={() => navigate('#products')} className="hover:text-blue-500 cursor-pointer">Catalog</span>
        <span>/</span>
        <span onClick={() => navigate(`#category/${product.category}`)} className="hover:text-blue-500 cursor-pointer uppercase font-mono text-[10px]">{product.category}</span>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 truncate max-w-[150px] sm:max-w-xs">{product.name}</span>
      </nav>

      {/* MAIN SPEC SHEET ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
        
        {/* GALLERY SECTION (Col 5) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/10 dark:border-white/5 overflow-hidden h-[350px] sm:h-[420px] flex items-center justify-center p-2 shadow-inner">
            <img
              src={activeImg}
              alt={product.name}
              className="w-full h-full object-cover rounded-2xl transition-all duration-300"
              referrerPolicy="no-referrer"
            />
            
            {product.discount > 0 && (
              <span className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-bold font-mono px-3 py-1 rounded-full shadow-lg">
                -{product.discount}% LOWER DEAL
              </span>
            )}

            {product.optional360Url && (
              <div className="absolute bottom-4 right-4 z-10">
                <a 
                  href={product.optional360Url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-slate-950/80 backdrop-blur-md hover:bg-blue-600 text-white font-extrabold text-[10px] rounded-xl border border-white/10 shadow-xl flex items-center gap-1.5 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span>Interactive 360° Spin</span>
                </a>
              </div>
            )}
          </div>
          
          {/* Thumbnails */}
          <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
            {(product.galleryImages && product.galleryImages.length > 0 ? product.galleryImages : product.images).map((img: string, i: number) => (
              <button
                key={i}
                onClick={() => setActiveImg(img)}
                className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                  activeImg === img ? 'border-blue-500 scale-105 shadow-md shadow-blue-500/10' : 'border-slate-200/5 hover:border-slate-400'
                }`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* CORE CONTEXT PANEL (Col 7) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Title Area */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold font-mono tracking-wider uppercase text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-lg">
                {product.brand.replace('-', ' ')}
              </span>
              <span className="text-xs font-bold font-mono tracking-wider uppercase text-slate-400 dark:text-slate-500">
                {product.category.replace('-', ' ')}
              </span>
            </div>
            
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white leading-tight">
              {product.name}
            </h1>

            {/* Ratings Summary */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-700'}`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {product.rating} / 5.0
              </span>
              <span className="text-xs text-slate-400">
                ({product.reviewCount} verified rider submissions)
              </span>
            </div>
          </div>

          {/* Short Description */}
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-b border-slate-200/10 pb-4">
            {product.shortDescription}
          </p>

          {/* SPECIFICATIONS & HIGHLIGHTS SPLIT CARD */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {product.highlights.slice(0, 4).map((hl: string, index: number) => (
              <div key={index} className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/5 dark:border-white/5">
                <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-300">{hl}</span>
              </div>
            ))}
          </div>

          {/* AFFILIATE STORES PRICE COMPARISON */}
          <div className="p-6 bg-slate-100 dark:bg-slate-900 rounded-3xl border border-slate-200/10 dark:border-white/5">
            <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white mb-4 flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Live Affiliate Price Directory
            </h3>

            <div className="flex flex-col gap-3">
              {product.affiliateLinks.map((link: any, idx: number) => (
                <div 
                  key={idx} 
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200/15 dark:border-white/5 hover:border-blue-500/30 transition-all gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 uppercase font-mono text-[10px] font-bold">
                      {link.platform.substring(0, 3)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">{link.label}</div>
                      <div className="text-[10px] text-slate-400">Secure Direct Merchant Link</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6">
                    <div className="text-right">
                      <span className="text-[9px] text-slate-500 font-mono block">Best Value Rate</span>
                      <span className="font-mono text-base font-bold text-slate-900 dark:text-white">₹{link.price.toLocaleString()}</span>
                    </div>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackAffiliateRedirect(link.platform, link.url)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Buy Store</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
            
            <span className="text-[10px] text-slate-400 font-mono block mt-3 text-center leading-relaxed">
              *MotoGear Hub serves dynamic comparison tables. Buying redirects safely using affiliate cookies.
            </span>
          </div>

          {/* CORE WIDGET UTILS */}
          <div className="flex gap-3">
            <button
              onClick={() => toggleCompare(product)}
              className={`flex-1 py-3 rounded-2xl text-xs font-bold border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isCompared
                  ? 'bg-blue-500/15 border-blue-500 text-blue-600 dark:text-blue-400 shadow-lg'
                  : 'bg-transparent border-slate-200/20 text-slate-400 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>{isCompared ? 'Added to Comparison Dock' : 'Add to Comparison List'}</span>
            </button>

            <button
              onClick={() => toggleWishlist(product.id)}
              className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/20 text-rose-500 hover:scale-105 transition-transform cursor-pointer"
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-rose-500' : ''}`} />
            </button>
          </div>

        </div>
      </div>

      {/* STRUCTURAL SPECS & PROS/CONS TABS (Side by side grid) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
        
        {/* Specifications List (Col 7) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900/60 border border-slate-200/10 dark:border-white/5 p-6 rounded-3xl">
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-6 border-b border-slate-100 dark:border-slate-800 pb-3">
            Technical Specification Sheet
          </h3>
          
          <div className="grid grid-cols-1 gap-1.5">
            {Object.entries(product.specifications).map(([key, val]: any) => (
              <div key={key} className="grid grid-cols-1 sm:grid-cols-3 p-3 bg-slate-100/50 dark:bg-slate-950/40 rounded-xl text-xs">
                <span className="font-bold text-slate-500 font-mono text-[10px] uppercase">{key}</span>
                <span className="sm:col-span-2 text-slate-800 dark:text-slate-200 font-semibold">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pros & Cons List (Col 5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Pros */}
          <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-3xl">
            <h4 className="font-display font-bold text-sm text-emerald-500 mb-4 flex items-center gap-1.5">
              <Check className="w-4 h-4 shrink-0" /> Verified Product Pros
            </h4>
            <div className="space-y-3">
              {product.pros.map((p: string, i: number) => (
                <div key={i} className="flex gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <span className="text-emerald-500 font-bold shrink-0">✓</span>
                  <span className="leading-relaxed">{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cons */}
          <div className="p-6 bg-rose-500/5 border border-rose-500/10 rounded-3xl">
            <h4 className="font-display font-bold text-sm text-rose-500 mb-4 flex items-center gap-1.5">
              <X className="w-4 h-4 shrink-0" /> Verified Product Cons
            </h4>
            <div className="space-y-3">
              {product.cons.map((c: string, i: number) => (
                <div key={i} className="flex gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <span className="text-rose-500 font-bold shrink-0">✗</span>
                  <span className="leading-relaxed">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* DETAILED DESCRIPTION & BUYING ADVICE */}
      <section className="p-8 bg-white dark:bg-slate-900 border border-slate-200/10 dark:border-white/5 rounded-3xl mb-16">
        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-4">
          Detailed Review & Curated Analysis
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
          {product.longDescription}
        </p>
      </section>

      {/* FREQUENTLY BOUGHT TOGETHER (SIMULATION) */}
      <section className="p-8 bg-slate-100 dark:bg-slate-900/40 rounded-3xl border border-slate-200/10 dark:border-white/5 mb-16">
        <h3 className="font-display font-bold text-base text-slate-900 dark:text-white mb-6 flex items-center gap-1.5">
          <ShoppingBag className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Frequently Bundled Riding Setups
        </h3>
        <div className="flex flex-col md:flex-row items-center gap-6 justify-center">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-slate-850 text-center w-48">
              <img src={product.images[0]} alt="Current item" className="w-16 h-16 object-cover mx-auto rounded-xl" />
              <div className="text-[11px] font-bold text-slate-900 dark:text-white truncate mt-2">{product.name}</div>
              <div className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold mt-1">₹{product.price.toLocaleString()}</div>
            </div>
            
            <span className="text-xl text-slate-400 font-bold font-mono">+</span>

            <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-slate-850 text-center w-48">
              <img src="https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=200" alt="Gloves bundle" className="w-16 h-16 object-cover mx-auto rounded-xl" />
              <div className="text-[11px] font-bold text-slate-900 dark:text-white truncate mt-2">Shima Caliber Gloves</div>
              <div className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold mt-1">₹5,499</div>
            </div>
          </div>

          <span className="text-xl text-slate-400 font-bold font-mono">=</span>

          <div className="p-6 bg-slate-950 text-center rounded-2xl border border-blue-500/20 w-full md:w-56">
            <div className="text-xs text-slate-400 uppercase font-mono">Bundle Special</div>
            <div className="text-lg font-mono font-bold text-white mt-1">₹{(product.price + 5499).toLocaleString()}</div>
            <p className="text-[10px] text-slate-500 leading-snug mt-1">Click individual catalog cards above to verify discount codes on Amazon.</p>
          </div>
        </div>
      </section>

      {/* RELATED GEAR COMPILATIONS */}
      <section className="mb-12">
        <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-8">
          Related Riding Accessories
        </h3>
        {relatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-xs text-slate-500 p-6 text-center bg-slate-900/30 rounded-2xl">
            No similar products available currently. View the full catalog page for broader categories.
          </div>
        )}
      </section>

    </div>
  );
};
