import React from 'react';
import { Product, StoreSettings } from '../types';
import { MessageCircle, ShoppingCart, Sparkles, CheckCircle2 } from 'lucide-react';
import { getWhatsAppLink, createProductBuyMessage } from '../lib/whatsapp';

interface ProductCardProps {
  product: Product;
  settings: StoreSettings;
  onBuyNow: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, settings, onBuyNow }) => {
  const isDMToBuy = product.price === 'DM to Buy';

  const badgeColor = {
    DEAL: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    AL: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    ELITE: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    NEW: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    GUARANTEED: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  }[product.badge] || 'bg-slate-700/50 text-slate-300 border-slate-600';

  const waMsg = createProductBuyMessage(product.name, product.price, settings.brandName);
  const waDirectLink = getWhatsAppLink(settings.whatsappNumber, waMsg);

  return (
    <div 
      className="group relative bg-white/5 border border-white/10 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#f59e0b]/50 backdrop-blur-md shadow-xl flex flex-col justify-between overflow-hidden"
      id={`product-card-${product.id}`}
    >
      {/* Top Subtle Amber Glow on Hover */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#f59e0b]/10 rounded-full blur-2xl group-hover:bg-[#f59e0b]/20 transition-all pointer-events-none"></div>

      <div>
        {/* Card Header: Category & Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-300 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
            {product.category}
          </span>
          <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/30 shadow-sm">
            {product.badge}
          </span>
        </div>

        {/* Emoji / Icon Container */}
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl mb-5 group-hover:scale-110 group-hover:border-[#f59e0b]/40 transition-transform shadow-inner">
          {product.image}
        </div>

        {/* Product Name */}
        <h3 className="font-heading font-bold text-xl text-white mb-2 group-hover:text-[#f59e0b] transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-slate-400 text-xs leading-relaxed mb-6 line-clamp-3">
          {product.description}
        </p>
      </div>

      {/* Bottom Price & CTA Area */}
      <div className="pt-4 border-t border-white/10">
        <div className="flex items-baseline justify-between mb-4">
          <span className="text-xs text-slate-400 font-medium">Price</span>
          <div className="text-right">
            <span className="font-heading font-extrabold text-lg text-[#f59e0b]">
              {product.price}
            </span>
          </div>
        </div>

        {/* Action Button */}
        {isDMToBuy ? (
          <a
            href={waDirectLink}
            target="_blank"
            rel="noopener noreferrer"
            id={`buy-btn-product-${product.id}`}
            className="w-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition-all shadow-lg hover:bg-emerald-500/30"
          >
            <MessageCircle className="w-4 h-4" />
            <span>DM to Buy</span>
          </a>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onBuyNow(product)}
              id={`buy-btn-product-${product.id}`}
              className="w-full bg-[#f59e0b] hover:bg-amber-400 text-[#0a1628] font-extrabold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs transition-all shadow-md shadow-[#f59e0b]/20 hover:scale-105"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Buy Now</span>
            </button>
            <a
              href={waDirectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-white/5 hover:bg-white/10 text-emerald-400 border border-emerald-500/30 font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs transition-all text-center"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        )}

      </div>
    </div>
  );
};
