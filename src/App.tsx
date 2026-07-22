import React, { useState, useEffect } from 'react';
import { Product, Article, Order, StoreSettings } from './types';
import { getProducts, getArticles, getOrders, getSettings } from './lib/storage';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CheckoutModal } from './components/CheckoutModal';
import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { AboutView } from './views/AboutView';
import { ArticlesView } from './views/ArticlesView';
import { ContactView } from './views/ContactView';
import { AdminView } from './views/AdminView';
import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  // Application Persistent State
  const [products, setProducts] = useState<Product[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [settings, setSettings] = useState<StoreSettings>(getSettings());
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Active Routing Path State
  const [currentPath, setCurrentPath] = useState<string>('/');

  // Checkout Modal State
  const [selectedCheckoutProduct, setSelectedCheckoutProduct] = useState<Product | null>(null);

  // Success Order Toast State
  const [orderToastId, setOrderToastId] = useState<string | null>(null);

  // Global Search State
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Initialize data on mount
  useEffect(() => {
    setProducts(getProducts());
    setArticles(getArticles());
    setOrders(getOrders());
    setSettings(getSettings());

    // Hash router handler
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || '/';
      setCurrentPath(hash);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Custom navigate function using location hash
  const navigate = (path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
  };

  // Open Checkout Modal
  const handleBuyNow = (product: Product) => {
    setSelectedCheckoutProduct(product);
  };

  const handleOrderSuccess = (orderId: string) => {
    // Refresh orders list
    setOrders(getOrders());
    setOrderToastId(orderId);
    setTimeout(() => {
      setOrderToastId(null);
    }, 6000);
  };

  // Render view depending on route path
  const renderView = () => {
    if (currentPath === '/' || currentPath === '/home') {
      return (
        <HomeView
          products={products}
          articles={articles}
          settings={settings}
          navigate={navigate}
          onBuyNow={handleBuyNow}
        />
      );
    }

    if (currentPath.startsWith('/shop')) {
      return (
        <ShopView
          products={products}
          settings={settings}
          onBuyNow={handleBuyNow}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      );
    }

    if (currentPath.startsWith('/about')) {
      return (
        <AboutView
          settings={settings}
          navigate={navigate}
        />
      );
    }

    if (currentPath.startsWith('/articles')) {
      const parts = currentPath.split('/');
      const slug = parts.length > 2 ? parts[2] : undefined;
      return (
        <ArticlesView
          articles={articles}
          settings={settings}
          activeSlug={slug}
          navigate={navigate}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      );
    }

    if (currentPath.startsWith('/contact')) {
      return (
        <ContactView
          settings={settings}
        />
      );
    }

    if (currentPath.startsWith('/admin')) {
      return (
        <AdminView
          products={products}
          setProducts={setProducts}
          orders={orders}
          setOrders={setOrders}
          articles={articles}
          setArticles={setArticles}
          settings={settings}
          setSettings={setSettings}
          isAdminLoggedIn={isAdminLoggedIn}
          setIsAdminLoggedIn={setIsAdminLoggedIn}
        />
      );
    }

    // Default Fallback
    return (
      <HomeView
        products={products}
        articles={articles}
        settings={settings}
        navigate={navigate}
        onBuyNow={handleBuyNow}
      />
    );
  };

  return (
    <div className="relative overflow-hidden min-h-screen flex flex-col font-sans bg-[#0a1628] text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      
      {/* Immersive UI Gradient Orbs for Atmosphere */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-[#f59e0b] opacity-10 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[600px] h-[600px] bg-blue-600 opacity-5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Sticky Header Navigation */}
      <Navbar
        currentPath={currentPath}
        navigate={navigate}
        settings={settings}
        isAdminLoggedIn={isAdminLoggedIn}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1 z-10 relative">
        {renderView()}
      </main>

      {/* Footer Component */}
      <Footer
        navigate={navigate}
        settings={settings}
      />

      {/* Floating 24/7 WhatsApp Concierge Widget */}
      <FloatingWhatsApp
        settings={settings}
      />

      {/* Quick Order / Checkout Modal */}
      <CheckoutModal
        product={selectedCheckoutProduct}
        settings={settings}
        onClose={() => setSelectedCheckoutProduct(null)}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Order Toast Notification */}
      {orderToastId && (
        <div className="fixed top-24 right-6 z-50 glass-panel-gold p-4 rounded-2xl border border-emerald-500/40 shadow-2xl flex items-center gap-3 animate-in slide-in-from-right duration-300">
          <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
          <div>
            <p className="font-heading font-bold text-sm text-white">Order {orderToastId} Generated!</p>
            <p className="text-xs text-slate-300">Opening WhatsApp with VIP Concierge to finalize payment.</p>
          </div>
          <button onClick={() => setOrderToastId(null)} className="text-slate-400 hover:text-white ml-2">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
}
