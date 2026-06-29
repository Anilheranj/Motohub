/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../AppContext';
import { SEO } from '../components/SEO';
import { ProductCard } from '../components/ProductCard';
import { SlidersHorizontal, Search, Star, RefreshCcw, LayoutGrid, AlertCircle, Sparkles } from 'lucide-react';

export const Products: React.FC = () => {
  const {
    products,
    categories,
    brands,
    currentHash,
    navigate
  } = useApp();

  // Parse hash query params (e.g. #products?category=helmet&q=MT)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [maxPrice, setMaxPrice] = useState(40000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('newest');

  // Trigger filter update on hash changes
  useEffect(() => {
    const parseHashParams = () => {
      const parts = currentHash.split('?');
      if (parts.length > 1) {
        const queryStr = parts[1];
        const params = new URLSearchParams(queryStr);
        
        const q = params.get('q');
        const cat = params.get('category');
        const brand = params.get('brand');

        if (q) setSearchQuery(q);
        if (cat) setSelectedCategory(cat);
        if (brand) setSelectedBrand(brand);
      } else {
        // clear if no params
        setSearchQuery('');
        setSelectedCategory('all');
        setSelectedBrand('all');
      }
    };
    parseHashParams();
  }, [currentHash]);

  // Handle manual reset of filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedBrand('all');
    setMaxPrice(40000);
    setMinRating(0);
    setSortBy('newest');
    navigate('#products');
  };

  // Perform dynamic filtration
  const filteredProducts = products.filter(p => {
    // Search text match
    const matchesSearch = searchQuery.trim() === '' || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());

    // Category match
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;

    // Brand match
    const matchesBrand = selectedBrand === 'all' || p.brand === selectedBrand;

    // Price match
    const matchesPrice = p.price <= maxPrice;

    // Rating match
    const matchesRating = p.rating >= minRating;

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesRating;
  });

  // Sort
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'popular') return b.reviewCount - a.reviewCount;
    // default: newest
    return b.price - a.price; // simulating newest as higher quality
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 fade-in">
      <SEO 
        title="Explore Motorcycle Riding Gear & Accessories" 
        description="Compare prices, browse detailed technical specifications, pros, cons, and certified safety reviews for premium jackets, gloves, boots, and helmets."
        keywords={['motorcycle gear', 'certified helmets India', 'D3O riding jacket', 'riding boot safety review']}
      />

      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <span className="text-xs font-bold font-mono tracking-wider text-blue-600 dark:text-blue-400 uppercase block mb-1">Affiliate Comparisons</span>
          <h1 className="font-display font-bold text-3xl text-slate-900 dark:text-white">Riding Gear Discovery Catalog</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Displaying {sortedProducts.length} premium accessories matched from India's top riding portals.
          </p>
        </div>
        
        {/* Sort box */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-mono">Sort By:</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200/10 dark:border-white/5 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-600"
          >
            <option value="newest">Newest Launch</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Safety Rating</option>
            <option value="popular">Popularity Reviews</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* FILTERS PANEL */}
        <aside className="lg:col-span-1 flex flex-col gap-6">
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/10 dark:border-white/5 rounded-3xl flex flex-col gap-6">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Catalog Filters
              </h3>
              <button 
                onClick={resetFilters}
                className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.05] active:scale-[0.95]"
              >
                <RefreshCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Keyword Search */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Search Text</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Helmet, Jacket..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-100 dark:bg-slate-950/60 border border-slate-200/25 dark:border-white/5 rounded-xl text-xs focus:outline-none focus:border-blue-600"
                />
                <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-950/60 border border-slate-200/25 dark:border-white/5 rounded-xl text-xs focus:outline-none focus:border-blue-600 text-slate-700 dark:text-slate-300"
              >
                <option value="all">All Categories ({categories.length})</option>
                {categories.map(c => (
                  <option key={c.id} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Brand Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Brand</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-950/60 border border-slate-200/25 dark:border-white/5 rounded-xl text-xs focus:outline-none focus:border-blue-600 text-slate-700 dark:text-slate-300"
              >
                <option value="all">All Brands</option>
                {brands.map(b => (
                  <option key={b.id} value={b.slug}>{b.name}</option>
                ))}
              </select>
            </div>

            {/* Price slider */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-baseline text-xs">
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Max Budget</label>
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400 font-mono">₹{maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="3000"
                max="40000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                <span>₹3,000</span>
                <span>₹40,000</span>
              </div>
            </div>

            {/* Min Rating */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Minimum Rating</label>
              <div className="flex gap-1">
                {[0, 4.5, 4.7, 4.9].map(rate => (
                  <button
                    key={rate}
                    onClick={() => setMinRating(rate)}
                    className={`flex-1 py-1.5 rounded-lg border text-[10px] font-bold font-mono transition-all duration-300 ease-in-out hover:scale-[1.05] active:scale-[0.95] cursor-pointer ${
                      minRating === rate
                        ? 'bg-blue-500/10 border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'bg-transparent border-slate-200/20 text-slate-400 hover:border-slate-300/40'
                    }`}
                  >
                    {rate === 0 ? 'All' : `${rate}★+`}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Quick Notice Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-tr from-slate-900 to-blue-950/20 border border-blue-500/15 text-slate-400 text-[10px] leading-relaxed hidden lg:block">
            <span className="font-bold text-white block mb-1">Unbiased Curations</span>
            MotoGear Hub is entirely independent. We do not promote sponsors. We parse safety certifications (ECE 22.06, D3O) strictly to protect your spine and head.
          </div>
        </aside>

        {/* PRODUCTS GRID */}
        <section className="lg:col-span-3">
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white dark:bg-slate-900 border border-slate-200/10 dark:border-white/5 rounded-3xl flex flex-col items-center justify-center gap-4">
              <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-slate-900 dark:text-white">No Matching Gear Found</h3>
                <p className="text-xs text-slate-400 max-w-sm mt-1 mx-auto">
                  We couldn't find any premium motorcycle accessories with the currently selected filter bounds. Try broadening your pricing or tags.
                </p>
              </div>
              <button 
                onClick={resetFilters}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </section>

      </div>
    </div>
  );
};
