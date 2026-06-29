/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../AppContext';
import { SEO } from '../components/SEO';
import { 
  Sliders, 
  Trash2, 
  CheckCircle, 
  X, 
  ExternalLink, 
  Award, 
  Star, 
  Info,
  ChevronDown
} from 'lucide-react';

export const Comparison: React.FC = () => {
  const { compareList, toggleCompare, clearCompare, navigate } = useApp();

  // Calculate recommendation score dynamically out of 100
  const getScore = (product: any) => {
    // formula: based on rating, discount, and premium status
    const ratingComponent = product.rating * 16; // max 80
    const discountComponent = Math.min(product.discount * 0.8, 15); // max 15
    const reviewComponent = Math.min(product.reviewCount * 0.02, 5); // max 5
    return Math.round(ratingComponent + discountComponent + reviewComponent);
  };

  // Find the highest score to display a Winner Badge
  const winnerIndex = compareList.length >= 2
    ? compareList.reduce((highestIdx, currentProd, idx, arr) => {
        const currentScore = getScore(currentProd);
        const highestScore = getScore(arr[highestIdx]);
        return currentScore > highestScore ? idx : highestIdx;
      }, 0)
    : -1;

  // Gather unique specifications keys across all compared products
  const specKeys = Array.from(
    new Set(
      compareList.flatMap(p => Object.keys(p.specifications || {}))
    )
  ) as string[];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 fade-in">
      <SEO 
        title="Compare Riding Helmets, Jackets & Accessories Side-By-Side" 
        description="Side-by-side technical specification, safety rating, pros, cons, and live affiliate price comparisons of premium motorcycle gear."
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12 border-b border-slate-200/10 dark:border-white/5 pb-8">
        <div>
          <span className="text-xs font-bold font-mono tracking-wider text-blue-600 dark:text-blue-400 uppercase block mb-1">Unbiased Spec Comparison</span>
          <h1 className="font-display font-bold text-3xl text-slate-900 dark:text-white">Multi-Product Spec Matrix</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Compare up to 3 premium products side-by-side with objective calculations and pros & cons.
          </p>
        </div>
        {compareList.length > 0 && (
          <button
            onClick={clearCompare}
            className="px-4 py-2 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl text-xs font-semibold hover:bg-rose-500 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" /> Clear All Items
          </button>
        )}
      </div>

      {compareList.length === 0 ? (
        // Empty state
        <div className="p-16 text-center bg-white dark:bg-slate-900 border border-slate-200/10 dark:border-white/5 rounded-3xl flex flex-col items-center justify-center gap-4 max-w-xl mx-auto">
          <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-display font-bold text-slate-900 dark:text-white text-lg">Compare Deck is Empty</h3>
            <p className="text-xs text-slate-400 leading-relaxed mt-1">
              Select products from our catalog page by ticking the **Compare** checkbox to stack specs and ratings side-by-side.
            </p>
          </div>
          <button 
            onClick={() => navigate('#products')}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            Go to Riding Catalog
          </button>
        </div>
      ) : (
        // Comparison Matrix
        <div className="overflow-x-auto">
          <div className="min-w-[800px] grid gap-6" style={{ gridTemplateColumns: `160px repeat(${compareList.length}, minmax(200px, 1fr))` }}>
            
            {/* COLUMN 1: STICKY LABELS, COLUMNS 2..N: PRODUCTS */}
            {/* ROW 1: IMAGES AND GENERAL */}
            <div className="flex items-center text-xs font-mono text-slate-400 uppercase font-bold">General Info</div>
            {compareList.map((product, idx) => {
              const score = getScore(product);
              const isWinner = idx === winnerIndex;
              return (
                <div key={product.id} className="relative p-5 bg-white dark:bg-slate-900 border border-slate-200/10 dark:border-white/5 rounded-3xl flex flex-col justify-between">
                  {isWinner && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-blue-500 border border-blue-300 text-white text-[9px] font-extrabold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 tracking-wider uppercase">
                      <Award className="w-3.5 h-3.5" /> Best Overall Score
                    </div>
                  )}

                  <button
                    onClick={() => toggleCompare(product)}
                    className="absolute top-3 right-3 text-slate-400 hover:text-rose-500 transition-colors p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="text-center">
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="w-32 h-32 object-cover rounded-2xl mx-auto mb-4 border border-slate-200/10"
                    />
                    <span className="text-[10px] font-mono text-slate-400 uppercase block tracking-wider">{product.brand.replace('-', ' ')}</span>
                    <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white leading-snug hover:text-blue-500 cursor-pointer" onClick={() => navigate(`#product/${product.slug}`)}>
                      {product.name}
                    </h3>
                  </div>

                  <div className="mt-4 border-t border-slate-100 dark:border-slate-800 pt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Rider Rating:</span>
                      <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {product.rating}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Lowest Rate:</span>
                      <span className="font-mono font-bold text-blue-600 dark:text-blue-400">₹{product.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* ROW 2: RECOMMENDATION SCORES */}
            <div className="flex items-center text-xs font-mono text-slate-400 uppercase font-bold">Recommendation</div>
            {compareList.map((product) => {
              const score = getScore(product);
              return (
                <div key={product.id} className="p-5 bg-white dark:bg-slate-900/40 border border-slate-200/10 dark:border-white/5 rounded-3xl text-center">
                  <div className="text-2xl font-mono font-bold text-blue-600 dark:text-blue-400 mb-1">{score} / 100</div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mb-1">
                    <div className="bg-blue-600 h-full" style={{ width: `${score}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Value & Safety Index</span>
                </div>
              );
            })}

            {/* ROW 3: SPECIFICATIONS */}
            <div className="flex items-center text-xs font-mono text-slate-400 uppercase font-bold">Detailed Specs</div>
            {compareList.map((p) => <div key={p.id} className="h-px border-b border-slate-200/10 dark:border-white/5" />)}

            {specKeys.map(key => (
              <React.Fragment key={key}>
                <div className="flex items-center text-xs text-slate-400 font-bold font-mono py-2 pr-3 uppercase text-[10px] border-b border-slate-100 dark:border-slate-800/40">
                  {key}
                </div>
                {compareList.map(product => {
                  const specVal = (product.specifications as Record<string, string>)?.[key] || 'Not specified';
                  return (
                    <div key={product.id} className="text-xs text-slate-800 dark:text-slate-300 font-semibold py-3 px-4 bg-slate-50/50 dark:bg-slate-950/20 border-b border-slate-100 dark:border-slate-800/40 rounded-xl leading-relaxed">
                      {specVal}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}

            {/* ROW 4: PROS */}
            <div className="flex items-center text-xs font-mono text-slate-400 uppercase font-bold">Advantage Pros</div>
            {compareList.map((product) => (
              <div key={product.id} className="p-5 bg-emerald-500/5 border border-emerald-500/10 rounded-3xl flex flex-col gap-2">
                {product.pros.map((p: string, i: number) => (
                  <div key={i} className="flex gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span className="leading-normal">{p}</span>
                  </div>
                ))}
              </div>
            ))}

            {/* ROW 5: CONS */}
            <div className="flex items-center text-xs font-mono text-slate-400 uppercase font-bold">Weakness Cons</div>
            {compareList.map((product) => (
              <div key={product.id} className="p-5 bg-rose-500/5 border border-rose-500/10 rounded-3xl flex flex-col gap-2">
                {product.cons.map((c: string, i: number) => (
                  <div key={i} className="flex gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                    <span className="text-rose-500 font-bold">✗</span>
                    <span className="leading-normal">{c}</span>
                  </div>
                ))}
              </div>
            ))}

            {/* ROW 6: ACTIONS */}
            <div className="flex items-center text-xs font-mono text-slate-400 uppercase font-bold">Affiliate Hub</div>
            {compareList.map((product) => (
              <div key={product.id} className="p-4 bg-slate-100 dark:bg-slate-950 rounded-3xl flex flex-col gap-2">
                {product.affiliateLinks.slice(0, 2).map((link: any, idx: number) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-between items-center p-2.5 bg-white dark:bg-slate-900 border border-slate-200/10 dark:border-white/5 rounded-xl text-xs hover:border-blue-500/50 transition-all font-semibold"
                  >
                    <span className="text-slate-600 dark:text-slate-400 uppercase text-[9px]">{link.platform}</span>
                    <span className="text-blue-600 dark:text-blue-400 font-mono">₹{link.price.toLocaleString()}</span>
                  </a>
                ))}
                
                <button
                  onClick={() => navigate(`#product/${product.slug}`)}
                  className="w-full mt-2 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
                >
                  <span>All Marketplace Deals</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            ))}

          </div>
        </div>
      )}
    </div>
  );
};
