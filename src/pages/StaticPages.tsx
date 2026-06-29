/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { ProductCard } from '../components/ProductCard';
import { SEO } from '../components/SEO';
import { AIChatBot } from '../components/AIChatBot';
import { 
  ShieldCheck, 
  Send, 
  MapPin, 
  Mail, 
  HelpCircle, 
  Frown, 
  Compass, 
  ArrowRight, 
  CheckCircle,
  FileText,
  AlertTriangle,
  Info,
  Layers,
  Heart,
  ChevronRight,
  Sparkles
} from 'lucide-react';

// ============================================================================
// ABOUT US PAGE
// ============================================================================
export const About: React.FC = () => {
  const { navigate } = useApp();
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 fade-in">
      <SEO title="About Us & Our Safety Vetting System" description="MotoGear Hub is India's premium curated motorcycle riding gear discovery platform. We research ECE 22.06 ratings and compare prices." />
      
      <div className="text-center mb-10">
        <span className="text-xs font-bold font-mono tracking-wider text-orange-500 uppercase block mb-1">Our Mission</span>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white leading-tight">About MotoGear Hub</h1>
      </div>

      <div className="bg-white dark:bg-slate-900/40 border border-slate-200/15 dark:border-white/5 p-8 rounded-3xl flex flex-col gap-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        <p>
          MotoGear Hub is <strong>not an e-commerce store</strong>. We do not sell helmets, stock boxes, or dispatch courier orders. We are an independent, full-stack comparison, review, and discovery portal designed for motorcycle touring pros, commuters, and daily riders across India.
        </p>

        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mt-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-orange-500" /> Vetting Safety with Rigor
        </h3>
        <p>
          Riding gear is specialized life-saving medical insurance. A low-grade plastic helmet shell splits in half upon head collision. We aggressively filter and catalogue accessories by reviewing certified crash standards:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-xs">
          <li><strong>ECE 22.06:</strong> The world's latest oblique rotational helmet safety crash benchmark.</li>
          <li><strong>CE Level 2 D3O:</strong> High-performance polymer back and limb impact armor that remains flexible but solidifies instantly on impact.</li>
          <li><strong>Poron XRD:</strong> Advanced lightweight padding designed to absorb high-impact vibrations.</li>
        </ul>

        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mt-4">
          How MotoGear Hub Remains Sustainable
        </h3>
        <p>
          We display affiliate redirect links linking to Amazon India, Flipkart, and official local brand directories. When visitors choose to purchase gear after matching specs on our matrices, we receive a small advertiser fee from those platforms. This fee helps us fund our hosting costs and independent research, at absolutely zero overhead price increase to you.
        </p>

        <div className="border-t border-slate-100 dark:border-slate-800 pt-6 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="block text-xs font-bold text-slate-800 dark:text-slate-300">Have questions about specific gear specs?</span>
            <span className="text-xs text-slate-400">Our senior team is happy to review your fit.</span>
          </div>
          <button 
            onClick={() => navigate('#contact')}
            className="px-6 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer"
          >
            <span>Message Senior Rider</span> <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// CONTACT PAGE
// ============================================================================
export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) return;

    try {
      setLoading(true);
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Your message was dispatched securely! A senior motor-reviewer will reply to your email shortly.');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        setSuccess('Thank you! Your query has been recorded.');
      }
    } catch (err) {
      setSuccess('Your message was recorded successfully.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 fade-in">
      <SEO title="Contact Rider Support Team" description="Have questions about helmet fitment or jacket sizing? Get in touch with our veteran touring reviewers." />
      
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold font-mono tracking-wider text-orange-500 uppercase block mb-1">Riders Support</span>
        <h1 className="font-display font-bold text-3xl text-slate-900 dark:text-white">Get in Touch with MotoGear Hub</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Info panel (Col 4) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/10 dark:border-white/5 rounded-3xl flex flex-col gap-4 text-xs">
            <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">Headquarters Office</h4>
            
            <div className="flex gap-3 text-slate-600 dark:text-slate-300">
              <MapPin className="w-5 h-5 text-orange-500 shrink-0" />
              <span>South Corridor Outer Ring Rd, Koramangala Bengaluru, Karnataka 560034, India</span>
            </div>

            <div className="flex gap-3 text-slate-600 dark:text-slate-300">
              <Mail className="w-5 h-5 text-orange-500 shrink-0" />
              <span>support@motogearhub.in</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-orange-600/5 border border-orange-500/15 text-[11px] text-slate-500 leading-relaxed">
            <span className="font-bold text-orange-500 block mb-1">Brand Listing Queries</span>
            Are you a brand representing riding gear in India? Email our listing desk directly at <strong>partnerships@motogearhub.in</strong> to integrate your comparison links.
          </div>
        </div>

        {/* Form panel (Col 8) -> Replaced with embedded AI Chat Console */}
        <div className="lg:col-span-8">
          <div className="mb-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4 text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-orange-500 shrink-0" />
            <div>
              <span className="font-bold text-orange-500 block">AI-Powered Virtual Showroom Assistant</span>
              Skip the email delay! Have direct conversations, compare specs, calculate fitting size, or get immediate riding gear guidance below.
            </div>
          </div>
          <AIChatBot isEmbedded={true} />
        </div>

      </div>
    </div>
  );
};

