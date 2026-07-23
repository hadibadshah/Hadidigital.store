import React from 'react';
import { Product, StoreSettings } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Sparkles } from 'lucide-react';

interface ShopViewProps {
  products: Product[];
  settings: StoreSettings;
  onBuyNow: (product: Product) => void;
  navigate?: (path: string) => void;
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({ 
  products, 
  settings, 
  onBuyNow, 
  navigate,
  searchQuery = '', 
  setSearchQuery 
}) => {
  const visibleProducts = products.filter(p => !p.isHidden);

  const filteredProducts = visibleProducts.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto pt-6 px-4">
        <div className="inline-flex items-center gap-2 bg-[#f59e0b]/10 border border-[#f59e0b]/30 px-3 py-1 rounded-full text-xs font-bold text-[#f59e0b] mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          OFFICIAL DIGITAL CATALOG
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl animated-pink-gold-gradient mb-4 leading-tight">
          Explore Premium Tools & Services
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          Select from our curated ecosystem of AI tools, video editing subscriptions, YouTube growth packs, and automation courses with instant Pakistani local payment options.
        </p>
      </div>

      {/* Active Search Filter Badge if typing */}
      {searchQuery && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between bg-slate-900/60 p-3 rounded-2xl border border-slate-800 text-xs">
          <span className="text-slate-300">
            Showing results for: <span className="text-[#f59e0b] font-bold">"{searchQuery}"</span>
          </span>
          <button
            onClick={() => setSearchQuery && setSearchQuery('')}
            className="text-amber-400 hover:underline font-semibold"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 glass-panel rounded-2xl border border-slate-800">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="font-heading font-bold text-lg text-white mb-1">No products found</h3>
            <p className="text-xs text-slate-400 mb-4">Try searching for something else like "ChatGPT" or "Capcut".</p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery && setSearchQuery('')}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                settings={settings}
                onBuyNow={onBuyNow}
                navigate={navigate}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
