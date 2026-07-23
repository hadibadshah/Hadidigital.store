import React from 'react';
import { ShieldCheck, MessageCircle, Youtube, Instagram, Facebook, Mail, ExternalLink, Heart, Globe } from 'lucide-react';
import { StoreSettings } from '../types';
import { getWhatsAppLink } from '../lib/whatsapp';

interface FooterProps {
  navigate: (path: string) => void;
  settings: StoreSettings;
}

export const Footer: React.FC<FooterProps> = ({ navigate, settings }) => {
  const waContactLink = getWhatsAppLink(settings.whatsappNumber, `Assalam-o-Alaikum ${settings.brandName}, I need support.`);

  return (
    <footer className="bg-black/30 border-t border-white/5 text-slate-400 text-sm mt-20 relative overflow-hidden backdrop-blur-md">
      {/* Immersive UI Subtle Gold Border Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#f59e0b]/40 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-yellow-400 p-0.5">
                <div className="w-full h-full bg-[#0a1628] rounded-[10px] flex items-center justify-center font-bold text-amber-400 font-heading">
                  HDS
                </div>
              </div>
              <span className="font-heading font-extrabold text-xl text-white">
                {settings.brandName}
              </span>
            </div>
            <p className="text-amber-400 font-medium text-xs tracking-wide">
              "{settings.tagline}"
            </p>
            <p className="text-slate-400 text-xs leading-relaxed italic border-l-2 border-amber-500/50 pl-3 py-1">
              "{settings.brandStory}"
            </p>
            <div className="flex items-center gap-3 pt-2">
              {settings.whatsappChannel && (
                <a
                  href={settings.whatsappChannel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white flex items-center justify-center transition-all border border-emerald-500/20"
                  title="WhatsApp Channel"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              )}
              {settings.youtubeLink && (
                <a
                  href={settings.youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all border border-red-500/20"
                  title="YouTube Channel"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
              {settings.instagramLink && (
                <a
                  href={settings.instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-pink-500/10 text-pink-400 hover:bg-pink-500 hover:text-white flex items-center justify-center transition-all border border-pink-500/20"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              <a
                href={settings.facebookLink || 'https://www.facebook.com/hadidigital.store'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all border border-blue-600/20"
                title="Facebook Page"
              >
                <Facebook className="w-4 h-4" />
              </a>
              {settings.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center transition-all border border-amber-500/20"
                  title="Email Us"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-heading font-bold text-white text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a 
                  href={settings.ezToolboxLink || 'https://eztoolbox.xyz'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#f59e0b] hover:underline flex items-center gap-1 font-bold"
                >
                  <span>EzToolbox Free Tools Hub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <button onClick={() => navigate('/')} className="hover:text-amber-400 transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/shop')} className="hover:text-amber-400 transition-colors">
                  Digital Tools & AI Store
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/articles')} className="hover:text-amber-400 transition-colors">
                  SEO Articles & YouTube Guides
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-amber-400 transition-colors">
                  About HDS Trust Ecosystem
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-amber-400 transition-colors">
                  Contact VIP Concierge
                </button>
              </li>
            </ul>
          </div>

          {/* Featured Products */}
          <div>
            <h4 className="font-heading font-bold text-white text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Popular Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-300">Capcut Pro</span>
                <span className="text-amber-400 font-bold">800 PKR</span>
              </li>
              <li className="flex items-center justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-300">ElevenLabs Pro</span>
                <span className="text-amber-400 font-bold">1800 PKR</span>
              </li>
              <li className="flex items-center justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-300">ChatGPT Plus</span>
                <span className="text-amber-400 font-bold">1500 PKR</span>
              </li>
              <li className="flex items-center justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-300">Super Grok AI</span>
                <span className="text-amber-400 font-bold">DM to Buy</span>
              </li>
              <li className="flex items-center justify-between py-1">
                <span className="text-slate-300">YouTube Automation</span>
                <span className="text-amber-400 font-bold">2999 PKR</span>
              </li>
            </ul>
          </div>

          {/* Payment & Security */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-white text-base mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Verified Payments & Global Checkout
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Local instant payments in Pakistan (JazzCash, EasyPaisa, Bank) & <strong>International Payments via WhatsApp</strong>.
            </p>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
              <div className="bg-red-950/40 text-red-300 border border-red-500/30 rounded-lg p-2 text-center">
                JazzCash / EasyPaisa
              </div>
              <div className="bg-blue-950/40 text-blue-300 border border-blue-500/30 rounded-lg p-2 text-center">
                Bank Transfer (PKR)
              </div>
            </div>

            <div className="bg-purple-950/40 border border-purple-500/30 text-purple-200 rounded-xl p-2.5 text-xs flex items-center gap-2">
              <Globe className="w-4 h-4 text-purple-400 shrink-0" />
              <span><strong>International?</strong> Pay via Card/Wise/Crypto on WhatsApp!</span>
            </div>

            <div className="pt-2">
              <a
                href={waContactLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold underline"
              >
                <span>Direct Support on WhatsApp</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Hadi Digital Store (hadidigital.store). All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/admin')}
              className="text-slate-400 hover:text-amber-400 flex items-center gap-1 transition-colors font-medium"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Panel</span>
            </button>
            <span>•</span>
            <span className="text-slate-500 flex items-center gap-1">
              Built for <span className="text-slate-300 font-semibold">Elite Creators</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
