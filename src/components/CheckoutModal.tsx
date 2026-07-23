import React, { useState } from 'react';
import { Product, StoreSettings } from '../types';
import { X, Send, ShieldCheck, CheckCircle, Sparkles, CreditCard, Globe } from 'lucide-react';
import { addOrder } from '../lib/storage';
import { getWhatsAppLink, createOrderConfirmationMessage } from '../lib/whatsapp';

interface CheckoutModalProps {
  product: Product | null;
  settings: StoreSettings;
  onClose: () => void;
  onOrderSuccess: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ product, settings, onClose, onOrderSuccess }) => {
  if (!product) return null;

  const [customerName, setCustomerName] = useState('');
  const [customerWhatsApp, setCustomerWhatsApp] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('JazzCash');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerWhatsApp.trim()) return;

    setIsSubmitting(true);

    // Create order in LocalStorage for Admin Panel
    const newOrder = addOrder({
      customerName,
      customerWhatsApp,
      productName: product.name,
      price: product.price,
      paymentMethod,
      notes,
    });

    onOrderSuccess(newOrder.id);

    // Format WhatsApp confirmation link
    const waMessage = createOrderConfirmationMessage(
      newOrder.id,
      customerName,
      product.name,
      product.price,
      paymentMethod,
      notes
    );
    const link = getWhatsAppLink(settings.whatsappNumber, waMessage);

    // Redirect to WhatsApp
    window.open(link, '_blank');
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md glass-panel-gold rounded-3xl p-6 sm:p-8 shadow-2xl border border-amber-500/30">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center text-2xl">
            {product.image}
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-widest text-amber-400 uppercase bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
              Quick Order
            </span>
            <h3 className="font-heading font-bold text-xl text-white">
              {product.name}
            </h3>
            <p className="text-xs text-slate-300 font-semibold">
              Price: <span className="text-amber-400">{product.price}</span>
            </p>
          </div>
        </div>

        {/* Order Form */}
        <form onSubmit={handleSubmitOrder} className="space-y-4">
          
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Your Full Name <span className="text-amber-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Muhammad Ali"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-700 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Your WhatsApp Number <span className="text-amber-400">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="e.g. +92 301 2345678"
              value={customerWhatsApp}
              onChange={(e) => setCustomerWhatsApp(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-700 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Preferred Payment Method
            </label>
            <div className="grid grid-cols-2 gap-2 mb-2">
              {['JazzCash', 'EasyPaisa', 'Bank Transfer', 'International Payment'].map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={`py-2 px-2.5 text-xs font-bold rounded-xl border transition-all flex items-center justify-center gap-1.5 ${
                    paymentMethod === method
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {method === 'International Payment' && <Globe className="w-3.5 h-3.5 text-purple-400 shrink-0" />}
                  <span>{method}</span>
                </button>
              ))}
            </div>

            {paymentMethod === 'International Payment' && (
              <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/40 text-xs text-purple-200 space-y-1 my-2">
                <p className="font-bold text-purple-300 flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-purple-400" />
                  International Order Support (Visa / Card / Wise / Crypto)
                </p>
                <p className="text-[11px] leading-relaxed text-purple-200/90">
                  For customers outside Pakistan, please place your order below. Our VIP Concierge will provide direct payment details & invoice on WhatsApp!
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Special Instructions / Notes (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="Any specific instructions..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-700 focus:border-amber-500 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none resize-none"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-900/90 border border-amber-500/20 text-[11px] text-slate-300 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p>
              Submitting opens a direct WhatsApp chat with our VIP Concierge to confirm payment & send instant login details.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 text-sm transition-all shadow-lg hover:shadow-emerald-600/30 gold-glow-sm"
          >
            <Send className="w-4 h-4" />
            <span>Confirm & Order via WhatsApp</span>
          </button>

        </form>

      </div>
    </div>
  );
};
