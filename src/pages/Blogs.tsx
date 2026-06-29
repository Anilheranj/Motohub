/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../AppContext';
import { SEO } from '../components/SEO';
import { 
  BookOpen, 
  Clock, 
  User, 
  ChevronRight, 
  ArrowLeft, 
  ListOrdered, 
  Share2, 
  AlertTriangle,
  Sparkles,
  ClipboardCheck
} from 'lucide-react';

export const Blogs: React.FC = () => {
  const { blogs, currentHash, navigate } = useApp();
  const [activeBlog, setActiveBlog] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  // Parse active blog slug from hash
  useEffect(() => {
    const parts = currentHash.split('/');
    if (parts.length > 1 && parts[0] === '#blog') {
      const slug = parts[1].split('?')[0];
      const matched = blogs.find(b => b.slug === slug);
      if (matched) {
        setActiveBlog(matched);
      } else {
        setActiveBlog(null);
      }
    } else {
      setActiveBlog(null);
    }
  }, [currentHash, blogs]);

  // Handle simple markdown headings parser to render beautifully
  const renderContentAsHtml = (markdown: string) => {
    if (!markdown) return '';
    const lines = markdown.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('# ')) {
        return <h1 key={idx} className="font-display font-bold text-3xl text-slate-900 dark:text-white mt-8 mb-4 border-b border-slate-200/10 pb-2">{trimmed.slice(2)}</h1>;
      }
      if (trimmed.startsWith('## ')) {
        return <h2 key={idx} className="font-display font-bold text-xl text-slate-900 dark:text-white mt-6 mb-3">{trimmed.slice(3)}</h2>;
      }
      if (trimmed.startsWith('### ')) {
        return <h3 key={idx} className="font-display font-bold text-base text-slate-900 dark:text-white mt-5 mb-2">{trimmed.slice(4)}</h3>;
      }
      if (trimmed.startsWith('* ')) {
        return (
          <div key={idx} className="flex gap-2 text-sm text-slate-600 dark:text-slate-300 mb-1.5 ml-4">
            <span className="text-orange-500 font-bold">•</span>
            <span>{trimmed.slice(2)}</span>
          </div>
        );
      }
      if (trimmed.startsWith('1. ') || trimmed.startsWith('2. ') || trimmed.startsWith('3. ')) {
        return (
          <div key={idx} className="flex gap-2 text-sm text-slate-600 dark:text-slate-300 mb-1.5 ml-4">
            <span className="text-orange-500 font-mono font-bold text-[11px]">{trimmed.substring(0, 2)}</span>
            <span>{trimmed.substring(3)}</span>
          </div>
        );
      }
      if (trimmed === '---') {
        return <hr key={idx} className="border-slate-200/10 my-6" />;
      }
      if (trimmed === '') {
        return <div key={idx} className="h-3" />;
      }
      // Standard paragraph. Let's make sure we support bold markers **text**
      let parts: any[] = [trimmed];
      if (trimmed.includes('**')) {
        const regex = /\*\*(.*?)\*\*/g;
        let match;
        let lastIndex = 0;
        const tempParts = [];
        while ((match = regex.exec(trimmed)) !== null) {
          const textBefore = trimmed.substring(lastIndex, match.index);
          const boldText = match[1];
          if (textBefore) tempParts.push(textBefore);
          tempParts.push(<strong key={match.index} className="text-orange-500 font-bold">{boldText}</strong>);
          lastIndex = regex.lastIndex;
        }
        const remaining = trimmed.substring(lastIndex);
        if (remaining) tempParts.push(remaining);
        parts = tempParts;
      }

      return <p key={idx} className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{parts}</p>;
    });
  };

  // Extract headings from markdown content to construct Table of Contents
  const getTableOfContents = (markdown: string) => {
    if (!markdown) return [];
    const lines = markdown.split('\n');
    return lines
      .filter(l => l.trim().startsWith('## '))
      .map(l => l.trim().substring(3));
  };

  // List of filtered blogs
  const filteredBlogs = activeCategory === 'all'
    ? blogs
    : blogs.filter(b => b.category.toLowerCase() === activeCategory.toLowerCase());

  // DETAIL VIEW
  if (activeBlog) {
    const toc = getTableOfContents(activeBlog.content);

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 fade-in">
        <SEO 
          title={activeBlog.title} 
          description={activeBlog.summary}
          keywords={activeBlog.tags}
          type="article"
        />

        {/* Back Link */}
        <button
          onClick={() => navigate('#blogs')}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-orange-500 mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Research & Guides
        </button>

        {/* HERO TITLE & META */}
        <div className="max-w-4xl mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-orange-500 bg-orange-500/10 px-2.5 py-1 rounded-lg">
              {activeBlog.category}
            </span>
            <div className="flex items-center gap-1 text-xs text-slate-400 font-mono">
              <Clock className="w-3.5 h-3.5" />
              <span>{activeBlog.readTime}</span>
            </div>
            <span className="text-slate-500 font-mono text-xs">•</span>
            <span className="text-slate-400 text-xs font-mono">{activeBlog.createdDate}</span>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white leading-tight">
            {activeBlog.title}
          </h1>
        </div>

        {/* Hero image banner */}
        <div className="rounded-3xl overflow-hidden h-[300px] sm:h-[420px] mb-12 border border-slate-200/10">
          <img src={activeBlog.image} alt={activeBlog.title} className="w-full h-full object-cover" />
        </div>

        {/* GRID LAYOUT: LEFT SIDE: ARTICLE, RIGHT SIDE: WRAPPERS (TOC & AUTHOR) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* ARTICLE CONTENT (Col 8) */}
          <article className="lg:col-span-8 bg-white dark:bg-slate-900/40 border border-slate-200/10 dark:border-white/5 p-6 sm:p-10 rounded-3xl">
            {renderContentAsHtml(activeBlog.content)}
            
            {/* Tag pills */}
            <div className="flex flex-wrap gap-2 border-t border-slate-100 dark:border-slate-800 pt-6 mt-8">
              {activeBlog.tags.map((tag: string) => (
                <span 
                  key={tag}
                  onClick={() => navigate(`#products?q=${encodeURIComponent(tag)}`)}
                  className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-mono font-bold rounded-lg cursor-pointer hover:bg-orange-500/10 hover:text-orange-500 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </article>

          {/* SIDE UTILITIES (Col 4) */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Table of Contents */}
            {toc.length > 0 && (
              <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/10 dark:border-white/5 rounded-3xl">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-4 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <ListOrdered className="w-4 h-4 text-orange-500" /> Table of Contents
                </h4>
                <div className="flex flex-col gap-2.5">
                  {toc.map((heading, i) => (
                    <div key={i} className="flex gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-orange-500 cursor-pointer">
                      <ChevronRight className="w-3.5 h-3.5 shrink-0 text-orange-500/40" />
                      <span>{heading}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Author profile card */}
            <div className="p-6 bg-slate-100 dark:bg-slate-900 rounded-3xl border border-slate-200/10 dark:border-white/5 flex gap-4">
              <img 
                src={activeBlog.author.avatar} 
                alt={activeBlog.author.name} 
                className="w-12 h-12 rounded-2xl object-cover border-2 border-slate-800 shrink-0" 
              />
              <div>
                <span className="block text-[10px] text-orange-500 font-mono uppercase tracking-wider mb-0.5">Verified Author</span>
                <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white leading-tight">
                  {activeBlog.author.name}
                </h4>
                <p className="text-[11px] text-slate-400 leading-normal mt-1">
                  {activeBlog.author.role}
                </p>
              </div>
            </div>

            {/* Affiliate Disclaimer Reminder */}
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 text-slate-500 text-[10px] leading-relaxed">
              <span className="font-bold text-slate-400 block mb-1">Disclaimer on Reviews</span>
              All ratings, buying advice, and specs columns are researched independently. MotoGear Hub may earn affiliate fees if you redirect and buy.
            </div>

          </aside>

        </div>
      </div>
    );
  }

  // LIST VIEW
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 fade-in">
      <SEO 
        title="Rider Guides & Safety Standards Research" 
        description="Read comprehensive guides, ECE 22.06 certified reviews, D3O impact protector explanations, and winter touring accessories lists."
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 border-b border-slate-200/10 dark:border-white/5 pb-8">
        <div>
          <span className="text-xs font-bold font-mono tracking-wider text-orange-500 uppercase block mb-1">Expert Rider Library</span>
          <h1 className="font-display font-bold text-3xl text-slate-900 dark:text-white">Buying Guides & Research</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Educate yourself on structural safety certifications, fabric materials, and cruiser setups.
          </p>
        </div>

        {/* Category toggles */}
        <div className="flex gap-2">
          {['all', 'Safety', 'Touring'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-orange-500/10 border-orange-500 text-orange-500'
                  : 'bg-transparent border-slate-200/15 text-slate-400 hover:border-slate-300'
              }`}
            >
              {cat === 'all' ? 'All Guides' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* List grids */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredBlogs.map(blog => (
          <div 
            key={blog.id}
            onClick={() => navigate(`#blog/${blog.slug}`)}
            className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/10 dark:border-white/5 overflow-hidden cursor-pointer hover:-translate-y-1 transition-all"
          >
            <div className="h-48 overflow-hidden bg-slate-100 dark:bg-slate-950/40">
              <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-all" />
            </div>
            
            <div className="p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase text-orange-500 font-bold">
                <span>{blog.category}</span>
                <span>•</span>
                <span>{blog.readTime}</span>
              </div>
              <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-orange-500 transition-colors">
                {blog.title}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {blog.summary}
              </p>
              
              <div className="border-t border-slate-200/10 mt-2 pt-3 flex items-center justify-between text-[11px] font-semibold text-orange-500">
                <span>Read Full Analysis</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
