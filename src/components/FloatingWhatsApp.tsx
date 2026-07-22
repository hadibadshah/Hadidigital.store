import React, { useState } from 'react';
import { MessageCircle, X, Sparkles, Send } from 'lucide-react';
import { StoreSettings } from '../types';
import { getWhatsAppLink } from '../lib/whatsapp';

interface FloatingWhatsAppProps {
  settings: StoreSettings;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ settings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quickMsg, setQuickMsg] = useState('');

  const waLink = getWhatsAppLink(
    settings.whatsappNumber,
    quickMsg.trim() ? quickMsg : `Assalam-o-Alaikum ${settings.brandName}, I need assistance regarding digital tools!`
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Quick Chat Popup Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 glass-panel-gold rounded-2xl p-5 shadow-2xl border border-emerald-500/30 animate-in fade-in slide-in-from-bottom duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-lg">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full"></span>
              </div>
              <div>
                <h4 className="font-heading font-bold text-white text-sm">
                  {settings.brandName} Support
                </h4>
                <p className="text-[11px] text-emerald-400 font-medium">
                  VIP Concierge • Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-4 space-y-3">
            <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <p className="font-semibold text-amber-400 mb-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Assalam-o-Alaikum!
              </p>
              Welcome to {settings.brandName}! How can we help you today? Ask about Capcut Pro, ChatGPT Plus, ElevenLabs, or YouTube monetization.
            </div>

            <textarea
              value={quickMsg}
              onChange={(e) => setQuickMsg(e.target.value)}
              placeholder="Type your question or product requirement here..."
              className="w-full bg-slate-950/80 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none h-20"
            />
          </div>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition-all shadow-lg hover:shadow-emerald-600/40"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Open Direct WhatsApp Chat</span>
          </a>
        </div>
      )}

      {/* Floating Main Button */}
      <div className="flex items-center gap-3">
        {!isOpen && (
          <div className="hidden sm:block bg-white/10 border border-white/10 backdrop-blur-xl p-3 px-5 rounded-2xl text-xs rounded-br-none shadow-2xl text-slate-200">
            Need help? <span className="text-green-400 font-bold">Chat with us</span>
          </div>
        )}
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          id="floating-whatsapp-toggle"
          className="w-16 h-16 bg-green-500 hover:bg-green-400 text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40 cursor-pointer transition-transform hover:scale-110 active:scale-95 z-50"
          aria-label="Open WhatsApp Support"
        >
          <MessageCircle className="w-8 h-8" />
        </button>
      </div>

    </div>
  );
};
