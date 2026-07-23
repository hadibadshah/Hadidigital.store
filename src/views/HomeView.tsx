import React from 'react';
import { Product, Article, StoreSettings } from '../types';
import { ProductCard } from '../components/ProductCard';
import { 
  Sparkles, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Headphones, 
  Award, 
  CheckCircle, 
  Users, 
  MessageCircle, 
  BookOpen,
  TrendingUp,
  Star,
  Wrench,
  ExternalLink,
  Globe,
  DollarSign,
  QrCode,
  Eye
} from 'lucide-react';
import { getWhatsAppLink } from '../lib/whatsapp';

interface HomeViewProps {
  products: Product[];
  articles: Article[];
  settings: StoreSettings;
  navigate: (path: string) => void;
  onBuyNow: (product: Product) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  products,
  articles,
  settings,
  navigate,
  onBuyNow,
}) => {
  const visibleProducts = products.filter(p => !p.isHidden);

  const waCommunityLink = settings.whatsappChannel || getWhatsAppLink(settings.whatsappNumber, `Assalam-o-Alaikum ${settings.brandName}, I want to join your VIP Community!`);

  return (
    <div className="space-y-16 pb-12">
      
      {/* Hero & Featured Showcase Section */}
      <section className="relative overflow-hidden pt-8 pb-12 lg:pt-14 lg:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 relative">
          
          {/* Left: Hero Text */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-[#f59e0b] uppercase tracking-widest mb-6 w-fit">
              <span className="flex h-2 w-2 rounded-full bg-[#f59e0b] animate-pulse"></span>
              Verified Elite Provider
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold leading-[1.1] mb-6 font-heading animated-pink-gold-gradient">
              Premium Digital <br/>
              <span>Solutions</span>
            </h1>

            <p className="text-slate-400 text-base sm:text-lg mb-8 leading-relaxed max-w-lg">
              HDS is an ecosystem of trust. Join thousands of elite creators who rely on our high-liquidity digital flows and instant Pakistani local payment options.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/shop')}
                id="hero-shop-now-cta"
                className="px-8 py-4 bg-[#f59e0b] text-[#0a1628] font-extrabold rounded-xl shadow-lg shadow-[#f59e0b]/20 hover:scale-105 transition-transform flex items-center gap-2 text-sm sm:text-base"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href={waCommunityLink}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-community-cta"
                className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2 text-sm sm:text-base"
              >
                <Users className="w-5 h-5 text-emerald-500" />
                <span>Join Community</span>
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-lg">
              <div className="bg-white/5 border border-white/10 p-3 rounded-2xl backdrop-blur-md hover:scale-105 transition-transform">
                <p className="text-[#f59e0b] font-heading font-extrabold text-2xl">25,000+</p>
                <p className="text-[11px] text-slate-400 font-medium">Happy Creators</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-3 rounded-2xl backdrop-blur-md hover:scale-105 transition-transform">
                <p className="text-emerald-500 font-heading font-extrabold text-2xl">100%</p>
                <p className="text-[11px] text-slate-400 font-medium">Original Warranty</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-3 rounded-2xl backdrop-blur-md hover:scale-105 transition-transform">
                <p className="text-blue-500 font-heading font-extrabold text-2xl">&lt; 5m</p>
                <p className="text-[11px] text-slate-400 font-medium">Instant Delivery</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-3 rounded-2xl backdrop-blur-md hover:scale-105 transition-transform">
                <p className="text-purple-500 font-heading font-extrabold text-2xl">24/7</p>
                <p className="text-[11px] text-slate-400 font-medium">VIP Support</p>
              </div>
            </div>

          </div>

          {/* Right: Featured Product Showcase Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {visibleProducts.slice(0, 4).map((product) => {
              const isDMToBuy = product.price === 'DM to Buy';
              const waMsg = getWhatsAppLink(settings.whatsappNumber, `Assalam-o-Alaikum ${settings.brandName}, I want to buy ${product.name}!`);
              return (
                <div 
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-between backdrop-blur-md relative overflow-hidden group hover:border-[#f59e0b]/50 transition-all shadow-xl cursor-pointer"
                >
                  <div className="absolute top-0 right-0 px-3 py-1 bg-[#f59e0b] text-[#0a1628] text-[10px] font-extrabold rounded-bl-xl uppercase tracking-wider">
                    {product.badge}
                  </div>
                  <div className="text-4xl mb-4">{product.image}</div>
                  <div>
                    <h3 className="font-bold text-xl mb-1 text-white group-hover:text-[#f59e0b] transition-colors flex items-center justify-between">
                      <span>{product.name}</span>
                      <Eye className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" />
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2">{product.description}</p>
                  </div>
                  <div className="mt-6 flex items-center justify-between pt-3 border-t border-white/10">
                    <div className="flex items-baseline gap-1.5">
                      {product.originalPrice && (
                        <span className="text-xs text-slate-500 line-through font-semibold">
                          {product.originalPrice}
                        </span>
                      )}
                      <span className="font-extrabold text-[#f59e0b] text-base sm:text-lg">{product.price}</span>
                    </div>
                    {isDMToBuy ? (
                      <a 
                        href={waMsg}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="py-2 px-3 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-bold hover:bg-emerald-500/30 transition-all"
                      >
                        DM to Buy
                      </a>
                    ) : (
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onBuyNow(product);
                          }}
                          className="py-2 px-3 bg-white/10 rounded-xl hover:bg-[#f59e0b] hover:text-[#0a1628] transition-all text-white font-bold text-xs flex items-center gap-1"
                        >
                          <span>Buy</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </section>

      {/* Trust Bar / Features */}
      <section className="bg-black/20 border-y border-white/5 py-8 px-4 sm:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-around gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#f59e0b]">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Elite Proven Tier</p>
              <p className="text-xs text-slate-400">Verified Market Standards</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#f59e0b]">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Instant Hub Flow</p>
              <p className="text-xs text-slate-400">Fast Digital Delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#f59e0b]">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">24/7 VIP Concierge</p>
              <p className="text-xs text-slate-400">Dedicated Support Team</p>
            </div>
          </div>
        </div>
      </section>

      {/* EzToolbox Free Tools Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative overflow-hidden bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-blue-500/10 border border-[#f59e0b]/40 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 bg-[#f59e0b]/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/40 text-xs font-extrabold uppercase tracking-wider mb-4 shadow-sm">
                <Wrench className="w-3.5 h-3.5" />
                <span>100% Free Creator Suite</span>
              </div>
              
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading mb-3">
                EzToolbox • 50+ Free Digital & AI Web Tools
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                Explore our official free tools website for YouTube creators, developers, and marketers. Includes YouTube Channel & Video Analyzer, What is My IP Address, Unit Converters, Dollar Live Price (USD to PKR), QR Code Generator, and much more!
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-200 mb-6 font-semibold">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-2.5 rounded-xl">
                  <TrendingUp className="w-4 h-4 text-[#f59e0b]" />
                  <span>YT Channel & Video Analyzer</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-2.5 rounded-xl">
                  <Globe className="w-4 h-4 text-emerald-400" />
                  <span>What is My IP Address</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-2.5 rounded-xl">
                  <DollarSign className="w-4 h-4 text-green-400" />
                  <span>Dollar Live Price (USD/PKR)</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-2.5 rounded-xl">
                  <QrCode className="w-4 h-4 text-blue-400" />
                  <span>Instant QR Code Generator</span>
                </div>
              </div>
            </div>

            <div className="shrink-0">
              <a
                href={settings.ezToolboxLink || 'https://eztoolbox.xyz'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#f59e0b] to-amber-500 text-[#0a1628] font-extrabold text-base rounded-2xl shadow-xl shadow-[#f59e0b]/30 hover:scale-105 transition-all"
              >
                <span>Visit EzToolbox.xyz</span>
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Full Product Catalog Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-[#f59e0b] tracking-widest uppercase">
              PREMIUM CATALOG
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white mt-1">
              Top Deals & Trending AI Tools
            </h2>
          </div>
          <button
            onClick={() => navigate('/shop')}
            className="flex items-center gap-2 text-sm text-[#f59e0b] hover:underline font-bold"
          >
            <span>View Full Catalog ({visibleProducts.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              settings={settings}
              onBuyNow={onBuyNow}
            />
          ))}
        </div>
      </section>

      {/* Trust Badges & Local Payments Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="dark:bg-white/5 bg-white border dark:border-white/10 border-slate-200/80 rounded-3xl p-8 sm:p-12 backdrop-blur-md relative overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            <div>
              <span className="text-xs font-bold text-[#f59e0b] tracking-widest uppercase">
                GUARANTEED TRUST & SAFETY
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl dark:text-white text-slate-900 mt-2 mb-4">
                Local Payments & Instant Activation
              </h2>
              <p className="dark:text-slate-300 text-slate-600 text-sm leading-relaxed mb-6">
                Pay safely in PKR using JazzCash, EasyPaisa, or direct Bank Transfer. Every product is backed by replacement warranties and direct customer support.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs dark:text-slate-200 text-slate-800 font-medium">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>100% Genuine original logins & replacement guarantee</span>
                </div>
                <div className="flex items-center gap-3 text-xs dark:text-slate-200 text-slate-800 font-medium">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>No credit card required – Pay locally via JazzCash / EasyPaisa</span>
                </div>
                <div className="flex items-center gap-3 text-xs dark:text-slate-200 text-slate-800 font-medium">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>Instant setup assistance via WhatsApp concierge</span>
                </div>
              </div>
            </div>

            {/* Payment Method Badges Display */}
            <div className="dark:bg-[#0f1c30]/90 bg-slate-900 p-6 rounded-2xl border border-slate-700/80 space-y-4 shadow-md">
              <h4 className="font-heading font-bold text-white text-sm mb-3 text-center">
                Accepted Payment Channels in Pakistan
              </h4>
              <div className="grid grid-cols-3 gap-3 text-center font-bold text-xs">
                <div className="p-4 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200">
                  <span className="block text-lg mb-1">📱</span>
                  JazzCash
                </div>
                <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200">
                  <span className="block text-lg mb-1">💸</span>
                  EasyPaisa
                </div>
                <div className="p-4 rounded-xl bg-blue-950/80 border border-blue-500/50 text-blue-200">
                  <span className="block text-lg mb-1">🏦</span>
                  Bank Transfer
                </div>
              </div>
              <p className="text-[11px] text-slate-300 text-center">
                Send screenshot on WhatsApp to activate your subscription in minutes!
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SEO Articles Preview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-[#f59e0b] tracking-widest uppercase">
              CREATOR GUIDES & SEO ARTICLES
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl dark:text-white text-slate-900 mt-1">
              Latest Growth Insights
            </h2>
          </div>
          <button
            onClick={() => navigate('/articles')}
            className="hidden sm:flex items-center gap-1 text-xs text-[#f59e0b] hover:underline font-bold"
          >
            <span>All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.slice(0, 3).map((article) => (
            <div
              key={article.id}
              onClick={() => navigate(`/articles/${article.slug}`)}
              className="dark:bg-white/5 bg-white border dark:border-white/10 border-slate-200/80 rounded-3xl p-6 backdrop-blur-md hover:border-[#f59e0b]/50 transition-all cursor-pointer group flex flex-col justify-between shadow-sm hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-[11px]">
                  <span className="bg-[#f59e0b]/10 text-[#f59e0b] font-bold px-2.5 py-0.5 rounded-full border border-[#f59e0b]/30">
                    {article.category}
                  </span>
                  <span className="dark:text-slate-500 text-slate-400">{article.readTime}</span>
                </div>
                <h3 className="font-heading font-bold text-base dark:text-white text-slate-900 group-hover:text-[#f59e0b] transition-colors line-clamp-2 mb-2">
                  {article.title}
                </h3>
                <p className="text-xs dark:text-slate-400 text-slate-600 line-clamp-3 leading-relaxed mb-4">
                  {article.summary}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#f59e0b] font-bold pt-3 border-t dark:border-white/10 border-slate-200">
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
