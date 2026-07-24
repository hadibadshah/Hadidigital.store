import React, { useState } from 'react';
import { Product, StoreSettings } from '../types';
import { MessageCircle, ShoppingCart, Sparkles, CheckCircle2, Eye, Link2, Check } from 'lucide-react';
import { getWhatsAppLink, createProductBuyMessage } from '../lib/whatsapp';
import { getProductSlug, getProductDirectUrl } from '../lib/slug';

interface ProductCardProps {
  product: Product;
  settings: StoreSettings;
  onBuyNow: (product: Product) => void;
  navigate?: (path: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, settings, onBuyNow, navigate }) => {
  const [copied, setCopied] = useState(false);
  const isDMToBuy = product.price === 'DM to Buy';

  const slug = getProductSlug(product);
  const productUrl = `/product/${slug}`;
  const directLink = getProductDirectUrl(product);

  const handleOpenDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigate) {
      navigate(productUrl);
    } else {
      window.location.hash = productUrl;
    }
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(directLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const waMsg = createProductBuyMessage(product.name, product.price, settings.brandName) + `\nLink: ${directLink}`;
  const waDirectLink = getWhatsAppLink(settings.whatsappNumber, waMsg);

  return (
    <div 
      className="group relative bg-white/5 border border-white/10 rounded-3xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#f59e0b]/50 backdrop-blur-md shadow-xl flex flex-col justify-between overflow-hidden"
      id={`product-card-${product.id}`}
    >
      {/* Top Subtle Amber Glow on Hover */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#f59e0b]/10 rounded-full blur-2xl group-hover:bg-[#f59e0b]/20 transition-all pointer-events-none"></div>

      <div>
        {/* Card Header: Category, Badge & Quick Link Copy */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-300 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
            {product.category}
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopyLink}
              title="Copy Direct Link for Catalog"
              className="p-1 rounded-lg bg-white/5 hover:bg-amber-500/20 text-slate-400 hover:text-amber-300 transition-colors border border-white/10 text-[10px] flex items-center gap-1 px-2"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Link2 className="w-3 h-3" />
                  <span className="hidden sm:inline">Link</span>
                </>
              )}
            </button>

            <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/30 shadow-sm">
              {product.badge}
            </span>
          </div>
        </div>

        {/* Emoji / Icon Container - Clickable to open details */}
        <div 
          onClick={handleOpenDetails}
          className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 group-hover:border-[#f59e0b]/40 transition-all shadow-inner cursor-pointer"
        >
          {product.image}
        </div>

        {/* Product Name - Clickable */}
        <h3 
          onClick={handleOpenDetails}
          className="font-heading font-extrabold text-xl text-white mb-2 group-hover:text-[#f59e0b] transition-colors cursor-pointer"
        >
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Link to View Details & Fayde */}
        <button
          onClick={handleOpenDetails}
          className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-bold mb-4 hover:underline"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Details & Fayde</span>
        </button>
      </div>

      {/* Bottom Price & CTA Area */}
      <div className="pt-4 border-t border-white/10">
        <div className="flex items-baseline justify-between mb-4">
          <span className="text-xs text-slate-400 font-medium">Price</span>
          <div className="text-right flex items-baseline justify-end gap-2">
            {product.originalPrice && (
              <span className="text-xs text-slate-500 line-through font-medium">
                {product.originalPrice}
              </span>
            )}
            <span className="font-heading font-extrabold text-lg text-[#f59e0b]">
              {product.price}
            </span>
          </div>
        </div>

        {/* Action Button */}
        {isDMToBuy ? (
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleOpenDetails}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1 text-xs transition-all border border-slate-700"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>Details</span>
            </button>
            <a
              href={waDirectLink}
              target="_blank"
              rel="noopener noreferrer"
              id={`buy-btn-product-${product.id}`}
              className="w-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs transition-all text-center shadow-lg hover:bg-emerald-500/30"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>DM to Buy</span>
            </a>
          </div>
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
            <button
              onClick={handleOpenDetails}
              className="w-full bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs transition-all text-center"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>Details</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

