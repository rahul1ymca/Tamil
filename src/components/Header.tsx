import React, { useEffect, useState } from 'react';
import { 
  Globe, 
  Share2, 
  Type, 
  Menu, 
  X, 
  ArrowUp,
  Bookmark,
  Check
} from 'lucide-react';
import { Language, FontSize } from '../types';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
  fontSize: FontSize;
  onChangeFontSize: (size: FontSize) => void;
  onOpenShare: () => void;
  onOpenMobileToc: () => void;
  scrollProgress: number;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  fontSize,
  onChangeFontSize,
  onOpenShare,
  onOpenMobileToc,
  scrollProgress
}) => {
  const [bookmarked, setBookmarked] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const isTamil = language === 'ta';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-colors">
      {/* Top Reading Progress Bar */}
      <div 
        id="reading-progress-bar-container"
        className="w-full bg-stone-100 h-1.5 overflow-hidden" 
        role="progressbar" 
        aria-valuenow={Math.round(scrollProgress)} 
        aria-valuemin={0} 
        aria-valuemax={100}
      >
        <div 
          id="reading-progress-bar"
          className="h-full bg-gradient-to-r from-red-700 via-red-600 to-amber-600 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Brand / Publication Logo */}
          <div className="flex items-center space-x-3">
            <button
              id="mobile-toc-toggle-btn"
              onClick={onOpenMobileToc}
              aria-label="Table of Contents"
              className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100 active:scale-95 transition"
            >
              <Menu className="w-5 h-5" />
            </button>

            <a 
              href="#sec-intro" 
              className="flex flex-col group cursor-pointer focus:outline-none"
              title={isTamil ? "முகப்புக்குச் செல்" : "Go to top"}
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-700 animate-pulse" />
                <span className="font-serif-tamil text-lg sm:text-xl font-bold tracking-tight text-stone-900 group-hover:text-red-700 transition-colors">
                  {isTamil ? 'சவுக்கு சங்கர் பார்வை' : 'Savukku Shankar Chronicle'}
                </span>
              </div>
              <span className="text-[11px] font-medium text-stone-700 tracking-wider uppercase">
                {isTamil ? 'புலனாய்வு இதழியல் & அரசியல் ஆய்வு' : 'Investigative Journalism & Political Analysis'}
              </span>
            </a>
          </div>

          {/* Controls: Reading bar indicator, Font size, Language switch, Share */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Scroll percentage pill */}
            <div className="hidden sm:flex items-center px-2.5 py-1 text-xs font-mono font-medium text-stone-700 bg-stone-100 rounded-full border border-stone-200">
              <span className="text-red-700 font-bold mr-1">{Math.round(scrollProgress)}%</span>
              <span>{isTamil ? 'வாசிப்பு' : 'read'}</span>
            </div>

            {/* Font Size Adjuster */}
            <div className="hidden md:flex items-center bg-stone-100 rounded-lg p-0.5 border border-stone-200">
              <button
                id="font-size-normal-btn"
                onClick={() => onChangeFontSize('normal')}
                title={isTamil ? 'இயல்பான எழுத்துரு' : 'Normal font size'}
                className={`px-2 py-1 text-xs font-semibold rounded ${
                  fontSize === 'normal' 
                    ? 'bg-white text-stone-900 shadow-xs' 
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                A
              </button>
              <button
                id="font-size-large-btn"
                onClick={() => onChangeFontSize('large')}
                title={isTamil ? 'பெரிய எழுத்துரு' : 'Large font size'}
                className={`px-2 py-1 text-sm font-semibold rounded ${
                  fontSize === 'large' 
                    ? 'bg-white text-stone-900 shadow-xs' 
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                A+
              </button>
              <button
                id="font-size-xlarge-btn"
                onClick={() => onChangeFontSize('xlarge')}
                title={isTamil ? 'மிகப் பெரிய எழுத்துரு' : 'Extra large font size'}
                className={`px-2 py-1 text-base font-semibold rounded ${
                  fontSize === 'xlarge' 
                    ? 'bg-white text-stone-900 shadow-xs' 
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                A++
              </button>
            </div>

            {/* Bookmark button */}
            <button
              id="bookmark-article-btn"
              onClick={handleBookmark}
              title={bookmarked 
                ? (isTamil ? 'சேமிக்கப்பட்டது' : 'Saved') 
                : (isTamil ? 'கட்டுரையைச் சேமிக்க' : 'Save article')}
              className={`p-2 rounded-lg border transition active:scale-95 ${
                bookmarked 
                  ? 'bg-amber-50 border-amber-300 text-amber-700' 
                  : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-amber-600 text-amber-600' : ''}`} />
            </button>

            {/* Share Button */}
            <button
              id="header-share-btn"
              onClick={onOpenShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs sm:text-sm font-medium border border-stone-200 active:scale-95 transition"
              title={isTamil ? 'கட்டுரையைப் பகிர' : 'Share this article'}
            >
              <Share2 className="w-4 h-4 text-stone-700" />
              <span className="hidden sm:inline">{isTamil ? 'பகிர்' : 'Share'}</span>
            </button>

            {/* Language Convert / Toggle Button (Requested feature: switch full blog to English / Tamil) */}
            <button
              id="language-toggle-btn"
              onClick={onToggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-700 hover:bg-red-800 active:scale-95 text-white text-xs sm:text-sm font-semibold shadow-xs transition"
              title={isTamil ? 'ஆங்கிலத்தில் வாசிக்க மாற்றுக' : 'Switch to Tamil'}
            >
              <Globe className="w-4 h-4" />
              <span>{isTamil ? 'English' : 'தமிழ்'}</span>
            </button>

          </div>
        </div>
      </div>

      {/* Bookmark notification toast */}
      {showToast && (
        <div className="absolute right-4 top-18 bg-stone-900 text-white text-xs px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in z-50">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>
            {bookmarked 
              ? (isTamil ? 'கட்டுரை புக்மார்க்கில் சேமிக்கப்பட்டது!' : 'Article bookmarked!') 
              : (isTamil ? 'புக்மார்க் நீக்கப்பட்டது' : 'Bookmark removed')}
          </span>
        </div>
      )}
    </header>
  );
};
