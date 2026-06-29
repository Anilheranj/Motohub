/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ComparisonWidget } from './components/ComparisonWidget';
import { AIChatBot } from './components/AIChatBot';

// Pages
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { Comparison } from './pages/Comparison';
import { Blogs } from './pages/Blogs';
import { AdminDashboard } from './pages/AdminDashboard';
import { 
  About, 
  Contact, 
  Wishlist, 
  CategoriesList, 
  BrandsList, 
  Compliance, 
  NotFound 
} from './pages/StaticPages';

// Layout & Route Switcher Component
const AppContent: React.FC = () => {
  const { currentHash } = useApp();

  // Simple, powerful hash-based router
  const renderRoute = () => {
    const cleanHash = currentHash.split('?')[0]; // Strip search/query params

    if (cleanHash === '' || cleanHash === '#' || cleanHash === '#home') {
      return <Home />;
    }
    if (cleanHash === '#products') {
      return <Products />;
    }
    if (cleanHash.startsWith('#product/')) {
      return <ProductDetails />;
    }
    if (cleanHash === '#compare') {
      return <Comparison />;
    }
    if (cleanHash === '#blogs' || cleanHash.startsWith('#blog/')) {
      return <Blogs />;
    }
    if (cleanHash === '#about') {
      return <About />;
    }
    if (cleanHash === '#contact') {
      return <Contact />;
    }
    if (cleanHash === '#wishlist') {
      return <Wishlist />;
    }
    if (cleanHash === '#categories') {
      return <CategoriesList />;
    }
    if (cleanHash === '#brands') {
      return <BrandsList />;
    }
    if (cleanHash === '#privacy') {
      return <Compliance type="privacy" />;
    }
    if (cleanHash === '#terms') {
      return <Compliance type="terms" />;
    }
    if (cleanHash === '#affiliate-disclosure') {
      return <Compliance type="affiliate" />;
    }
    if (cleanHash === '#cookie-policy') {
      return <Compliance type="cookie" />;
    }
    if (cleanHash === '#admin') {
      return <AdminDashboard />;
    }

    return <NotFound />;
  };

  return (
    <div className="flex flex-col min-h-screen bg-theme-bg text-theme-body selection:bg-primary selection:text-white transition-colors duration-300">
      <Navbar />
      
      {/* Route Render Target with transition spacer */}
      <main className="flex-grow pt-10 pb-20">
        {renderRoute()}
      </main>

      <Footer />
      
      {/* Sticky Bottom Comparison Multi-Item Dock */}
      {cleanHashNotCompare(currentHash) && <ComparisonWidget />}

      {/* Floating AI Chat Assistant */}
      <AIChatBot />
    </div>
  );
};

// Helper to hide comparison widget on comparison page itself
const cleanHashNotCompare = (hash: string) => {
  return hash.split('?')[0] !== '#compare';
};

// Top-Level App Component wrapping context provider
export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
