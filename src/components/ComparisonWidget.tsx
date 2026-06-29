/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../AppContext';
import { Sliders, X, Sparkles } from 'lucide-react';

export const ComparisonWidget: React.FC = () => {
  const { compareList, toggleCompare, clearCompare, navigate } = useApp();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-xl bg-slate-900/90 dark:bg-slate-950/95 backdrop-blur-xl border border-blue-500/30 rounded-3xl shadow-2xl p-4 flex items-center justify-between gap-4 animate-fadeIn">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-500 hidden sm:flex shrink-0">
          <Sliders className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <div className="text-xs font-bold text-white flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Product Comparison</span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono">
            {compareList.length} of 3 items selected
          </div>
        </div>
      </div>

      {/* Selected thumbnails */}
      <div className="flex items-center gap-2 overflow-x-auto max-w-[150px] sm:max-w-xs py-1">
        {compareList.map(item => (
          <div key={item.id} className="relative group shrink-0">
            <img
              src={item.images[0]}
              alt={item.name}
              className="w-10 h-10 rounded-xl object-cover border border-slate-700/60"
            />
            <button
              onClick={() => toggleCompare(item)}
              className="absolute -top-1 -right-1 p-0.5 bg-rose-600 text-white rounded-full hover:scale-110 transition-transform cursor-pointer"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </div>
        ))}
        
        {compareList.length < 3 && (
          <div className="w-10 h-10 rounded-xl border border-dashed border-slate-700 flex items-center justify-center text-slate-500 text-xs font-bold font-mono">
            +
          </div>
        )}
      </div>

      {/* Button controls */}
      <div className="flex gap-2">
        <button
          onClick={clearCompare}
          className="px-2.5 py-1.5 text-[10px] font-bold text-slate-400 hover:text-white uppercase transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
        >
          Clear
        </button>
        <button
          onClick={() => navigate('#compare')}
          disabled={compareList.length < 2}
          className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 cursor-pointer"
        >
          Compare Now ({compareList.length})
        </button>
      </div>
    </div>
  );
};
