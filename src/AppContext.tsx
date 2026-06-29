/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category, Brand, Blog } from './types';
import { initClientAuth, googleSignIn, logoutGoogle } from './lib/firebaseAuth';

interface AppContextType {
  currentHash: string;
  navigate: (hash: string) => void;
  products: Product[];
  categories: Category[];
  brands: Brand[];
  blogs: Blog[];
  loading: boolean;
  wishlist: string[]; // array of product IDs
  toggleWishlist: (productId: string) => void;
  compareList: Product[]; // max 3
  toggleCompare: (product: Product) => void;
  clearCompare: () => void;
  isAdmin: boolean;
  adminToken: string | null;
  setAdminLoggedIn: (token: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategoryFilter: string;
  setActiveCategoryFilter: (cat: string) => void;
  activeBrandFilter: string;
  setActiveBrandFilter: (brand: string) => void;
  refreshData: () => Promise<void>;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  // Google Workspace Integration Auth States
  googleUser: any | null;
  googleToken: string | null;
  loginWithGoogle: () => Promise<void>;
  logoutFromGoogle: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentHash, setCurrentHash] = useState<string>(window.location.hash || '#home');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Google Workspace Auth Session State
  const [googleUser, setGoogleUser] = useState<any | null>(null);
  const [googleToken, setGoogleToken] = useState<string | null>(null);
  
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('motogear_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [activeBrandFilter, setActiveBrandFilter] = useState<string>('all');
  
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('motogear_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  // Sync theme with DOM root to ensure dark: classes work flawlessly everywhere
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
    localStorage.setItem('motogear_theme', theme);
  }, [theme]);

  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminToken, setAdminToken] = useState<string | null>(() => {
    return localStorage.getItem('motogear_admin_token');
  });

  // Handle Hash Changes
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Fetch Data from Full-stack Express APIs
  const fetchData = async () => {
    try {
      setLoading(true);
      const [resProd, resCat, resBrand, resBlog] = await Promise.all([
        fetch('/api/products').then(r => r.json()),
        fetch('/api/categories').then(r => r.json()),
        fetch('/api/brands').then(r => r.json()),
        fetch('/api/blogs').then(r => r.json())
      ]);

      if (Array.isArray(resProd)) setProducts(resProd);
      if (Array.isArray(resCat)) setCategories(resCat);
      if (Array.isArray(resBrand)) setBrands(resBrand);
      if (Array.isArray(resBlog)) setBlogs(resBlog);
    } catch (err) {
      console.error('Error fetching platform data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Verify Admin Login Session on load
  useEffect(() => {
    if (adminToken) {
      fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${adminToken}` }
      })
      .then(res => res.json())
      .then(data => {
        if (data.isAuthenticated) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          setAdminToken(null);
          localStorage.removeItem('motogear_admin_token');
        }
      })
      .catch(() => {
        setIsAdmin(false);
      });
    }
  }, [adminToken]);

  const setAdminLoggedIn = (token: string | null) => {
    setAdminToken(token);
    if (token) {
      setIsAdmin(true);
      localStorage.setItem('motogear_admin_token', token);
    } else {
      setIsAdmin(false);
      localStorage.removeItem('motogear_admin_token');
      // Call server logout
      fetch('/api/auth/logout', { method: 'POST' });
    }
  };

  // Navigations
  const navigate = (hash: string) => {
    window.location.hash = hash;
  };

  // Wishlist actions
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const updated = prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId];
      localStorage.setItem('motogear_wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  // Comparison actions
  const toggleCompare = (product: Product) => {
    setCompareList(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 3) {
        alert('You can compare a maximum of 3 motorcycle products at once.');
        return prev;
      }
      return [...prev, product];
    });
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  // Theme Toggling
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('motogear_theme', nextTheme);
  };

  // Google client auth state sync on mount
  useEffect(() => {
    const unsubscribe = initClientAuth(
      (user, token) => {
        setGoogleUser(user);
        setGoogleToken(token);
      },
      () => {
        setGoogleUser(null);
        setGoogleToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      const res = await googleSignIn();
      if (res) {
        setGoogleUser(res.user);
        setGoogleToken(res.accessToken);
      }
    } catch (err) {
      console.error('Google Sign-In failed:', err);
    }
  };

  const logoutFromGoogle = async () => {
    await logoutGoogle();
    setGoogleUser(null);
    setGoogleToken(null);
  };

  return (
    <AppContext.Provider value={{
      currentHash,
      navigate,
      products,
      categories,
      brands,
      blogs,
      loading,
      wishlist,
      toggleWishlist,
      compareList,
      toggleCompare,
      clearCompare,
      isAdmin,
      adminToken,
      setAdminLoggedIn,
      searchQuery,
      setSearchQuery,
      activeCategoryFilter,
      setActiveCategoryFilter,
      activeBrandFilter,
      setActiveBrandFilter,
      refreshData: fetchData,
      theme,
      toggleTheme,
      // Google Workspace bindings
      googleUser,
      googleToken,
      loginWithGoogle,
      logoutFromGoogle
    }}>
      <div className={theme === 'dark' ? 'dark text-slate-200 bg-theme-bg min-h-screen font-sans selection:bg-primary selection:text-white' : 'text-slate-800 bg-theme-bg min-h-screen font-sans selection:bg-primary selection:text-white'}>
        {children}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used inside an AppProvider');
  return context;
};
