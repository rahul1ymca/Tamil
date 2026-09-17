import React from 'react';
import { ArrowUp, Share2, Globe, Shield, BookOpen, ExternalLink } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  language: Language;
  keywordsTitle: string;
  keywords: string[];
  onOpenShare: () => void;
  onToggleLanguage: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  keywordsTitle,
  keywords,
  onOpenShare,
  onToggleLanguage
}) => {
  const isTamil = language === 'ta';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 pt-12 pb-16 border-t border-stone-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Keywords Cloud for On-Page SEO */}
        <div className="pb-10 border-b border-stone-800">
          <h3 className="text-xs font-mono font-bold tracking-widest uppercase text-stone-400 mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-red-500" />
            <span>{keywordsTitle}</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {keywords.map((kw, i) => (
              <span
                key={i}
                className="text-xs font-medium px-3 py-1.5 rounded-lg bg-stone-900 text-stone-300 border border-stone-800 hover:border-red-700/60 hover:text-white transition-colors cursor-default"
              >
                #{kw}
              </span>
            ))}
          </div>
        </div>

        {/* Brand & Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-b border-stone-800">
          
          {/* Col 1: About blog */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-3 h-3 rounded-full bg-red-600" />
              <h4 className="font-serif-tamil font-bold text-lg text-white">
                {isTamil ? 'சவுக்கு சங்கர் பார்வை' : 'Savukku Shankar Chronicle'}
              </h4>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed mb-4">
              {isTamil
                ? 'தமிழ்நாடு அரசியல் விமர்சகர் மற்றும் புலனாய்வு இதழாளர் சவுக்கு சங்கர் (Savukku Shankar) அவர்களின் விரிவான வாழ்க்கை வரலாறு, சவுக்கு மீடியா தாக்கம் மற்றும் கருத்துரிமைப் போராட்டங்களின் ஆவணத் தொகுப்பு.'
                : 'A comprehensive analytical dossier documenting the career, whistleblowing trajectory, legal struggles, and political commentary of Savukku Shankar in modern Tamil Nadu.'}
            </p>
            <div className="flex items-center gap-3">
              <button
                id="footer-share-btn"
                onClick={onOpenShare}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-200 text-xs font-semibold border border-stone-700 transition"
              >
                <Share2 className="w-3.5 h-3.5 text-red-400" />
                <span>{isTamil ? 'பகிர்' : 'Share'}</span>
              </button>
              <button
                id="footer-language-btn"
                onClick={onToggleLanguage}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-700/80 hover:bg-red-700 text-white text-xs font-semibold transition"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{isTamil ? 'English Version' : 'தமிழ் பதிப்பு'}</span>
              </button>
            </div>
          </div>

          {/* Col 2: Quick Jump links */}
          <div>
            <h4 className="font-serif-tamil font-bold text-sm text-white mb-3">
              {isTamil ? 'முக்கியப் பகுதிகள்' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#sec-intro" className="hover:text-red-400 transition">
                  {isTamil ? '• யார் இந்த சவுக்கு சங்கர்?' : '• Who is Savukku Shankar?'}
                </a>
              </li>
              <li>
                <a href="#sec-career" className="hover:text-red-400 transition">
                  {isTamil ? '• லஞ்ச ஒழிப்புத்துறை & விசிலூதிப் பின்னணி' : '• DVAC Career & Whistleblower Roots'}
                </a>
              </li>
              <li>
                <a href="#sec-savukku-media" className="hover:text-red-400 transition">
                  {isTamil ? '• சவுக்கு மீடியா & புலனாய்வு இதழியல்' : '• Savukku Media & Investigative Journalism'}
                </a>
              </li>
              <li>
                <a href="#sec-timeline" className="hover:text-red-400 transition">
                  {isTamil ? '• மைல்கற்கள் காலக்கோடு (Timeline)' : '• Milestone Timeline'}
                </a>
              </li>
              <li>
                <a href="#sec-faq" className="hover:text-red-400 transition">
                  {isTamil ? '• அடிக்கடி கேட்கப்படும் வினாக்கள் (FAQ)' : '• Frequently Asked Questions'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Disclaimer & Standards */}
          <div>
            <div className="flex items-center gap-2 mb-2 text-white text-sm font-semibold">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>{isTamil ? 'இதழியல் & நெறிமுறை மறுப்புரை' : 'Editorial Disclaimer'}</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              {isTamil
                ? 'இக்கட்டுரை பொதுவெளியில் உள்ள நீதிமன்ற உத்தரவுகள், செய்தி அறிக்கைகள் மற்றும் அதிகாரப்பூர்வ ஆவணங்களின் அடிப்படையில் நடுநிலையான கல்வி மற்றும் அரசியல் விழிப்புணர்வு நோக்கத்திற்காக மட்டுமே தொகுக்கப்பட்டுள்ளது.'
                : 'This analytical article is compiled for objective political inquiry and civic awareness based strictly upon verified judicial records, public domain reportage, and official disclosures.'}
            </p>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} சவுக்கு சங்கர் பார்வை (Savukku Shankar Chronicle). All rights reserved.</p>
          <button
            id="footer-back-to-top-btn"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-stone-400 hover:text-white transition group"
          >
            <span>{isTamil ? 'பக்கத்தின் மேல் பகுதிக்குச் செல்க' : 'Back to top'}</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
};
