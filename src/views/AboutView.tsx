import React from 'react';
import { StoreSettings } from '../types';
import { ShieldCheck, Award, Users, Headphones, CheckCircle2, Heart, Sparkles } from 'lucide-react';

interface AboutViewProps {
  settings: StoreSettings;
  navigate: (path: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ settings, navigate }) => {
  return (
    <div className="space-y-16 pb-16">
      
      {/* Header Banner */}
      <section className="text-center max-w-3xl mx-auto pt-6 px-4">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold text-amber-400 mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          AN ECOSYSTEM OF TRUST
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-[#f59e0b] mb-4 leading-tight">
          About {settings.brandName}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed italic border-x-2 border-amber-500/50 px-6 py-2 bg-[#0f1c30]/50 rounded-2xl">
          "{settings.brandStory}"
        </p>
      </section>

      {/* Stats (3 Cards required by prompt) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="glass-panel-gold rounded-3xl p-8 text-center border border-amber-500/30">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              👥
            </div>
            <h3 className="font-heading font-extrabold text-4xl text-amber-400 mb-1">
              1000+
            </h3>
            <p className="font-bold text-white text-base mb-2">Satisfied Customers</p>
            <p className="text-xs text-slate-400">
              Trusted by creators, video editors, YouTubers, and agency owners across Pakistan.
            </p>
          </div>

          <div className="glass-panel-gold rounded-3xl p-8 text-center border border-amber-500/30">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              ⚡
            </div>
            <h3 className="font-heading font-extrabold text-4xl text-emerald-400 mb-1">
              50+
            </h3>
            <p className="font-bold text-white text-base mb-2">Digital Products</p>
            <p className="text-xs text-slate-400">
              Including Capcut Pro, ElevenLabs, ChatGPT Plus, Super Grok, and monetization packages.
            </p>
          </div>

          <div className="glass-panel-gold rounded-3xl p-8 text-center border border-amber-500/30">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              🎧
            </div>
            <h3 className="font-heading font-extrabold text-4xl text-blue-400 mb-1">
              24/7
            </h3>
            <p className="font-bold text-white text-base mb-2">Dedicated VIP Support</p>
            <p className="text-xs text-slate-400">
              Instant response on WhatsApp to assist you with installation, setup, and key renewals.
            </p>
          </div>

        </div>
      </section>

      {/* Mission & Brand Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-800 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          <div>
            <span className="text-xs font-bold text-amber-400 tracking-widest uppercase">
              OUR MISSION
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mt-2 mb-4">
              Democratizing High-End Digital Tools
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              At Hadi Digital Store, we believe Pakistani content creators deserve access to world-class AI software, video editing suites, and channel automation strategies without prohibitive international credit card barriers.
            </p>
            <p className="text-slate-400 text-xs leading-relaxed mb-6">
              Every tool in our catalog is verified, policy-compliant, and supported by a 100% replacement warranty. We pride ourselves on transparent pricing, genuine accounts, and unyielding customer commitment.
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs font-semibold">
              <div className="flex items-center gap-2 text-slate-200 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Bilkul Original Accounts</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Instant Replacement</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Pakistani Local Payments</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>VIP Concierge Support</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-tr from-slate-900 via-[#0a1628] to-slate-800 p-8 rounded-2xl border border-amber-500/20 text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto text-3xl font-extrabold font-heading gold-glow">
              HDS
            </div>
            <h3 className="font-heading font-extrabold text-xl text-white">
              Hadi Digital Store Ecosystem
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
              "We don't just sell software licenses — we empower digital entrepreneurs to scale faster, produce better content, and build passive income streams."
            </p>
            <button
              onClick={() => navigate('/shop')}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-2.5 rounded-xl text-xs shadow-md"
            >
              Explore Store Catalog
            </button>
          </div>

        </div>
      </section>

      {/* Team Placeholder Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-amber-400 tracking-widest uppercase">
            THE PEOPLE BEHIND HDS
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mt-1">
            Dedicated Concierge Team
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl text-center border border-slate-800 hover:border-amber-500/30 transition-all">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl mx-auto mb-4">
              👨‍💻
            </div>
            <h4 className="font-heading font-bold text-white text-base">Hadi Digital Team</h4>
            <p className="text-amber-400 text-xs font-semibold">Founder & Chief Strategist</p>
            <p className="text-slate-400 text-xs mt-2">Overseeing digital flows, VIP customer relations, and software partnerships.</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl text-center border border-slate-800 hover:border-amber-500/30 transition-all">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-2xl mx-auto mb-4">
              🎙️
            </div>
            <h4 className="font-heading font-bold text-white text-base">AI & Automation Desk</h4>
            <p className="text-emerald-400 text-xs font-semibold">Technical Specialists</p>
            <p className="text-slate-400 text-xs mt-2">Dedicated to ElevenLabs, ChatGPT Plus, and Super Grok activations.</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl text-center border border-slate-800 hover:border-amber-500/30 transition-all">
            <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-2xl mx-auto mb-4">
              🎬
            </div>
            <h4 className="font-heading font-bold text-white text-base">YouTube Growth Desk</h4>
            <p className="text-blue-400 text-xs font-semibold">Monetization Experts</p>
            <p className="text-slate-400 text-xs mt-2">Managing watchtime methods, non-drop subscribers, and course mentorship.</p>
          </div>
        </div>
      </section>

    </div>
  );
};