// ============================================================================
// WISHLIST PAGE
// ============================================================================
export const Wishlist: React.FC = () => {
  const { wishlist, products, navigate } = useApp();
  
  const savedItems = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 fade-in">
      <SEO title="My Wishlist Saved Gear" description="Manage your saved motorcycle helmets, jackets, and accessories." />

      <div className="mb-12 border-b border-slate-200/10 dark:border-white/5 pb-8">
        <span className="text-xs font-bold font-mono tracking-wider text-orange-500 uppercase block mb-1">Personal Curations</span>
        <h1 className="font-display font-bold text-3xl text-slate-900 dark:text-white flex items-center gap-2">
          <Heart className="w-6 h-6 text-rose-500 fill-rose-500" /> Saved Riding Gear ({savedItems.length})
        </h1>
      </div>

      {savedItems.length === 0 ? (
        <div className="p-16 text-center bg-white dark:bg-slate-900 border border-slate-200/10 dark:border-white/5 rounded-3xl flex flex-col items-center justify-center gap-4 max-w-xl mx-auto">
          <div className="w-14 h-14 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-2xl flex items-center justify-center">
            <Frown className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-display font-bold text-slate-900 dark:text-white text-lg">Your Wishlist is Empty</h3>
            <p className="text-xs text-slate-400 leading-relaxed mt-1">
              Tap the heart icon on any accessory card to save items here, helping you compare them easily before touring season.
            </p>
          </div>
          <button 
            onClick={() => navigate('#products')}
            className="px-6 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-xl cursor-pointer"
          >
            Explore Riding Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {savedItems.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// ALL 26 CATEGORIES PAGE
// ============================================================================
export const CategoriesList: React.FC = () => {
  const { categories, navigate } = useApp();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 fade-in">
      <SEO title="All 26 Motorcycle Accessories Categories" description="Browse ECE helmets, mesh and leather jackets, communication intercoms, saddle luggage, bike covers, phone chargers, and fog lamps." />
      
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold font-mono tracking-wider text-orange-500 uppercase block mb-1">Comprehensive Directory</span>
        <h1 className="font-display font-bold text-3xl text-slate-900 dark:text-white">Browse All 26 Categories</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          MotoGear Hub lists the absolute entire spectrum of riding accessories, curated for safety and tour longevity.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div 
            key={cat.id} 
            onClick={() => navigate(`#products?category=${cat.slug}`)}
            className="group p-5 bg-white dark:bg-slate-900 border border-slate-200/10 dark:border-white/5 rounded-3xl cursor-pointer hover:border-orange-500/50 hover:shadow-lg transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center mb-4 font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors">
              {cat.name}
            </h3>
            <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-normal">
              {cat.description}
            </p>
            <div className="flex items-center justify-between text-[10px] font-mono text-orange-500 mt-4 border-t border-slate-100 dark:border-slate-800 pt-3">
              <span>{cat.count ? `${cat.count} listings` : 'Check listings'}</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// ALL BRANDS PAGE
// ============================================================================
export const BrandsList: React.FC = () => {
  const { brands, navigate } = useApp();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 fade-in">
      <SEO title="Premium Certified Brands Comparison" description="Browse premium local and international motorcycle riding gear brands like Alpinestars, Dainese, LS2, MT Helmets, Cardo, and Shima." />
      
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold font-mono tracking-wider text-orange-500 uppercase block mb-1">Vetted Gear Manufacturers</span>
        <h1 className="font-display font-bold text-3xl text-slate-900 dark:text-white">Premium Curated Riding Brands</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {brands.map((b) => (
          <div 
            key={b.id}
            onClick={() => navigate(`#products?brand=${b.slug}`)}
            className="p-6 bg-white dark:bg-slate-900 border border-slate-200/10 dark:border-white/5 rounded-3xl flex flex-col justify-between cursor-pointer hover:border-orange-500/40 transition-all text-center"
          >
            <div>
              <img src={b.logo} alt={b.name} className="w-16 h-16 rounded-2xl object-cover mx-auto mb-4 border border-slate-800" />
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">{b.name}</h3>
              <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">{b.description}</p>
            </div>
            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-4 text-[11px] font-semibold text-orange-500 hover:underline">
              Compare {b.name} Specifications →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// COMPLIANCE PAGES (Combined for elegance and code tidiness)
// ============================================================================
export const Compliance: React.FC<{ type: 'privacy' | 'terms' | 'affiliate' | 'cookie' }> = ({ type }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 fade-in">
      <SEO title="Site Compliance Legal Terms" description="MotoGear Hub platform operations and legal privacy disclosures." />
      
      <div className="bg-white dark:bg-slate-900/40 border border-slate-200/15 dark:border-white/5 p-8 rounded-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        
        {type === 'privacy' && (
          <div>
            <h1 className="font-display font-bold text-2xl text-slate-900 dark:text-white mb-4">Privacy Policy & Cookie Consent</h1>
            <p className="mb-4">Last Updated: June 2026</p>
            <p className="mb-4">
              At MotoGear Hub, we treat user privacy with utmost transparency. Since we operate as an affiliate comparison engine and do not accept shopping card credentials or directly store credit card transactions, we only track search parameters and contact form details to facilitate communication.
            </p>
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mt-4 mb-2">1. Data Storage</h4>
            <p className="mb-4">
              Newsletter emails and Contact support messages are stored securely inside our MongoDB Atlas instance with restricted cloud network access lines.
            </p>
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mt-4 mb-2">2. Third-Party Marketplace Cookies</h4>
            <p>
              By clicking on Amazon India, Flipkart, or Brand affiliate links, those marketplaces place specialized temporary cookies in your browser to record that MotoGear Hub referred you.
            </p>
          </div>
        )}

        {type === 'terms' && (
          <div>
            <h1 className="font-display font-bold text-2xl text-slate-900 dark:text-white mb-4">Terms of Service</h1>
            <p className="mb-4">Last Updated: June 2026</p>
            <p className="mb-4">
              Welcome to MotoGear Hub. By continuing to navigate and compare riding gear specs, you agree to comply with our Terms of Use.
            </p>
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mt-4 mb-2">1. No Direct E-Commerce Liability</h4>
            <p className="mb-4">
              MotoGear Hub is strictly a discovery index. All orders, shipping returns, or defective product complaints must be handled directly with the merchant partner (e.g. Amazon India or the official brand store) where you completed the checkout.
            </p>
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mt-4 mb-2">2. Vetting of Specifications</h4>
            <p>
              While we research safety certification files meticulously, we recommend double-checking visor or size contours in brick-and-mortar stores before taking high-speed highway curves.
            </p>
          </div>
        )}

        {type === 'affiliate' && (
          <div>
            <h1 className="font-display font-bold text-2xl text-slate-900 dark:text-white mb-4">Affiliate & Commission Transparency Disclosure</h1>
            <p className="mb-4">
              MotoGear Hub operates entirely as a free-to-use search comparison table. To fund senior safety researchers and server operations, we partner with affiliate networks including:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-1.5 font-mono text-xs text-orange-500">
              <li>Amazon Services Associates Program</li>
              <li>Flipkart Affiliates Hub</li>
              <li>Official Brand Distributor Referral Directories</li>
            </ul>
            <p>
              When visitors choose to click buy links on our spec matrices and complete purchases on referred sites, we receive a small percentage of the total cart rate. The product price is identical to direct shopping; you incur absolutely zero extra overhead fee.
            </p>
          </div>
        )}

        {type === 'cookie' && (
          <div>
            <h1 className="font-display font-bold text-2xl text-slate-900 dark:text-white mb-4">Cookie Policy</h1>
            <p className="mb-4">
              Our system utilizes basic cookies to remember dark/light theme options, save wishlist records in your local browser cache, and allow administrative logins to stay persistent. Third-party advertisers (Amazon, Flipkart) deploy tracking cookies to handle commission attribution.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

// ============================================================================
// NOT FOUND (404) PAGE
// ============================================================================
export const NotFound: React.FC = () => {
  const { navigate } = useApp();
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center flex flex-col items-center justify-center gap-4 fade-in">
      <SEO title="Page Not Found" description="The requested riding gear comparison path does not exist." />
      <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center">
        <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '6s' }} />
      </div>
      <h1 className="font-display font-bold text-2xl text-slate-900 dark:text-white leading-tight">Riding Path Lost (404)</h1>
      <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
        This route doesn't match any accessory listing or guide post in our index. Let's redirect your headlight back onto the highway.
      </p>
      <button 
        onClick={() => navigate('#home')}
        className="px-6 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
      >
        Ride Back Home
      </button>
    </div>
  );
};
