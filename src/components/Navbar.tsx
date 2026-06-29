/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../AppContext';
import { Search, Heart, Sliders, Shield, Sun, Moon, LogOut, CheckCircle2, ChevronDown, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    navigate,
    currentHash,
    categories,
    products,
    wishlist,
    compareList,
    theme,
    toggleTheme,
    isAdmin,
    setAdminLoggedIn
  } = useApp();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCatDropdown, setShowCatDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter matching items dynamically for autocomplete
  const suggestions = searchVal.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchVal.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchVal.toLowerCase()) ||
        p.category.toLowerCase().includes(searchVal.toLowerCase())
      ).slice(0, 5)
    : [];

  // Close search suggestions on click outside
  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', clickOutside);
    return () => document.removeEventListener('mousedown', clickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`#products?q=${encodeURIComponent(searchVal.trim())}`);
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const selectSuggestion = (slug: string) => {
    navigate(`#product/${slug}`);
    setSearchOpen(false);
    setSearchVal('');
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-200/10 dark:border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* LOGO AREA */}
        <div className="flex items-center gap-8 cursor-pointer" onClick={() => navigate('#home')}>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-display font-bold text-xl tracking-tight block text-slate-900 dark:text-white">
                MotoGear<span className="text-blue-600 font-bold">Hub</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest block text-slate-500 dark:text-slate-400 uppercase">
                India Curated
              </span>
            </div>
          </div>
 
          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-6">
            <span 
              onClick={() => navigate('#home')} 
              className={`text-sm font-medium cursor-pointer transition-colors ${currentHash === '#home' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'}`}>
              Home
            </span>
            
            {/* Category Mega Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setShowCatDropdown(true)}
              onMouseLeave={() => setShowCatDropdown(false)}
            >
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer flex items-center gap-1">
                Categories <ChevronDown className="w-3.5 h-3.5" />
              </span>
              {showCatDropdown && (
                <div className="absolute top-full left-0 w-64 mt-1 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/20 dark:border-white/10 p-4 grid grid-cols-1 gap-1 animate-fadeIn">
                  {categories.slice(0, 8).map(cat => (
                    <span 
                      key={cat.id} 
                      onClick={() => {
                        navigate(`#category/${cat.slug}`);
                        setShowCatDropdown(false);
                      }}
                      className="text-sm px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-blue-600/10 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-all duration-200 block"
                    >
                      {cat.name}
                    </span>
                  ))}
                  <div className="border-t border-slate-200/10 mt-2 pt-2">
                    <span 
                      onClick={() => {
                        navigate('#categories');
                        setShowCatDropdown(false);
                      }}
                      className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline px-3 cursor-pointer"
                    >
                      View All 26 Categories →
                    </span>
                  </div>
                </div>
              )}
            </div>
 
            <span 
              onClick={() => navigate('#products')} 
              className={`text-sm font-medium cursor-pointer transition-colors ${currentHash.startsWith('#products') ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'}`}>
              Explore Gear
            </span>
            <span 
              onClick={() => navigate('#compare')} 
              className={`text-sm font-medium cursor-pointer transition-colors ${currentHash === '#compare' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'}`}>
              Compare Widget
            </span>
            <span 
              onClick={() => navigate('#blogs')} 
              className={`text-sm font-medium cursor-pointer transition-colors ${currentHash.startsWith('#blogs') ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'}`}>
              Buying Guides & Blogs
            </span>
            <span 
              onClick={() => navigate('#about')} 
              className={`text-sm font-medium cursor-pointer transition-colors ${currentHash === '#about' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'}`}>
              About
            </span>
            <span 
              onClick={() => navigate('#contact')} 
              className={`text-sm font-medium cursor-pointer transition-colors ${currentHash === '#contact' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'}`}>
              Contact
            </span>
          </nav>
        </div>

        {/* SEARCH AND QUICK ACTIONS */}
        <div className="flex items-center gap-4">
          
          {/* Autocomplete Search Container */}
          <div ref={searchRef} className="relative hidden md:block w-64 lg:w-80">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search helmets, jacket, intercoms..."
                  value={searchVal}
                  onChange={(e) => {
                    setSearchVal(e.target.value);
                    setSearchOpen(true);
                  }}
                  onFocus={() => setSearchOpen(true)}
                  className="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/20 dark:border-white/5 focus:outline-none focus:border-blue-600 text-sm transition-all"
                />
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              </div>
            </form>
 
            {/* Suggestions Dropdown */}
            {searchOpen && (searchVal.trim() !== '') && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200/20 dark:border-white/15 rounded-2xl shadow-2xl p-2 z-50 animate-fadeIn">
                {suggestions.length > 0 ? (
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-3 py-1">
                      Matched Riding Gear
                    </div>
                    {suggestions.map(item => (
                      <div
                        key={item.id}
                        onClick={() => selectSuggestion(item.slug)}
                        className="flex items-center gap-3 p-2 hover:bg-blue-600/10 rounded-xl cursor-pointer transition-all"
                      >
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div className="flex-1 overflow-hidden">
                          <div className="text-xs font-semibold truncate text-slate-900 dark:text-white">{item.name}</div>
                          <div className="text-[10px] text-slate-500 uppercase font-mono">{item.brand} • ₹{item.price.toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
                    <div 
                      onClick={handleSearchSubmit}
                      className="text-xs text-center text-blue-600 dark:text-blue-400 font-semibold p-2 border-t border-slate-200/10 mt-1 hover:underline cursor-pointer"
                    >
                      Search all results for "{searchVal}"
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-slate-500 p-3 text-center">
                    No accessories found for "{searchVal}"
                  </div>
                )}
              </div>
            )}
          </div>
 
          {/* Quick links & Dark mode */}
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/10 hover:text-blue-600 dark:hover:text-blue-400 transition-all cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-4.5 h-4.5 text-blue-400" /> : <Moon className="w-4.5 h-4.5 text-slate-700" />}
          </button>
 
          {/* Wishlist Link */}
          <button 
            onClick={() => navigate('#wishlist')}
            className="relative p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/10 hover:text-blue-600 dark:hover:text-blue-400 transition-all cursor-pointer"
          >
            <Heart className="w-4.5 h-4.5 text-rose-500" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-mono text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
          </button>
 
          {/* Compare Counter Bubble */}
          <button 
            onClick={() => navigate('#compare')}
            className="relative p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/10 hover:text-blue-600 dark:hover:text-blue-400 transition-all cursor-pointer"
          >
            <Sliders className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400" />
            {compareList.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white font-mono text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {compareList.length}
              </span>
            )}
          </button>
 
          {/* Admin Indicator */}
          {isAdmin ? (
            <button 
              onClick={() => navigate('#admin')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-semibold transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Dashboard
            </button>
          ) : (
            <button 
              onClick={() => navigate('#admin')}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/10 hover:border-blue-500/50 hover:text-blue-600 text-xs font-semibold transition-all cursor-pointer text-slate-600 dark:text-slate-300"
            >
              <Shield className="w-3.5 h-3.5" /> Admin
            </button>
          )}

          {/* MOBILE NAV TOGGLE */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/10 text-slate-700 dark:text-slate-200 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
          </button>

        </div>
      </div>

      {/* MOBILE DROPDOWN DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-950 border-t border-slate-200/10 py-4 px-4 flex flex-col gap-3 animate-fadeIn">
          {/* Autocomplete Search for Mobile */}
          <form onSubmit={handleSearchSubmit} className="relative mb-2">
            <input
              type="text"
              placeholder="Search helmets, gear..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/20 focus:outline-none text-sm"
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          </form>

          <span onClick={() => { navigate('#home'); setMobileMenuOpen(false); }} className="text-sm font-semibold text-slate-800 dark:text-slate-200 py-2 border-b border-slate-200/10">Home</span>
          <span onClick={() => { navigate('#categories'); setMobileMenuOpen(false); }} className="text-sm font-semibold text-slate-800 dark:text-slate-200 py-2 border-b border-slate-200/10">Categories</span>
          <span onClick={() => { navigate('#products'); setMobileMenuOpen(false); }} className="text-sm font-semibold text-slate-800 dark:text-slate-200 py-2 border-b border-slate-200/10">Explore Gear</span>
          <span onClick={() => { navigate('#compare'); setMobileMenuOpen(false); }} className="text-sm font-semibold text-slate-800 dark:text-slate-200 py-2 border-b border-slate-200/10">Compare</span>
          <span onClick={() => { navigate('#blogs'); setMobileMenuOpen(false); }} className="text-sm font-semibold text-slate-800 dark:text-slate-200 py-2 border-b border-slate-200/10">Blogs & Guides</span>
          <span onClick={() => { navigate('#about'); setMobileMenuOpen(false); }} className="text-sm font-semibold text-slate-800 dark:text-slate-200 py-2 border-b border-slate-200/10">About Us</span>
          <span onClick={() => { navigate('#contact'); setMobileMenuOpen(false); }} className="text-sm font-semibold text-slate-800 dark:text-slate-200 py-2 border-b border-slate-200/10">Contact</span>
          
          <div className="flex gap-2 mt-2">
            <button 
              onClick={() => { navigate('#admin'); setMobileMenuOpen(false); }}
              className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs text-center flex items-center justify-center gap-1"
            >
              <Shield className="w-3.5 h-3.5" /> Admin Panel
            </button>
            {isAdmin && (
              <button 
                onClick={() => setAdminLoggedIn(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/10 text-rose-500 flex items-center justify-center"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
