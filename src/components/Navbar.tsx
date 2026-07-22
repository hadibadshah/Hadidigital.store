import React, { useState } from 'react';
import { ShoppingBag, BookOpen, Info, PhoneCall, Sparkles, Search, Wrench, Menu, X } from 'lucide-react';
import { StoreSettings } from '../types';
import { getWhatsAppLink } from '../lib/whatsapp';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
  settings: StoreSettings;
  isAdminLoggedIn?: boolean;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPath, 
  navigate, 
  settings, 
  searchQuery = '', 
  setSearchQuery 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/', icon: Sparkles },
    { label: 'Shop', path: '/shop', icon: ShoppingBag },
    { label: 'Articles', path: '/articles', icon: BookOpen },
    { label: 'About', path: '/about', icon: Info },
    { label: 'Contact', path: '/contact', icon: PhoneCall },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (setSearchQuery) {
      setSearchQuery(val);
    }
    // If user starts typing search and is not on shop/articles, navigate to shop
    if (val.trim().length > 0 && currentPath !== '/shop' && currentPath !== '/articles') {
      navigate('/shop');
    }
  };

  const waLink = getWhatsAppLink(
    settings.whatsappNumber,
    `Assalam-o-Alaikum ${settings.brandName}, I am visiting your store and need assistance!`
  );

  const ezLink = settings.ezToolboxLink || 'https://eztoolbox.xyz';

  return (
    <header className="sticky top-0 z-50 w-full transition-all">
      {/* Main Navbar Header */}
      <div className="w-full h-16 border-b border-white/5 bg-[#0a1628]/80 text-slate-100 backdrop-blur-xl shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-3">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
            id="navbar-brand-logo"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-[#f59e0b] to-[#b45309] rounded-lg flex items-center justify-center font-bold text-xl shadow-lg shadow-[#f59e0b]/20 text-[#0a1628] font-heading transition-transform group-hover:scale-105">
              H
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-[#f59e0b] transition-colors">
                  Hadi Digital <span className="text-[#f59e0b]">Store</span>
                </span>
              </div>
            </div>
          </div>

          {/* Center/Desktop Nav Links & Integrated Small Search Box */}
          <div className="hidden md:flex items-center gap-5 text-sm font-medium">
            <nav className="flex items-center gap-5">
              {navItems.map((item) => {
                const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavClick(item.path)}
                    id={`nav-link-${item.label.toLowerCase()}`}
                    className={`transition-all py-1 ${
                      isActive
                        ? 'text-[#f59e0b] border-b-2 border-[#f59e0b] font-bold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              {/* EzToolbox Nav Link */}
              <a
                href={ezLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 py-1 px-2.5 rounded-full bg-[#f59e0b]/10 text-[#f59e0b] hover:bg-[#f59e0b]/20 transition-all font-bold text-xs border border-[#f59e0b]/30"
              >
                <Wrench className="w-3 h-3" />
                <span>Free Tools</span>
              </a>
            </nav>

            {/* Compact Header Search Bar with Icon */}
            <div className="relative flex items-center ml-2">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Search tools & guides..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="bg-slate-900/90 border border-slate-700/80 focus:border-[#f59e0b] rounded-full pl-8 pr-7 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none transition-all w-40 lg:w-56 focus:w-64"
                id="header-search-input"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery && setSearchQuery('')}
                  className="absolute right-2.5 text-slate-400 hover:text-white text-xs font-bold"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Mobile Search Icon / Bar & Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Small Mobile Search Input */}
            <div className="relative flex items-center w-36 sm:w-48">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="bg-slate-900 border border-slate-700 focus:border-[#f59e0b] rounded-full pl-7 pr-6 py-1 text-xs text-white placeholder-slate-400 focus:outline-none w-full"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery && setSearchQuery('')}
                  className="absolute right-2 text-slate-400 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
              className="p-2 rounded-xl focus:outline-none bg-slate-800 text-slate-200 shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200 border-b bg-[#0a1628] border-white/10 text-slate-100 shadow-xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                id={`mobile-nav-link-${item.label.toLowerCase()}`}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-base transition-all ${
                  isActive
                    ? 'bg-[#f59e0b] text-[#0a1628] font-bold'
                    : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#0a1628]' : 'text-[#f59e0b]'}`} />
                  <span>{item.label}</span>
                </div>
                {isActive && <span className="w-2 h-2 rounded-full bg-[#0a1628]"></span>}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-700/50 flex flex-col gap-2">
            <a
              href={ezLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/30 font-bold py-3 rounded-xl text-center text-sm"
            >
              <Wrench className="w-4 h-4" />
              <span>EzToolbox Free Tools Hub</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
