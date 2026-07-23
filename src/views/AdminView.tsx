import React, { useState } from 'react';
import { Product, Article, Order, StoreSettings } from '../types';
import { 
  ShieldCheck, 
  Lock, 
  LogOut, 
  Package, 
  ShoppingBag, 
  FileText, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  Eye, 
  EyeOff, 
  Save, 
  RotateCcw,
  Sparkles,
  Search,
  Copy,
  Code,
  Download,
  Upload
} from 'lucide-react';
import { saveProducts, saveOrders, saveArticles, saveSettings, resetAllData } from '../lib/storage';

interface AdminViewProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  articles: Article[];
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
  settings: StoreSettings;
  setSettings: React.Dispatch<React.SetStateAction<StoreSettings>>;
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (val: boolean) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  products,
  setProducts,
  orders,
  setOrders,
  articles,
  setArticles,
  settings,
  setSettings,
  isAdminLoggedIn,
  setIsAdminLoggedIn,
}) => {
  // Login state
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'content' | 'settings'>('products');

  // Edit Price Inline State: { [productId]: price }
  const [editingPrices, setEditingPrices] = useState<{ [key: number]: string }>({});

  // Add Product Modal / Form State
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('Tools');
  const [newProductBadge, setNewProductBadge] = useState('DEAL');
  const [newProductImage, setNewProductImage] = useState('🎬');
  const [newProductDescription, setNewProductDescription] = useState('');

  // Add Article Modal State
  const [showAddArticleModal, setShowAddArticleModal] = useState(false);
  const [newArticleTitle, setNewArticleTitle] = useState('');
  const [newArticleCategory, setNewArticleCategory] = useState('YouTube');
  const [newArticleSummary, setNewArticleSummary] = useState('');
  const [newArticleContent, setNewArticleContent] = useState('');
  const [newArticleKeywords, setNewArticleKeywords] = useState('');

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState<StoreSettings>(settings);
  const [settingsSuccessMsg, setSettingsSuccessMsg] = useState('');

  // Export / Import Catalog Modal State
  const [showExportModal, setShowExportModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [importJsonInput, setImportJsonInput] = useState('');
  const [importError, setImportError] = useState('');
  const [importSuccessMsg, setImportSuccessMsg] = useState('');

  const handleCopyCatalog = () => {
    const formatted = JSON.stringify(products, null, 2);
    navigator.clipboard.writeText(formatted);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 3000);
  };

  const handleImportCatalog = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsed = JSON.parse(importJsonInput);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setProducts(parsed);
        saveProducts(parsed);
        setImportSuccessMsg(`Successfully imported ${parsed.length} products!`);
        setImportError('');
        setImportJsonInput('');
        setTimeout(() => setImportSuccessMsg(''), 4000);
      } else {
        setImportError('Invalid JSON format: Must be a non-empty array of products.');
      }
    } catch (err) {
      setImportError('Invalid JSON code. Please check syntax.');
    }
  };

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === settings.adminPassword) {
      setIsAdminLoggedIn(true);
      setLoginError('');
      setPasswordInput('');
    } else {
      setLoginError('Invalid admin password! Access denied.');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAdminLoggedIn(false);
  };

  // 1. PRODUCTS MANAGEMENT FUNCTIONS
  const handlePriceChange = (id: number, val: string) => {
    setEditingPrices(prev => ({ ...prev, [id]: val }));
  };

  const handleSavePrice = (id: number) => {
    const newPrice = editingPrices[id];
    if (newPrice === undefined) return;

    const updated = products.map(p => p.id === id ? { ...p, price: newPrice } : p);
    setProducts(updated);
    saveProducts(updated);

    // clear editing state for this product
    setEditingPrices(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const handleToggleHide = (id: number) => {
    const updated = products.map(p => p.id === id ? { ...p, isHidden: !p.isHidden } : p);
    setProducts(updated);
    saveProducts(updated);
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      saveProducts(updated);
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim() || !newProductPrice.trim()) return;

    const newProd: Product = {
      id: Date.now(),
      name: newProductName,
      price: newProductPrice,
      category: newProductCategory,
      badge: newProductBadge,
      image: newProductImage || '📦',
      description: newProductDescription,
      isHidden: false,
    };

    const updated = [...products, newProd];
    setProducts(updated);
    saveProducts(updated);

    setShowAddProductModal(false);
    setNewProductName('');
    setNewProductPrice('');
    setNewProductDescription('');
  };

  // 2. ORDERS MANAGEMENT FUNCTIONS
  const handleUpdateOrderStatus = (orderId: string, status: 'Pending' | 'Completed' | 'Cancelled') => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status } : o);
    setOrders(updated);
    saveOrders(updated);
  };

  const handleDeleteOrder = (orderId: string) => {
    if (confirm('Delete this order log?')) {
      const updated = orders.filter(o => o.id !== orderId);
      setOrders(updated);
      saveOrders(updated);
    }
  };

  // 3. CONTENT MANAGEMENT FUNCTIONS
  const handleAddArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArticleTitle.trim() || !newArticleContent.trim()) return;

    const slug = newArticleTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const keywordsArr = newArticleKeywords.split(',').map(k => k.trim()).filter(Boolean);

    const newArt: Article = {
      id: Date.now(),
      title: newArticleTitle,
      slug,
      summary: newArticleSummary,
      content: newArticleContent,
      category: newArticleCategory,
      date: new Date().toISOString().slice(0, 10),
      author: settings.brandName + ' Admin',
      readTime: '5 min read',
      keywords: keywordsArr.length ? keywordsArr : ['HDS', 'Guide'],
    };

    const updated = [newArt, ...articles];
    setArticles(updated);
    saveArticles(updated);

    setShowAddArticleModal(false);
    setNewArticleTitle('');
    setNewArticleSummary('');
    setNewArticleContent('');
    setNewArticleKeywords('');
  };

  const handleDeleteArticle = (id: number) => {
    if (confirm('Delete this article?')) {
      const updated = articles.filter(a => a.id !== id);
      setArticles(updated);
      saveArticles(updated);
    }
  };

  // 4. SETTINGS FUNCTIONS
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettings(settingsForm);
    saveSettings(settingsForm);
    setSettingsSuccessMsg('Store settings updated successfully!');
    setTimeout(() => setSettingsSuccessMsg(''), 4000);
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all store data to defaults? This will restore original 7 products and default settings.')) {
      resetAllData();
      window.location.reload();
    }
  };

  // LOGIN SCREEN
  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="glass-panel-gold rounded-3xl p-8 border border-[#f59e0b]/30 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/40 flex items-center justify-center mx-auto text-3xl">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h2 className="font-heading font-extrabold text-2xl dark:text-white text-slate-900">
              Admin Panel Access
            </h2>
            <p className="text-xs dark:text-slate-400 text-slate-600 mt-1">
              Enter admin password to manage products, prices, orders, and store settings.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full dark:bg-slate-950/80 bg-white border dark:border-slate-700 border-slate-300 focus:border-[#f59e0b] rounded-xl px-4 py-3 text-sm dark:text-white text-slate-900 dark:placeholder-slate-500 placeholder-slate-400 focus:outline-none transition-colors text-center"
              />
            </div>

            {loginError && (
              <p className="text-xs text-red-500 font-semibold bg-red-950/20 p-2 rounded-lg border border-red-500/30">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-[#f59e0b] hover:bg-amber-400 text-[#0a1628] font-extrabold py-3 px-4 rounded-xl text-xs transition-all shadow-lg gold-glow-sm"
            >
              Unlock Admin Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // LOGGED-IN ADMIN DASHBOARD
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      
      {/* Top Admin Bar */}
      <div className="glass-panel p-6 rounded-3xl border border-[#f59e0b]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/40 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading font-extrabold text-2xl dark:text-white text-slate-900">
                Admin Control Panel
              </h1>
              <span className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                LOGGED IN
              </span>
            </div>
            <p className="text-xs dark:text-slate-400 text-slate-600">
              Manage products, edit prices, view orders, and configure WhatsApp settings.
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-slate-800 hover:bg-red-950 text-slate-300 hover:text-red-300 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border border-slate-700"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Admin</span>
        </button>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'products'
              ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md'
              : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Products Management ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'orders'
              ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md'
              : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('content')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'content'
              ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md'
              : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Articles / SEO Content ({articles.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'settings'
              ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md'
              : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Store Settings</span>
        </button>
      </div>

      {/* TAB 1: PRODUCTS MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-heading font-bold text-xl text-white flex items-center gap-2">
                <span>Catalog Products & Live Prices</span>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] px-2 py-0.5 rounded-full font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Firebase Live DB
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Changes saved here instantly update globally across the website via Firebase Cloud Database!
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowExportModal(true)}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-md transition-all"
              >
                <Code className="w-4 h-4" />
                <span>Export / Sync for Hostinger</span>
              </button>
              <button
                onClick={() => setShowAddProductModal(true)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>
          </div>

          {/* Products Table */}
          <div className="glass-panel rounded-2xl border border-slate-800 overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/90 text-amber-400 font-bold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Icon / Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Badge</th>
                  <th className="p-4">Price (Edit + Save)</th>
                  <th className="p-4 text-center">Show / Hide</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {products.map((product) => {
                  const isEditingPrice = editingPrices[product.id] !== undefined;
                  const currentPriceVal = isEditingPrice ? editingPrices[product.id] : product.price;

                  return (
                    <tr key={product.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-4 font-mono text-slate-500">#{product.id}</td>
                      
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{product.image}</span>
                          <div>
                            <p className="font-bold text-white text-sm">{product.name}</p>
                            <p className="text-[11px] text-slate-400 line-clamp-1 max-w-xs">{product.description}</p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded text-[11px] font-semibold">
                          {product.category}
                        </span>
                      </td>

                      <td className="p-4">
                        <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-[10px] font-bold border border-amber-500/30 uppercase">
                          {product.badge}
                        </span>
                      </td>

                      {/* Edit Price Field + Save Button */}
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={currentPriceVal}
                            onChange={(e) => handlePriceChange(product.id, e.target.value)}
                            className="bg-slate-950 border border-slate-700 focus:border-amber-500 rounded-lg px-2.5 py-1.5 text-xs text-amber-400 font-bold w-28"
                          />
                          {isEditingPrice && (
                            <button
                              onClick={() => handleSavePrice(product.id)}
                              className="bg-emerald-600 hover:bg-emerald-500 text-white p-1.5 rounded-lg text-xs flex items-center gap-1 font-bold shadow"
                              title="Save Price"
                            >
                              <Save className="w-3.5 h-3.5" />
                              <span>Save</span>
                            </button>
                          )}
                        </div>
                      </td>

                      {/* Toggle Show / Hide Switch */}
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleToggleHide(product.id)}
                          className={`px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 mx-auto transition-all ${
                            product.isHidden
                              ? 'bg-red-950/60 text-red-300 border border-red-500/30'
                              : 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                          }`}
                        >
                          {product.isHidden ? (
                            <>
                              <EyeOff className="w-3.5 h-3.5" />
                              <span>Hidden</span>
                            </>
                          ) : (
                            <>
                              <Eye className="w-3.5 h-3.5" />
                              <span>Visible</span>
                            </>
                          )}
                        </button>
                      </td>

                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-950/40 rounded-lg transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-bold text-xl text-white">
              Customer Orders & Inquiries Log
            </h2>
            <span className="text-xs text-slate-400">Total Orders: {orders.length}</span>
          </div>

          <div className="glass-panel rounded-2xl border border-slate-800 overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/90 text-amber-400 font-bold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer Name & WhatsApp</th>
                  <th className="p-4">Product</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Payment & Notes</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="p-4 font-mono font-bold text-amber-400">{order.id}</td>
                    <td className="p-4">
                      <p className="font-bold text-white">{order.customerName}</p>
                      <p className="text-[11px] text-emerald-400">{order.customerWhatsApp}</p>
                    </td>
                    <td className="p-4 font-bold text-slate-200">{order.productName}</td>
                    <td className="p-4 font-bold text-amber-300">{order.price}</td>
                    <td className="p-4">
                      <span className="bg-slate-800 px-2 py-0.5 rounded text-[10px] font-bold text-slate-300 block w-max mb-1">
                        {order.paymentMethod || 'WhatsApp Direct'}
                      </span>
                      {order.notes && <p className="text-[10px] text-slate-400 italic">{order.notes}</p>}
                    </td>
                    <td className="p-4 text-[11px] text-slate-400">{order.date}</td>
                    <td className="p-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as any)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold border focus:outline-none ${
                          order.status === 'Completed'
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                            : order.status === 'Pending'
                            ? 'bg-amber-950 text-amber-300 border-amber-500/40'
                            : 'bg-red-950 text-red-300 border-red-500/40'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDeleteOrder(order.id)}
                        className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: CONTENT / ARTICLES MANAGEMENT */}
      {activeTab === 'content' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-bold text-xl text-white">
              Articles & SEO Guides
            </h2>
            <button
              onClick={() => setShowAddArticleModal(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Article</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {articles.map((article) => (
              <div key={article.id} className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/30">
                      {article.category}
                    </span>
                    <span className="text-[11px] text-slate-500">{article.date}</span>
                  </div>
                  <h4 className="font-heading font-bold text-white text-base">{article.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-1">{article.summary}</p>
                </div>
                <button
                  onClick={() => handleDeleteArticle(article.id)}
                  className="p-2 text-slate-400 hover:text-red-400 bg-slate-900 rounded-xl"
                  title="Delete Article"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: STORE SETTINGS */}
      {activeTab === 'settings' && (
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 max-w-2xl space-y-6 animate-in fade-in duration-200">
          <div>
            <h2 className="font-heading font-bold text-2xl text-white">
              Store Configuration & WhatsApp Settings
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Update store links, WhatsApp contact number, and admin login password.
            </p>
          </div>

          {settingsSuccessMsg && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold rounded-xl flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>{settingsSuccessMsg}</span>
            </div>
          )}

          <form onSubmit={handleSaveSettings} className="space-y-4">
            
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                WhatsApp Phone Number (with Country Code)
              </label>
              <input
                type="text"
                value={settingsForm.whatsappNumber}
                onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                EzToolbox Free Tools Link
              </label>
              <input
                type="text"
                placeholder="https://eztoolbox.xyz"
                value={settingsForm.ezToolboxLink || ''}
                onChange={(e) => setSettingsForm({ ...settingsForm, ezToolboxLink: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-amber-400 font-bold focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                WhatsApp Channel / Community Link
              </label>
              <input
                type="text"
                value={settingsForm.whatsappChannel}
                onChange={(e) => setSettingsForm({ ...settingsForm, whatsappChannel: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Contact Support Email
                </label>
                <input
                  type="email"
                  value={settingsForm.email}
                  onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={settingsForm.brandName}
                  onChange={(e) => setSettingsForm({ ...settingsForm, brandName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  YouTube Channel Link
                </label>
                <input
                  type="text"
                  value={settingsForm.youtubeLink}
                  onChange={(e) => setSettingsForm({ ...settingsForm, youtubeLink: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Instagram Link
                </label>
                <input
                  type="text"
                  value={settingsForm.instagramLink}
                  onChange={(e) => setSettingsForm({ ...settingsForm, instagramLink: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Admin Password
              </label>
              <input
                type="text"
                value={settingsForm.adminPassword}
                onChange={(e) => setSettingsForm({ ...settingsForm, adminPassword: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-amber-400 font-bold focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3 rounded-xl text-xs shadow-lg gold-glow-sm"
              >
                Save Settings
              </button>

              <button
                type="button"
                onClick={handleResetData}
                className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1.5 font-bold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Store to Default Data</span>
              </button>
            </div>

          </form>
        </div>
      )}

      {/* ADD PRODUCT MODAL */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg glass-panel-gold rounded-3xl p-6 shadow-2xl border border-amber-500/30 space-y-4">
            <h3 className="font-heading font-bold text-xl text-white">Add New Product</h3>
            <form onSubmit={handleAddProduct} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-300 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Midjourney Pro"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Price (e.g. 1200 PKR or DM to Buy)</label>
                  <input
                    type="text"
                    required
                    placeholder="1200 PKR"
                    value={newProductPrice}
                    onChange={(e) => setNewProductPrice(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">Category</label>
                  <select
                    value={newProductCategory}
                    onChange={(e) => setNewProductCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Tools">Tools</option>
                    <option value="AI">AI</option>
                    <option value="YouTube">YouTube</option>
                    <option value="Course">Course</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Badge Tag</label>
                  <input
                    type="text"
                    placeholder="DEAL / NEW / ELITE"
                    value={newProductBadge}
                    onChange={(e) => setNewProductBadge(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">Icon Emoji</label>
                  <input
                    type="text"
                    placeholder="🎨"
                    value={newProductImage}
                    onChange={(e) => setNewProductImage(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newProductDescription}
                  onChange={(e) => setNewProductDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD ARTICLE MODAL */}
      {showAddArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl glass-panel-gold rounded-3xl p-6 shadow-2xl border border-amber-500/30 space-y-4">
            <h3 className="font-heading font-bold text-xl text-white">Add SEO Article</h3>
            <form onSubmit={handleAddArticle} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-300 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={newArticleTitle}
                  onChange={(e) => setNewArticleTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Category</label>
                  <select
                    value={newArticleCategory}
                    onChange={(e) => setNewArticleCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="YouTube">YouTube</option>
                    <option value="AI Tools">AI Tools</option>
                    <option value="Course & Guides">Course & Guides</option>
                    <option value="Tools">Tools</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">Keywords (comma separated)</label>
                  <input
                    type="text"
                    placeholder="YouTube, Capcut, AI"
                    value={newArticleKeywords}
                    onChange={(e) => setNewArticleKeywords(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Summary</label>
                <input
                  type="text"
                  value={newArticleSummary}
                  onChange={(e) => setNewArticleSummary(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Content (Markdown supported)</label>
                <textarea
                  rows={6}
                  required
                  value={newArticleContent}
                  onChange={(e) => setNewArticleContent(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddArticleModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EXPORT & SYNC CATALOG MODAL */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl glass-panel-gold rounded-3xl p-6 shadow-2xl border border-amber-500/30 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-amber-400" />
                <h3 className="font-heading font-bold text-lg text-white">
                  Sync Products with Hostinger & GitHub
                </h3>
              </div>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold px-2 py-1 bg-slate-800 rounded-lg"
              >
                ✕ Close
              </button>
            </div>

            {/* Explanation card */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 text-xs text-amber-200/90 leading-relaxed space-y-2">
              <p className="font-bold text-amber-400 text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Why do products need Syncing for Hostinger?
              </p>
              <p>
                Hostinger serves static built code compiled from GitHub. Any products you add in this Admin panel are stored in your browser's local cache.
              </p>
              <p>
                To make your new products permanent for <strong>all visitors on hadidigital.store</strong>:
              </p>
              <ol className="list-decimal list-inside space-y-1 font-semibold text-slate-200 pl-2">
                <li>Click <strong>"Copy Catalog Data"</strong> below.</li>
                <li>Paste it in AI Studio chat (e.g. <em>"Please update initialData.ts with my products"</em>).</li>
                <li>AI Studio updates the repository code, and GitHub Actions deploys it live to Hostinger automatically!</li>
              </ol>
            </div>

            {/* Export Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Current Catalog Data ({products.length} products)</span>
                </label>
                <button
                  type="button"
                  onClick={handleCopyCatalog}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow-md"
                >
                  {copySuccess ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copySuccess ? 'Copied to Clipboard!' : 'Copy Catalog Data'}</span>
                </button>
              </div>
              <textarea
                readOnly
                rows={7}
                value={JSON.stringify(products, null, 2)}
                className="w-full bg-slate-950/90 border border-slate-800 rounded-xl p-3 text-[11px] font-mono text-emerald-300 resize-none focus:outline-none"
              />
            </div>

            {/* Import Section */}
            <div className="border-t border-slate-800 pt-4 space-y-3">
              <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Upload className="w-4 h-4 text-amber-400" />
                <span>Import / Restore Products JSON</span>
              </h4>
              <form onSubmit={handleImportCatalog} className="space-y-2">
                <textarea
                  rows={3}
                  placeholder="Paste products JSON here to load into browser..."
                  value={importJsonInput}
                  onChange={(e) => setImportJsonInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-[11px] font-mono text-slate-200 resize-none"
                />
                {importError && (
                  <p className="text-xs text-red-400 font-semibold">{importError}</p>
                )}
                {importSuccessMsg && (
                  <p className="text-xs text-emerald-400 font-semibold">{importSuccessMsg}</p>
                )}
                <div className="flex justify-end gap-2">
                  <button
                    type="submit"
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-xs font-bold"
                  >
                    Import to Browser
                  </button>
                </div>
              </form>
            </div>

            <div className="flex justify-end border-t border-slate-800 pt-3">
              <button
                type="button"
                onClick={() => setShowExportModal(false)}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
