import React, { useState, useEffect } from 'react';
import { 
  articleDataTamil, 
  articleDataEnglish 
} from './data/articleData';
import { Language, FontSize } from './types';
import { Header } from './components/Header';
import { TableOfContents } from './components/TableOfContents';
import { BioCard } from './components/BioCard';
import { Timeline } from './components/Timeline';
import { FaqSection } from './components/FaqSection';
import { ShareModal } from './components/ShareModal';
import { Footer } from './components/Footer';
import { 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  ArrowUp, 
  CheckCircle, 
  Sparkles,
  Quote,
  Flame,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  BookOpen
} from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('ta');
  const [fontSize, setFontSize] = useState<FontSize>('normal');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTocId, setActiveTocId] = useState<string>('sec-intro');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const data = language === 'ta' ? articleDataTamil : articleDataEnglish;
  const isTamil = language === 'ta';

  // Toggle Language & sync HTML lang attribute
  const handleToggleLanguage = () => {
    const nextLang = language === 'ta' ? 'en' : 'ta';
    setLanguage(nextLang);
    document.documentElement.lang = nextLang;
    document.title = nextLang === 'ta' 
      ? articleDataTamil.seo.title 
      : articleDataEnglish.seo.title;
  };

  // Scroll Progress & Active Section Spy
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      
      if (totalScroll > 0) {
        const progress = Math.min(100, Math.max(0, (currentScroll / totalScroll) * 100));
        setScrollProgress(progress);
      }

      setShowScrollTop(currentScroll > 400);

      // Section spy
      const sections = [
        'sec-intro',
        'sec-career',
        'sec-savukku-media',
        'sec-political-impact',
        'sec-legal-battles',
        'sec-timeline',
        'sec-public-views',
        'sec-faq',
        'sec-conclusion'
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            setActiveTocId(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute font size class for body text
  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-lg sm:text-xl leading-relaxed';
      case 'xlarge':
        return 'text-xl sm:text-2xl leading-loose';
      case 'normal':
      default:
        return 'text-base sm:text-lg leading-relaxed';
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-900 flex flex-col font-sans-tamil selection:bg-red-700 selection:text-white">
      
      {/* Sticky Top Header with Reading Progress Bar, Language Switcher, Font Controls, Share */}
      <Header
        language={language}
        onToggleLanguage={handleToggleLanguage}
        fontSize={fontSize}
        onChangeFontSize={setFontSize}
        onOpenShare={() => setIsShareModalOpen(true)}
        onOpenMobileToc={() => setIsMobileTocOpen(true)}
        scrollProgress={scrollProgress}
      />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Main Article Content (8 Cols on Desktop) */}
          <main className="lg:col-span-8">
            <article className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs">
              
              {/* Category Badge & Live Metadata */}
              <header id="article-header" className="pb-8 border-b border-stone-200">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
                    <Flame className="w-3.5 h-3.5 fill-red-700" />
                    <span>{data.header.badge}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-700">
                    <Clock className="w-3 h-3 text-stone-700" />
                    <span>{data.seo.readTime}</span>
                  </span>
                </div>

                {/* Primary H1 Article Title */}
                <h1 className="text-2xl sm:text-4xl lg:text-4xl font-serif-tamil font-extrabold text-stone-900 tracking-tight leading-snug sm:leading-tight mb-4">
                  {data.header.title}
                </h1>

                {/* Subtitle / Lead Paragraph */}
                <p className="text-base sm:text-xl font-medium text-stone-600 leading-relaxed mb-6 font-serif-tamil">
                  {data.header.subtitle}
                </p>

                {/* Author & Timestamp bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-100 text-xs text-stone-700">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-stone-800 text-white flex items-center justify-center font-bold text-xs">
                      ச
                    </div>
                    <div>
                      <span className="font-semibold text-stone-900 block">{data.seo.author}</span>
                      <span className="text-stone-700">{data.seo.category}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-stone-700 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-stone-700" />
                      {data.seo.publishDate}
                    </span>
                    <span className="hidden sm:inline text-stone-300">|</span>
                    <span className="hidden sm:inline text-stone-700">
                      {isTamil ? 'புதுப்பிக்கப்பட்டது: ' : 'Updated: '} {data.seo.updatedDate}
                    </span>
                  </div>
                </div>
              </header>

              {/* Article Body Sections */}
              <div className={`space-y-10 ${getFontSizeClass()} text-stone-800`}>
                
                {/* 1. Introduction */}
                <section id="sec-intro" className="scroll-mt-24">
                  <h2 className="text-2xl sm:text-3xl font-serif-tamil font-bold text-stone-900 mb-4 pb-2 border-b border-stone-100 flex items-center gap-2">
                    <span className="text-red-700">#</span>
                    <span>{data.sections.intro.title}</span>
                  </h2>
                  <p className="mb-4">{data.sections.intro.p1}</p>
                  <p className="mb-4">{data.sections.intro.p2}</p>
                  
                  {/* Highlight Callout Box */}
                  <div className="my-6 p-5 bg-red-50/80 rounded-2xl border-l-4 border-red-700 text-stone-900 italic font-serif-tamil text-base sm:text-lg flex items-start gap-3">
                    <Quote className="w-6 h-6 text-red-700 shrink-0 mt-1 opacity-80" />
                    <p>{data.sections.intro.callout}</p>
                  </div>

                  <p>{data.sections.intro.p3}</p>
                </section>

                {/* 2. DVAC & Whistleblower Roots */}
                <section id="sec-career" className="scroll-mt-24 pt-4">
                  <h2 className="text-2xl sm:text-3xl font-serif-tamil font-bold text-stone-900 mb-2 pb-2 border-b border-stone-100 flex items-center gap-2">
                    <span className="text-red-700">#</span>
                    <span>{data.sections.career.title}</span>
                  </h2>
                  <p className="text-sm font-semibold text-red-800 mb-4 uppercase tracking-wider">
                    {data.sections.career.subtitle}
                  </p>
                  <p className="mb-4">{data.sections.career.p1}</p>
                  <p className="mb-4">{data.sections.career.p2}</p>
                  <p className="mb-6">{data.sections.career.p3}</p>

                  {/* Bullet Highlights Card */}
                  <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-3 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-red-700" />
                      <span>{isTamil ? 'விசிலூதிப் பின்னணியின் முக்கியக் கூறுகள்' : 'Whistleblower Foundation Points'}</span>
                    </h3>
                    <ul className="space-y-2.5 text-sm sm:text-base">
                      {data.sections.career.bulletPoints.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>

                {/* 3. Savukku Website & Digital Journalism */}
                <section id="sec-savukku-media" className="scroll-mt-24 pt-4">
                  <h2 className="text-2xl sm:text-3xl font-serif-tamil font-bold text-stone-900 mb-2 pb-2 border-b border-stone-100 flex items-center gap-2">
                    <span className="text-red-700">#</span>
                    <span>{data.sections.savukkuMedia.title}</span>
                  </h2>
                  <p className="text-sm font-semibold text-red-800 mb-4 uppercase tracking-wider">
                    {data.sections.savukkuMedia.subtitle}
                  </p>
                  <p className="mb-4">{data.sections.savukkuMedia.p1}</p>
                  <p className="mb-6">{data.sections.savukkuMedia.p2}</p>

                  {/* Feature Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                    {data.sections.savukkuMedia.features.map((feat, idx) => (
                      <div key={idx} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col justify-between">
                        <div>
                          <h4 className="font-serif-tamil font-bold text-base text-stone-900 mb-2">
                            {feat.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                            {feat.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 4. Political Commentary & Impact */}
                <section id="sec-political-impact" className="scroll-mt-24 pt-4">
                  <h2 className="text-2xl sm:text-3xl font-serif-tamil font-bold text-stone-900 mb-2 pb-2 border-b border-stone-100 flex items-center gap-2">
                    <span className="text-red-700">#</span>
                    <span>{data.sections.politicalImpact.title}</span>
                  </h2>
                  <p className="text-sm font-semibold text-red-800 mb-4 uppercase tracking-wider">
                    {data.sections.politicalImpact.subtitle}
                  </p>
                  <p className="mb-4">{data.sections.politicalImpact.p1}</p>
                  <p className="mb-6">{data.sections.politicalImpact.p2}</p>

                  {/* Highlight Quote Block */}
                  <figure className="my-8 p-6 bg-stone-900 text-stone-100 rounded-2xl border border-stone-800 shadow-md">
                    <blockquote className="font-serif-tamil text-lg sm:text-xl font-medium leading-relaxed mb-3">
                      {data.sections.politicalImpact.quote}
                    </blockquote>
                    <figcaption className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                      {data.sections.politicalImpact.quoteAuthor}
                    </figcaption>
                  </figure>

                  <p>{data.sections.politicalImpact.p3}</p>
                </section>

                {/* 5. Legal Battles & Arrests */}
                <section id="sec-legal-battles" className="scroll-mt-24 pt-4">
                  <h2 className="text-2xl sm:text-3xl font-serif-tamil font-bold text-stone-900 mb-2 pb-2 border-b border-stone-100 flex items-center gap-2">
                    <span className="text-red-700">#</span>
                    <span>{data.sections.legalBattles.title}</span>
                  </h2>
                  <p className="text-sm font-semibold text-red-800 mb-4 uppercase tracking-wider">
                    {data.sections.legalBattles.subtitle}
                  </p>
                  <p className="mb-4">{data.sections.legalBattles.p1}</p>
                  <p className="mb-6">{data.sections.legalBattles.p2}</p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-6">
                    {data.sections.legalBattles.highlights.map((item, idx) => (
                      <div key={idx} className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                        <span className="inline-block text-xs font-mono font-bold text-red-700 bg-red-100/60 px-2 py-0.5 rounded mb-1.5">
                          {item.year}
                        </span>
                        <p className="text-xs sm:text-sm text-stone-800 font-medium">
                          {item.event}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 6. Career Timeline Component */}
                <Timeline
                  items={data.sections.timeline.items}
                  title={data.sections.timeline.title}
                  subtitle={data.sections.timeline.subtitle}
                  language={language}
                />

                {/* 7. Public Views: Support vs Critiques */}
                <section id="sec-public-views" className="scroll-mt-24 pt-4">
                  <h2 className="text-2xl sm:text-3xl font-serif-tamil font-bold text-stone-900 mb-6 pb-2 border-b border-stone-100 flex items-center gap-2">
                    <span className="text-red-700">#</span>
                    <span>{data.sections.publicViews.title}</span>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Supporters */}
                    <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200">
                      <h3 className="font-serif-tamil font-bold text-base text-emerald-900 mb-3 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                        <span>{data.sections.publicViews.supportersTitle}</span>
                      </h3>
                      <ul className="space-y-2 text-xs sm:text-sm text-emerald-950">
                        {data.sections.publicViews.supportersPoints.map((pt, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-emerald-700 font-bold shrink-0">✓</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Critics */}
                    <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200">
                      <h3 className="font-serif-tamil font-bold text-base text-amber-900 mb-3 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                        <span>{data.sections.publicViews.criticsTitle}</span>
                      </h3>
                      <ul className="space-y-2 text-xs sm:text-sm text-amber-950">
                        {data.sections.publicViews.criticsPoints.map((pt, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-amber-700 font-bold shrink-0">⚠</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>

                {/* 8. FAQ Section Component */}
                <FaqSection
                  items={data.sections.faq.items}
                  title={data.sections.faq.title}
                  subtitle={data.sections.faq.subtitle}
                  language={language}
                />

                {/* 9. Conclusion */}
                <section id="sec-conclusion" className="scroll-mt-24 pt-6 border-t border-stone-200">
                  <h2 className="text-2xl sm:text-3xl font-serif-tamil font-bold text-stone-900 mb-4 pb-2 border-b border-stone-100 flex items-center gap-2">
                    <span className="text-red-700">#</span>
                    <span>{data.sections.conclusion.title}</span>
                  </h2>
                  <p className="mb-4">{data.sections.conclusion.p1}</p>
                  <p className="mb-6">{data.sections.conclusion.p2}</p>

                  <div className="p-6 bg-stone-900 text-white rounded-2xl text-center font-serif-tamil font-bold text-lg sm:text-xl shadow-lg border border-stone-800">
                    <p className="text-stone-200">
                      {data.sections.conclusion.finalQuote}
                    </p>
                  </div>
                </section>

              </div>

              {/* In-Article Share Bar */}
              <div className="mt-12 pt-6 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-50 p-5 rounded-2xl">
                <div>
                  <p className="font-serif-tamil font-bold text-sm text-stone-900">
                    {data.sharePrompt}
                  </p>
                  <p className="text-xs text-stone-600">
                    {isTamil ? 'அரசியல் மற்றும் ஊடக விழிப்புணர்வை நண்பர்களுடன் பகிருங்கள்' : 'Spread political and media transparency awareness'}
                  </p>
                </div>
                <button
                  id="in-article-share-btn"
                  onClick={() => setIsShareModalOpen(true)}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-red-700 hover:bg-red-800 text-white text-sm font-semibold shadow-xs transition active:scale-95 shrink-0"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{isTamil ? 'இப்போதே பகிரவும்' : 'Share Article'}</span>
                </button>
              </div>

            </article>
          </main>

          {/* Sticky Desktop Sidebar (4 Cols on Desktop) */}
          <aside className="hidden lg:block lg:col-span-4 space-y-6 sticky top-24">
            
            {/* Quick Profile Card */}
            <BioCard bio={data.quickBio} language={language} />

            {/* Interactive Table of Contents with Jump Links */}
            <TableOfContents
              items={data.tocItems}
              title={data.tocTitle}
              activeId={activeTocId}
            />

            {/* Keywords Tag Cloud Box for SEO */}
            <div className="bg-stone-50 rounded-2xl border border-stone-200 p-5">
              <h4 className="text-xs font-mono font-bold tracking-wider uppercase text-stone-700 mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-red-700" />
                <span>{data.keywordsCloudTitle}</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {data.keywordsList.slice(0, 10).map((kw, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-white text-stone-700 border border-stone-200 hover:border-red-600 hover:text-red-700 transition-colors"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            </div>

          </aside>

        </div>
      </div>

      {/* Mobile Drawer Table of Contents */}
      {isMobileTocOpen && (
        <div 
          className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex justify-start lg:hidden animate-fade-in"
          onClick={() => setIsMobileTocOpen(false)}
        >
          <div 
            className="w-4/5 max-w-sm bg-white h-full shadow-2xl p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-4">
              <span className="font-serif-tamil font-bold text-stone-900">
                {data.tocTitle}
              </span>
              <button
                onClick={() => setIsMobileTocOpen(false)}
                className="p-2 text-stone-700 hover:bg-stone-100 rounded-lg"
              >
                ✕
              </button>
            </div>
            <TableOfContents
              items={data.tocItems}
              title={data.tocTitle}
              activeId={activeTocId}
              onItemClick={() => setIsMobileTocOpen(false)}
              isMobileDrawer
            />
          </div>
        </div>
      )}

      {/* Share Modal Dialog */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        language={language}
      />

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          id="floating-back-to-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-30 p-3 rounded-full bg-red-700 text-white shadow-xl hover:bg-red-800 transition-all hover:scale-110 active:scale-95 flex items-center justify-center ring-4 ring-white/50"
          title={isTamil ? "மேலே செல்ல" : "Back to top"}
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Footer with On-Page SEO Keywords and Standards */}
      <Footer
        language={language}
        keywordsTitle={data.keywordsCloudTitle}
        keywords={data.keywordsList}
        onOpenShare={() => setIsShareModalOpen(true)}
        onToggleLanguage={handleToggleLanguage}
      />

    </div>
  );
}
