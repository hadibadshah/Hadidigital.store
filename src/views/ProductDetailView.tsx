import React, { useState } from 'react';
import { Product, StoreSettings } from '../types';
import { 
  ShoppingCart, 
  MessageCircle, 
  Copy, 
  Check, 
  Share2, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  ArrowLeft, 
  Clock, 
  Zap, 
  ExternalLink,
  ChevronRight,
  Globe,
  Facebook
} from 'lucide-react';
import { getWhatsAppLink, createProductBuyMessage } from '../lib/whatsapp';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailViewProps {
  param: string;
  products: Product[];
  settings: StoreSettings;
  onBuyNow: (product: Product) => void;
  navigate: (path: string) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  param,
  products,
  settings,
  onBuyNow,
  navigate,
}) => {
  const [copied, setCopied] = useState(false);

  // Find product by ID or by name slug
  const product = products.find((p) => {
    if (String(p.id) === param) return true;
    const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return slug === param.toLowerCase();
  });

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="text-6xl">🔍</div>
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
          Product Not Found
        </h2>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          The requested digital tool or product could not be found. It may have been renamed or updated in our catalog.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="inline-flex items-center gap-2 bg-[#f59e0b] hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3 rounded-2xl text-xs shadow-lg transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Products</span>
        </button>
      </div>
    );
  }

  // Generate canonical direct product page link
  const productDirectUrl = `https://hadidigital.store/#/product/${product.id}`;
  const isDMToBuy = product.price === 'DM to Buy';

  const waMsg = createProductBuyMessage(product.name, product.price, settings.brandName) + `\nProduct Link: ${productDirectUrl}`;
  const waDirectLink = getWhatsAppLink(settings.whatsappNumber, waMsg);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(productDirectUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3500);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`🔥 Check out ${product.name} on ${settings.brandName} for ${product.price}!\nDirect Link: ${productDirectUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleShareFacebook = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productDirectUrl)}`;
    window.open(fbUrl, '_blank');
  };

  // Generate fallback benefits if custom ones don't exist
  const defaultBenefits = [
    `100% Genuine & Authentic ${product.name} Subscription`,
    'Instant Activation & Delivery on WhatsApp within 5 to 10 minutes',
    'Full Replacement Warranty for the entire duration',
    'Compatible across Windows, Mac, Android, iOS & Web Browsers',
    'Dedicated 24/7 VIP Customer Support in Pakistan'
  ];

  const benefitsList = product.benefits && product.benefits.length > 0 ? product.benefits : defaultBenefits;

  // Filter related products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && !p.isHidden && p.category === product.category)
    .slice(0, 3);

  const otherProducts = relatedProducts.length > 0 
    ? relatedProducts 
    : products.filter((p) => p.id !== product.id && !p.isHidden).slice(0, 3);

  return (
    <div className="space-y-10 pb-16">
      
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <nav className="flex items-center gap-2 text-xs text-slate-400 flex-wrap">
          <button 
            onClick={() => navigate('/')} 
            className="hover:text-amber-400 transition-colors"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <button 
            onClick={() => navigate('/shop')} 
            className="hover:text-amber-400 transition-colors"
          >
            Shop
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-slate-300 font-medium">{product.category}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-amber-400 font-extrabold truncate max-w-[180px] sm:max-w-xs">{product.name}</span>
        </nav>
      </div>

      {/* Shareable Link Box (Direct Catalog Share for Facebook / WhatsApp) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-indigo-950/60 border border-amber-500/40 rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-amber-400 font-extrabold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Direct Product Link for Catalog & Social Media Sharing</span>
            </div>
            <p className="text-xs text-slate-300">
              Copy this link to attach on Facebook posts, Instagram bio, or WhatsApp Catalog:
            </p>
            <div className="text-[11px] font-mono text-amber-300/90 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-amber-500/30 truncate max-w-xl">
              {productDirectUrl}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 flex-wrap justify-center">
            <button
              onClick={handleCopyLink}
              id="copy-product-link-btn"
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 shadow-md ${
                copied 
                  ? 'bg-emerald-500 text-slate-950 border border-emerald-400' 
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950 border border-amber-400 hover:scale-105'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied for Catalog!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Product Link</span>
                </>
              )}
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="px-3.5 py-2.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
              title="Share on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>

            <button
              onClick={handleShareFacebook}
              className="px-3.5 py-2.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
              title="Share on Facebook"
            >
              <Facebook className="w-4 h-4 text-blue-400" />
              <span className="hidden sm:inline">Facebook</span>
            </button>
          </div>
        </div>

        {/* Copied Toast Banner */}
        {copied && (
          <div className="mt-3 p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-bold flex items-center justify-between gap-2 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Link Copied! You can now paste this URL directly into your WhatsApp messages or Facebook catalog.</span>
            </div>
            <button onClick={() => setCopied(false)} className="text-emerald-400 hover:text-white">✕</button>
          </div>
        )}
      </div>

      {/* Main Product Details Card Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel-gold rounded-3xl p-6 lg:p-8 border border-amber-500/30 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Product Icon & Image Showcase */}
          <div className="lg:col-span-5 space-y-5">
            <div className="relative bg-slate-950/80 border border-amber-500/30 rounded-3xl p-10 text-center flex flex-col items-center justify-center shadow-inner overflow-hidden min-h-[280px]">
              
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-indigo-500/10 rounded-3xl pointer-events-none"></div>

              {/* Offer Badge Overlay */}
              <div className="absolute top-4 right-4 bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                {product.badge}
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4 bg-slate-800/80 text-slate-300 font-extrabold text-[10px] px-3 py-1 rounded-full border border-slate-700 uppercase tracking-wider">
                {product.category}
              </div>

              {/* Icon Emoji Display */}
              <div className="text-7xl mb-4 transform hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">
                {product.image}
              </div>

              <h2 className="font-heading font-extrabold text-2xl text-white">
                {product.name}
              </h2>
              <p className="text-xs text-amber-400/90 font-semibold mt-1">
                Official Digital License & Access
              </p>
            </div>

            {/* Guaranteed Trust Badges */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-2xl flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-bold text-white text-[11px]">100% Replacement</div>
                  <div className="text-[10px] text-slate-400">Full Warranty Cover</div>
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-2xl flex items-center gap-2.5">
                <Zap className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <div className="font-bold text-white text-[11px]">Fast Activation</div>
                  <div className="text-[10px] text-slate-400">5-10 Mins Delivery</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing, Overview & Action Buttons */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Header Title & Description */}
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold text-amber-400 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verified Digital Service</span>
              </div>
              
              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white mb-3">
                {product.name}
              </h1>

              <p className="text-slate-300 text-sm leading-relaxed font-normal">
                {product.description}
              </p>
            </div>

            {/* Price Box */}
            <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 font-semibold block mb-1">Price / Cost</span>
                <div className="flex items-baseline gap-2.5">
                  <span className="font-heading font-black text-2xl sm:text-3xl text-amber-400">
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-slate-500 line-through font-semibold">
                      {product.originalPrice}
                    </span>
                  )}
                  {product.discountPercent && (
                    <span className="text-xs font-extrabold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      SAVE {product.discountPercent}%
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right text-[11px] text-slate-400">
                <div className="text-emerald-400 font-bold flex items-center justify-end gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>In Stock</span>
                </div>
                <span>Immediate WhatsApp Key</span>
              </div>
            </div>

            {/* Main CTA Order Buttons */}
            <div className="space-y-3 pt-2">
              {isDMToBuy ? (
                <a
                  href={waDirectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="direct-wa-buy-page-btn"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-4 px-6 rounded-2xl flex items-center justify-center gap-2.5 text-sm transition-all shadow-xl shadow-emerald-500/20 hover:scale-[1.02]"
                >
                  <MessageCircle className="w-5 h-5 fill-slate-950" />
                  <span>Order Directly via WhatsApp (DM to Buy)</span>
                </a>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => onBuyNow(product)}
                    id="buy-now-detail-btn"
                    className="w-full bg-[#f59e0b] hover:bg-amber-400 text-slate-950 font-black py-3.5 px-5 rounded-2xl flex items-center justify-center gap-2 text-sm transition-all shadow-xl shadow-[#f59e0b]/20 hover:scale-[1.02]"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Instant Order / Buy Now</span>
                  </button>

                  <a
                    href={waDirectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 font-extrabold py-3.5 px-5 rounded-2xl flex items-center justify-center gap-2 text-sm transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>Inquire via WhatsApp</span>
                  </a>
                </div>
              )}
            </div>

            {/* Payment Methods Accepted */}
            <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-800 text-xs flex items-center justify-between flex-wrap gap-2">
              <span className="text-slate-400 font-medium">Accepted Payments:</span>
              <div className="flex items-center gap-2 font-bold text-[11px]">
                <span className="text-red-400 bg-red-950/60 border border-red-500/30 px-2 py-0.5 rounded">JazzCash</span>
                <span className="text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">EasyPaisa</span>
                <span className="text-blue-400 bg-blue-950/60 border border-blue-500/30 px-2 py-0.5 rounded">Bank Transfer</span>
                <span className="text-purple-400 bg-purple-950/60 border border-purple-500/30 px-2 py-0.5 rounded flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  International Card
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Product Key Fayde / Features & Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
              ✨
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-xl text-white">
                Key Benefits & Features (Product Fayde)
              </h3>
              <p className="text-xs text-slate-400">
                Why this {product.name} package is the best choice for you in Pakistan:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefitsList.map((benefit, idx) => (
              <div 
                key={idx}
                className="bg-slate-900/80 border border-slate-800/80 hover:border-amber-500/30 p-4 rounded-2xl flex items-start gap-3 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How to Order & Receive Step-By-Step */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <h3 className="font-heading font-extrabold text-xl text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-400" />
            <span>How to Receive Your Product (3 Easy Steps)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-2 relative">
              <span className="text-2xl font-black text-amber-500">01</span>
              <h4 className="font-bold text-white text-sm">Place Your Order</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Click "Buy Now" above or message our team directly on WhatsApp with your request.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-2 relative">
              <span className="text-2xl font-black text-amber-500">02</span>
              <h4 className="font-bold text-white text-sm">Make Payment</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Send local payment via JazzCash, EasyPaisa, or Bank Transfer (or Card for international).
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-2 relative">
              <span className="text-2xl font-black text-amber-500">03</span>
              <h4 className="font-bold text-white text-sm">Instant Delivery & Warranty</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Receive account access credentials directly on WhatsApp with 100% replacement warranty!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related / Other Products Recommendations */}
      {otherProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-extrabold text-xl text-white">
              Related Tools & Services
            </h3>
            <button
              onClick={() => navigate('/shop')}
              className="text-xs text-amber-400 hover:underline font-bold flex items-center gap-1"
            >
              <span>View All Catalog</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                settings={settings}
                onBuyNow={onBuyNow}
                navigate={navigate}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
