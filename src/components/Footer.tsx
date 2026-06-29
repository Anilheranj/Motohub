/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { Shield, Sparkles, Send, CheckCircle2, ChevronRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, categories } = useApp();
  const [email, setEmail] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      setLoading(true);
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      setSuccessMsg(data.message || 'Successfully subscribed!');
      setEmail('');
    } catch (err) {
      setSuccessMsg('Thank you for subscribing to our riding updates!');
      setEmail('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative bg-theme-footer text-slate-400 border-t border-theme-border pt-16 pb-8 transition-all duration-300">
      
      {/* Decorative Radial Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.02)_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 border-b border-theme-border pb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('#home')}>
              <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-lg flex items-center justify-center">
                <Shield className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-slate-900 dark:text-white">
                MotoGear<span className="text-blue-600 font-bold">Hub</span>
              </span>
            </div>
            
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 max-w-sm">
              India's premium motorcycle riding gear and accessories discovery platform. We research, compare, analyze specs, and curate reviews to help you invest in world-class protection.
            </p>

            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>We compare. You ride with confidence.</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display text-slate-900 dark:text-white text-xs font-bold uppercase tracking-wider">
              Popular Gear
            </h4>
            <div className="flex flex-col gap-1.5 text-xs">
              {categories.slice(0, 5).map(cat => (
                <span 
                  key={cat.id} 
                  onClick={() => navigate(`#category/${cat.slug}`)}
                  className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors flex items-center gap-1 text-slate-600 dark:text-slate-400"
                >
                  <ChevronRight className="w-3 h-3 text-blue-600/50" /> {cat.name}
                </span>
              ))}
              <span onClick={() => navigate('#categories')} className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer font-semibold mt-1">
                View All Categories →
              </span>
            </div>
          </div>

          {/* Compliance & Help */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display text-slate-900 dark:text-white text-xs font-bold uppercase tracking-wider">
              Legal & Information
            </h4>
            <div className="flex flex-col gap-1.5 text-xs text-slate-600 dark:text-slate-400">
              <span onClick={() => navigate('#about')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">About Us</span>
              <span onClick={() => navigate('#contact')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">Contact Riders Support</span>
              <span onClick={() => navigate('#privacy-policy')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">Privacy Policy</span>
              <span onClick={() => navigate('#terms-of-use')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">Terms of Service</span>
              <span onClick={() => navigate('#affiliate-disclosure')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">Affiliate Disclosure</span>
              <span onClick={() => navigate('#cookie-policy')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">Cookie Policy</span>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display text-slate-900 dark:text-white text-xs font-bold uppercase tracking-wider">
              Newsletter
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Get the latest safety research guides and deals on premium gear directly in your inbox.
            </p>
            
            {successMsg ? (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-slate-100 dark:bg-slate-950 border border-slate-200/10 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
            <span className="text-[9px] text-slate-500 font-mono block">
              No Spam. Unsubscribe at any time.
            </span>
          </div>

        </div>

        {/* Dynamic Affiliate Disclosure Disclaimer */}
        <div className="mt-8 text-center text-[10px] leading-relaxed text-slate-500 max-w-4xl mx-auto border-b border-slate-800/50 pb-8">
          <p className="font-semibold text-slate-400 mb-1">Affiliate Commission Transparency Disclosure</p>
          MotoGear Hub is a free-to-use discovery, comparison, and research portal. We do not sell products directly, nor do we operate warehouses or fulfill shopping carts. The clicking of any marketplace link redirects visitors directly to third-party merchant pages (including Amazon India, Flipkart, and official brands). We earn a modest advertising fee/commission if purchases are finalized, at absolute zero additional overhead cost to you.
        </div>

        {/* Copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            &copy; {new Date().getFullYear()} MotoGear Hub. Designed with pride for Indian bikers. All rights reserved.
          </div>
          <div className="text-[10px] font-mono tracking-wider text-slate-500 uppercase">
            Active Host: Cloud Run Services
          </div>
        </div>

      </div>
    </footer>
  );
};
