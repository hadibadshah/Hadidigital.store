import React, { useState, useEffect } from 'react';
import { Article, StoreSettings } from '../types';
import { Search, BookOpen, Clock, Calendar, Tag, ArrowLeft, Share2, MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { getWhatsAppLink } from '../lib/whatsapp';

interface ArticlesViewProps {
  articles: Article[];
  settings: StoreSettings;
  activeSlug?: string;
  navigate: (path: string) => void;
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
}

export const ArticlesView: React.FC<ArticlesViewProps> = ({
  articles,
  settings,
  activeSlug,
  navigate,
  searchQuery = '',
  setSearchQuery,
}) => {
  // Find article if slug provided
  const activeArticle = activeSlug ? articles.find(a => a.slug === activeSlug) : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSlug]);

  const filteredArticles = articles.filter(a => {
    return (
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const waArticleCTA = getWhatsAppLink(
    settings.whatsappNumber,
    `Assalam-o-Alaikum ${settings.brandName}, I read your article "${activeArticle?.title || 'Growth Guide'}" and want to inquire about your tools and services!`
  );

  // IF SINGLE ARTICLE READER MODE
  if (activeArticle) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Back Button */}
        <button
          onClick={() => navigate('/articles')}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#f59e0b] hover:text-amber-400 dark:bg-slate-900/80 bg-white border dark:border-slate-800 border-slate-300 px-4 py-2 rounded-xl transition-all shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </button>

        {/* Article Container */}
        <article className="glass-panel-gold rounded-3xl p-6 sm:p-10 border border-[#f59e0b]/30 space-y-8">
          
          {/* Article Header */}
          <div className="space-y-4 border-b dark:border-slate-800 border-slate-200 pb-6">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="bg-[#f59e0b] text-[#0a1628] font-extrabold px-3 py-1 rounded-md">
                {activeArticle.category}
              </span>
              <span className="dark:text-slate-400 text-slate-600 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#f59e0b]" />
                {activeArticle.date}
              </span>
              <span className="dark:text-slate-400 text-slate-600 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#f59e0b]" />
                {activeArticle.readTime}
              </span>
            </div>

            <h1 className="font-heading font-extrabold text-2xl sm:text-4xl dark:text-white text-slate-900 leading-tight">
              {activeArticle.title}
            </h1>

            <p className="dark:text-slate-300 text-slate-700 text-sm leading-relaxed italic dark:bg-slate-950/60 bg-amber-500/10 p-4 rounded-xl border-l-2 border-[#f59e0b]">
              {activeArticle.summary}
            </p>

            {/* Author */}
            <div className="flex items-center justify-between text-xs dark:text-slate-400 text-slate-600 pt-2">
              <span className="font-semibold dark:text-slate-300 text-slate-700">
                By <span className="text-[#f59e0b]">{activeArticle.author}</span>
              </span>
              <button
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Article link copied to clipboard!');
                  }
                }}
                className="flex items-center gap-1 hover:text-[#f59e0b] transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Keywords Bar */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="dark:text-slate-400 text-slate-600 font-semibold flex items-center gap-1 mr-1">
              <Tag className="w-3.5 h-3.5 text-[#f59e0b]" />
              Keywords:
            </span>
            {activeArticle.keywords.map((kw, i) => (
              <span key={i} className="dark:bg-slate-900 bg-slate-100 dark:text-slate-300 text-slate-700 border dark:border-slate-800 border-slate-200 px-2.5 py-1 rounded-lg">
                #{kw}
              </span>
            ))}
          </div>

          {/* Article Main Body Content (Formatted Paragraphs) */}
          <div className="prose prose-invert max-w-none text-sm sm:text-base leading-relaxed space-y-6">
            {activeArticle.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="font-heading font-bold text-xl text-[#f59e0b] mt-8 mb-3 pt-4 border-t dark:border-slate-800/80 border-slate-200">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('- ')) {
                return (
                  <ul key={index} className="list-disc list-inside space-y-2 dark:bg-slate-950/40 bg-slate-50 p-4 rounded-xl border dark:border-slate-800 border-slate-200">
                    {paragraph.split('\n').map((item, itemIdx) => (
                      <li key={itemIdx} className="dark:text-slate-300 text-slate-700 text-sm">
                        {item.replace('- ', '')}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={index} className="dark:text-slate-300 text-slate-700 leading-relaxed font-medium">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Bottom Article WhatsApp CTA */}
          <div className="mt-12 pt-8 border-t dark:border-slate-800 border-slate-200 glass-panel p-6 sm:p-8 rounded-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/40 flex items-center justify-center mx-auto text-2xl">
              🚀
            </div>
            <h3 className="font-heading font-bold text-xl dark:text-white text-slate-900">
              Ready to Accelerate Your Digital Growth?
            </h3>
            <p className="text-xs dark:text-slate-300 text-slate-600 max-w-lg mx-auto">
              Get original Capcut Pro, ElevenLabs Pro, ChatGPT Plus, Super Grok accounts or YouTube Watchtime services with 100% Pakistani local payment guarantees.
            </p>
            <a
              href={waArticleCTA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-6 py-3 rounded-xl text-xs transition-all shadow-lg gold-glow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contact Hadi Digital Store on WhatsApp</span>
            </a>
          </div>

        </article>

      </div>
    );
  }

  // ARTICLES LISTING VIEW
  return (
    <div className="space-y-10 pb-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto pt-6 px-4">
        <div className="inline-flex items-center gap-2 bg-[#f59e0b]/10 border border-[#f59e0b]/30 px-3 py-1 rounded-full text-xs font-bold text-[#f59e0b] mb-4">
          <BookOpen className="w-3.5 h-3.5" />
          KNOWLEDGE BASE & SEO ARTICLES
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-[#f59e0b] mb-4 leading-tight">
          YouTube Growth & AI Strategy Guides
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          In-depth 500+ word technical articles, algorithm strategies, tool breakdowns, and automation guides published by the Hadi Digital Store team.
        </p>
      </div>

      {/* Active Search Filter Badge if typing */}
      {searchQuery && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between bg-slate-900/60 p-3 rounded-2xl border border-slate-800 text-xs">
          <span className="text-slate-300">
            Showing articles for: <span className="text-[#f59e0b] font-bold">"{searchQuery}"</span>
          </span>
          <button
            onClick={() => setSearchQuery && setSearchQuery('')}
            className="text-amber-400 hover:underline font-semibold"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Articles Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => navigate(`/articles/${article.slug}`)}
              className="glass-panel rounded-3xl p-7 dark:border-slate-800 border-slate-200/80 hover:border-[#f59e0b]/50 transition-all cursor-pointer group flex flex-col justify-between hover:-translate-y-1 shadow-lg"
              id={`article-card-${article.id}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4 text-xs">
                  <span className="bg-[#f59e0b]/20 text-[#f59e0b] font-extrabold px-3 py-1 rounded-full border border-[#f59e0b]/30">
                    {article.category}
                  </span>
                  <span className="dark:text-slate-400 text-slate-500 flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3 text-[#f59e0b]" />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-xl dark:text-white text-slate-900 group-hover:text-[#f59e0b] transition-colors mb-3 leading-snug">
                  {article.title}
                </h3>

                <p className="dark:text-slate-400 text-slate-600 text-xs leading-relaxed line-clamp-3 mb-6">
                  {article.summary}
                </p>
              </div>

              <div>
                {/* Keywords Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {article.keywords.slice(0, 3).map((kw, i) => (
                    <span key={i} className="text-[10px] dark:bg-slate-900 bg-slate-100 dark:text-slate-400 text-slate-600 px-2 py-0.5 rounded border dark:border-slate-800 border-slate-200">
                      #{kw}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t dark:border-slate-800 border-slate-200 flex items-center justify-between text-xs text-[#f59e0b] font-bold">
                  <span>Read Full Guide</span>
                  <span className="w-7 h-7 rounded-full bg-[#f59e0b]/10 flex items-center justify-center group-hover:bg-[#f59e0b] group-hover:text-[#0a1628] transition-colors">
                    →
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
