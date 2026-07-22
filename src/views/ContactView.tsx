import React, { useState } from 'react';
import { StoreSettings } from '../types';
import { MessageCircle, Users, Mail, Phone, Clock, Send, Sparkles, Youtube, Instagram, ShieldCheck, MapPin } from 'lucide-react';
import { getWhatsAppLink } from '../lib/whatsapp';

interface ContactViewProps {
  settings: StoreSettings;
}

export const ContactView: React.FC<ContactViewProps> = ({ settings }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Product Inquiry');
  const [message, setMessage] = useState('');

  const waDirectLink = getWhatsAppLink(
    settings.whatsappNumber,
    `Assalam-o-Alaikum ${settings.brandName}, I am contacting you directly!`
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const formattedMsg = `📩 *NEW CONTACT INQUIRY*\n\n` +
      `👤 *Name:* ${name}\n` +
      `📧 *Email:* ${email || 'Not provided'}\n` +
      `📌 *Subject:* ${subject}\n` +
      `💬 *Message:* ${message}`;

    const link = getWhatsAppLink(settings.whatsappNumber, formattedMsg);
    window.open(link, '_blank');
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto pt-6 px-4">
        <div className="inline-flex items-center gap-2 bg-[#f59e0b]/10 border border-[#f59e0b]/30 px-3 py-1 rounded-full text-xs font-bold text-[#f59e0b] mb-4">
          <Phone className="w-3.5 h-3.5" />
          24/7 VIP CONCIERGE DESK
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-[#f59e0b] mb-4 leading-tight">
          Get in Touch With {settings.brandName}
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          Need custom pricing, bulk accounts, or instant support for Capcut Pro or ChatGPT Plus? Reach out directly on WhatsApp or submit a quick inquiry below.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Direct Action Buttons & Info */}
        <div className="space-y-6 lg:col-span-1">
          
          {/* Main WhatsApp Direct Button */}
          <div className="glass-panel-gold p-6 rounded-3xl border border-[#f59e0b]/30 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white text-2xl shadow-md">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-white text-base">
                  Direct WhatsApp Chat
                </h3>
                <p className="text-xs text-emerald-400 font-semibold">
                  Fastest Response (Instant)
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Chat live with our account specialists to order, activate tools, or receive payment accounts.
            </p>
            <a
              href={waDirectLink}
              target="_blank"
              rel="noopener noreferrer"
              id="contact-page-whatsapp-btn"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition-all shadow-lg hover:shadow-emerald-600/30"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Start WhatsApp Conversation</span>
            </a>
          </div>

          {/* Join Official WhatsApp Channel - Highlighted with benefits */}
          {settings.whatsappChannel && (
            <div className="glass-panel p-6 rounded-3xl border border-emerald-500/30 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-white text-base">
                    Official WhatsApp Channel
                  </h4>
                  <p className="text-xs text-purple-300 font-bold">Instant Updates & Deals</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300 bg-purple-500/5 p-3.5 rounded-2xl border border-purple-500/20">
                <p className="font-bold text-purple-300 text-[11px] uppercase tracking-wider">🔥 Why You Should Join Our Channel:</p>
                <ul className="space-y-1.5 text-[11px] list-disc list-inside">
                  <li>Exclusive Daily Flash Promo Codes & Discounts</li>
                  <li>Instant Stock Drop Notifications for ChatGPT & CapCut</li>
                  <li>Free Monthly Account Giveaways & Trials</li>
                  <li>Direct YouTube Monetization & Growth Tips</li>
                </ul>
              </div>

              <a
                href={settings.whatsappChannel}
                target="_blank"
                rel="noopener noreferrer"
                id="contact-page-community-btn"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition-all shadow-lg shadow-purple-500/25 text-center"
              >
                <Users className="w-4 h-4" />
                <span>Join Official WhatsApp Channel</span>
              </a>
            </div>
          )}

          {/* EzToolbox Free Tools Link */}
          <div className="glass-panel p-6 rounded-3xl border border-[#f59e0b]/30 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/30 flex items-center justify-center font-bold">
                🛠️
              </div>
              <div>
                <h4 className="font-heading font-bold text-white text-sm">
                  EzToolbox Free Tools
                </h4>
                <p className="text-[11px] text-slate-400">50+ Online Web Tools Hub</p>
              </div>
            </div>
            <a
              href={settings.ezToolboxLink || 'https://eztoolbox.xyz'}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#f59e0b]/15 hover:bg-[#f59e0b]/25 text-[#f59e0b] border border-[#f59e0b]/30 font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition-all text-center"
            >
              <span>Explore EzToolbox.xyz</span>
            </a>
          </div>

          {/* Business Hours & Details */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 text-xs">
            <h4 className="font-heading font-bold text-white text-sm mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#f59e0b]" />
              Business Hours & Operations
            </h4>
            <div className="space-y-2 text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span>Monday – Sunday</span>
                <span className="text-[#f59e0b] font-bold">24/7 Active</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span>Key Delivery Time</span>
                <span className="text-emerald-400 font-bold">Instant (&lt; 5 mins)</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Support Coverage</span>
                <span className="text-slate-300 font-bold">Pakistan Nationwide</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Contact Message Form */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 space-y-6">
          
          <div>
            <span className="text-xs font-bold text-[#f59e0b] tracking-widest uppercase">
              SEND A DIRECT INQUIRY
            </span>
            <h2 className="font-heading font-extrabold text-2xl text-white mt-1">
              Quick Contact Form
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Fill out your request below and click submit to instantly transfer your details to our WhatsApp team.
            </p>
          </div>

          <form onSubmit={handleSendMessage} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Your Full Name <span className="text-[#f59e0b]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rao Rafique"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-700 focus:border-[#f59e0b] rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="e.g. rao@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-700 focus:border-[#f59e0b] rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Subject
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-700 focus:border-[#f59e0b] rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-colors"
              >
                <option value="Capcut Pro Inquiry">Capcut Pro Activation</option>
                <option value="ChatGPT Plus Inquiry">ChatGPT Plus Login</option>
                <option value="ElevenLabs Pro Inquiry">ElevenLabs Pro AI</option>
                <option value="YouTube Growth Inquiry">YouTube Monetization & Watchtime</option>
                <option value="Super Grok Account">Super Grok AI Account</option>
                <option value="Bulk Order / Partnership">Bulk Order / Agency Partnership</option>
                <option value="Other Question">General Question</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Your Message / Details <span className="text-[#f59e0b]">*</span>
              </label>
              <textarea
                required
                rows={5}
                placeholder="Write your message or question here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-700 focus:border-[#f59e0b] rounded-xl p-4 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="bg-[#f59e0b] hover:bg-amber-400 text-[#0a1628] font-extrabold py-3.5 px-8 rounded-xl flex items-center justify-center gap-2 text-xs transition-all shadow-xl gold-glow-sm"
            >
              <Send className="w-4 h-4" />
              <span>Send Message to WhatsApp Desk</span>
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};
