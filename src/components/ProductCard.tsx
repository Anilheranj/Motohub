/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product } from '../types';
import { useApp } from '../AppContext';
import { 
  Star, 
  Heart, 
  CheckSquare, 
  Square, 
  ChevronRight, 
  Sparkles, 
  Eye, 
  X, 
  ShoppingBag, 
  ArrowUpRight,
  ThumbsUp, 
  ThumbsDown,
  Info,
  Layers,
  Award
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    navigate,
    wishlist,
    toggleWishlist,
    compareList,
    toggleCompare
  } = useApp();

  const [showQuickView, setShowQuickView] = useState(false);

  const isLiked = wishlist.includes(product.id);
  const isCompared = compareList.some(p => p.id === product.id);

  const handleCardClick = () => {
    navigate(`#product/${product.slug}`);
  };

  const handleTrackAffiliate = async (platform: string, url: string) => {
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

  const brandClean = product.brand.replace('-', ' ');

  return (
    <>
      <div className="relative group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/10 dark:border-white/5 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1.5 flex flex-col h-full">
        
        {/* BADGES */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
          {product.discount > 0 && (
            <span className="text-[10px] font-bold font-mono px-2.5 py-1 rounded-full bg-blue-600 text-white shadow-lg tracking-wider">
              -{product.discount}% OFF
            </span>
          )}
          {product.trending && (
            <span className="text-[10px] font-bold font-mono px-2.5 py-1 rounded-full bg-slate-950/80 text-white backdrop-blur-md border border-white/10 flex items-center gap-1 shadow-md">
              <Sparkles className="w-3 h-3 text-blue-500" /> TRENDING
            </span>
          )}
        </div>

        {/* WISHLIST BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 dark:bg-slate-950/80 backdrop-blur-md border border-slate-200/20 shadow-md text-rose-500 hover:scale-110 active:scale-95 transition-all duration-300 ease-in-out cursor-pointer"
          aria-label="Toggle Wishlist"
        >
          <Heart className={`w-4 h-4 transition-all ${isLiked ? 'fill-rose-500 text-rose-500 scale-110' : 'text-slate-400 dark:text-slate-500'}`} />
        </button>

        {/* PRODUCT IMAGE GALLERY WRAPPER */}
        <div className="relative h-64 overflow-hidden bg-slate-50 dark:bg-slate-950/40 cursor-pointer flex items-center justify-center" onClick={handleCardClick}>
          <img
            src={product.primaryImage || product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60" />
          
          {/* QUICK VIEW OVERLAY */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowQuickView(true);
              }}
              className="px-4 py-2 bg-white text-slate-950 text-xs font-bold rounded-xl shadow-xl hover:bg-blue-600 hover:text-white transition-all transform translate-y-2 group-hover:translate-y-0 duration-300 hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-4 h-4" /> Quick View
            </button>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="p-5 flex flex-col justify-between flex-1 gap-4">
          <div>
            {/* Brand & Category Label */}
            <div className="flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-1.5">
              <span className="font-bold text-blue-600 dark:text-blue-400">{brandClean}</span>
              <span>{product.category.replace('-', ' ')}</span>
            </div>

            {/* Product Name */}
            <h3 
              onClick={handleCardClick}
              className="font-display font-extrabold text-base leading-snug cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 text-slate-900 dark:text-white line-clamp-1 transition-colors"
            >
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mt-2">
              <div className="flex items-center bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-lg">
                <Star className="w-3 h-3 text-blue-500 fill-blue-500 mr-1" />
                <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400">
                  {product.rating}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                ({product.reviewCount || 48} verified comparisons)
              </span>
            </div>
          </div>

          {/* Highlights/Bullet-points for quick review */}
          <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-1.5 border-t border-slate-100 dark:border-white/5 pt-3 flex-1">
            {product.highlights?.slice(0, 2).map((hl, index) => (
              <div key={index} className="flex items-center gap-2 truncate font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                <span className="truncate">{hl}</span>
              </div>
            ))}
          </div>

          {/* PRICING AREA */}
          <div className="flex items-baseline gap-2.5 border-t border-slate-100 dark:border-white/5 pt-3">
            <div className="flex flex-col">
              <span className="text-[9px] font-mono uppercase text-slate-400 tracking-wider">Lowest Deal Price</span>
              <span className="font-mono text-lg font-extrabold text-slate-900 dark:text-white leading-none mt-0.5">
                ₹{product.price.toLocaleString()}
              </span>
            </div>
            {product.mrp > product.price && (
              <span className="font-mono text-xs text-slate-400 line-through">
                ₹{product.mrp.toLocaleString()}
              </span>
            )}
            
            <div className="ml-auto text-right">
              <span className="text-[9px] font-mono text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                Affiliate Vetted
              </span>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="grid grid-cols-2 gap-2 border-t border-slate-100 dark:border-white/5 pt-3">
            {/* Compare Selector Checkbox */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleCompare(product);
              }}
              className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold border transition-all duration-300 ease-in-out hover:scale-[1.03] active:scale-[0.97] cursor-pointer ${
                isCompared
                  ? 'bg-blue-500/10 border-blue-500 text-blue-600 dark:text-blue-400 shadow-sm shadow-blue-500/5'
                  : 'bg-transparent border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:border-blue-500/50 hover:text-blue-600'
              }`}
            >
              {isCompared ? <CheckSquare className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5" />}
              <span>{isCompared ? 'Compared' : 'Compare'}</span>
            </button>

            {/* Details Route */}
            <button
              onClick={handleCardClick}
              className="flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all duration-300 ease-in-out hover:scale-[1.03] active:scale-[0.97] shadow-md shadow-blue-500/10 cursor-pointer"
            >
              <span>View Offers</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

      {/* QUICK VIEW OVERLAY MODAL */}
      {showQuickView && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/10 dark:border-white/5 rounded-3xl p-6 sm:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn relative flex flex-col gap-6">
            
            {/* Close */}
            <button
              onClick={() => setShowQuickView(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-950 dark:hover:text-white cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Head */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left Column: Image with gallery preview */}
              <div className="w-full md:w-1/2 flex flex-col gap-3 shrink-0">
                <div className="aspect-square bg-slate-50 dark:bg-slate-950/40 rounded-2xl overflow-hidden border border-slate-200/10 dark:border-white/5 flex items-center justify-center p-4">
                  <img 
                    src={product.primaryImage || product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                {/* Micro thumbnails */}
                {product.galleryImages && product.galleryImages.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                    {product.galleryImages.map((img, i) => (
                      <div key={i} className="w-12 h-12 rounded-lg overflow-hidden border border-slate-200/20 shrink-0">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Key offer metrics */}
              <div className="flex-1 flex flex-col justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full">{brandClean}</span>
                  <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white mt-3 leading-snug">{product.name}</h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mt-2">
                    <Star className="w-4 h-4 text-blue-500 fill-blue-500" />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{product.rating} / 5.0 Rating</span>
                    <span className="text-[10px] text-slate-400">Vetted by Riding Experts</span>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-3.5 italic font-semibold">
                    "{product.shortDescription}"
                  </p>
                </div>

                {/* Offer Compare Box */}
                <div className="bg-slate-50 dark:bg-slate-950/50 p-4 rounded-2xl border border-slate-200/10 dark:border-white/5 flex flex-col gap-3">
                  <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block font-bold">Compare Outgoing Affiliate Offers</span>
                  
                  <div className="flex flex-col gap-2">
                    {product.affiliateLinks?.map((aff, i) => (
                      <div key={i} className="flex items-center justify-between p-2.5 bg-white dark:bg-slate-900 border border-slate-200/5 rounded-xl text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-600" />
                          <span className="font-bold text-slate-800 dark:text-slate-200 capitalize">{aff.platform} offer</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-extrabold text-slate-900 dark:text-white">₹{aff.price?.toLocaleString()}</span>
                          <a
                            href={aff.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleTrackAffiliate(aff.platform, aff.url)}
                            className="px-3 py-1 bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-extrabold text-[10px] rounded-lg hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 flex items-center gap-1"
                          >
                            <span>Redirect</span> <ArrowUpRight className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* More Details navigation link */}
                <button
                  onClick={() => {
                    setShowQuickView(false);
                    handleCardClick();
                  }}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-blue-500/10 uppercase tracking-wider transition-all duration-300 ease-in-out hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Info className="w-4 h-4" /> Full In-Depth Review & Specifications
                </button>
              </div>
            </div>

            {/* Pros and Cons overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-200/10 dark:border-white/5 pt-5">
              <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-500 uppercase font-mono mb-2">
                  <ThumbsUp className="w-4 h-4" /> What Riders Love (Pros)
                </span>
                <ul className="space-y-1">
                  {product.pros?.map((pro, i) => (
                    <li key={i} className="text-[11px] text-slate-600 dark:text-slate-400 font-semibold flex items-start gap-1.5">
                      <span className="text-emerald-500 mt-0.5">•</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-rose-500/5 border border-rose-500/10 rounded-2xl">
                <span className="flex items-center gap-1.5 text-xs font-bold text-rose-500 uppercase font-mono mb-2">
                  <ThumbsDown className="w-4 h-4" /> Things To Consider (Cons)
                </span>
                <ul className="space-y-1">
                  {product.cons?.map((con, i) => (
                    <li key={i} className="text-[11px] text-slate-600 dark:text-slate-400 font-semibold flex items-start gap-1.5">
                      <span className="text-rose-500 mt-0.5">•</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
