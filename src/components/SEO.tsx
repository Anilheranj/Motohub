/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  type?: 'website' | 'article' | 'product';
  schema?: Record<string, any>;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = [],
  type = 'website',
  schema
}) => {
  useEffect(() => {
    // Dynamic tab title update
    const siteName = "MotoGear Hub - India's Premium Motorcycle Riding Gear Platform";
    document.title = title ? `${title} | ${siteName}` : siteName;

    // Helper to find or create meta tags
    const setMetaTag = (attrName: string, attrVal: string, contentVal: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentVal);
    };

    // Update standard meta tags
    setMetaTag('name', 'description', description || "Discover India's most detailed premium motorcycle riding gear comparison and discovery platform.");
    if (keywords.length > 0) {
      setMetaTag('name', 'keywords', keywords.join(', '));
    }

    // Open Graph
    setMetaTag('property', 'og:title', title || siteName);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:site_name', 'MotoGear Hub');
    setMetaTag('property', 'og:image', 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200');

    // Twitter
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title || siteName);
    setMetaTag('name', 'twitter:description', description);

    // Schema Markup (Structured JSON-LD)
    let schemaScript = document.getElementById('seo-json-ld') as HTMLScriptElement;
    if (schemaScript) {
      schemaScript.textContent = JSON.stringify(schema || getDefaultOrganizationSchema());
    } else {
      schemaScript = document.createElement('script');
      schemaScript.id = 'seo-json-ld';
      schemaScript.type = 'application/ld+json';
      schemaScript.textContent = JSON.stringify(schema || getDefaultOrganizationSchema());
      document.head.appendChild(schemaScript);
    }

    return () => {
      // Clean up on unmount optionally
    };
  }, [title, description, keywords, type, schema]);

  return null;
};

// Default organization structured data (JSON-LD)
function getDefaultOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MotoGear Hub",
    "url": "https://motogearhub.com",
    "logo": "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=200",
    "description": "India's Premium Motorcycle Riding Gear & Accessories Discovery Platform.",
    "sameAs": [
      "https://facebook.com/motogearhub",
      "https://twitter.com/motogearhub",
      "https://instagram.com/motogearhub"
    ]
  };
}

export default SEO;
