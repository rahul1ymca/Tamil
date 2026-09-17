import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FaqItem, Language } from '../types';

interface FaqSectionProps {
  items: FaqItem[];
  title: string;
  subtitle: string;
  language: Language;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  items,
  title,
  subtitle,
  language
}) => {
  const [openIndices, setOpenIndices] = useState<number[]>([0]); // first item open by default

  const toggleIndex = (index: number) => {
    if (openIndices.includes(index)) {
      setOpenIndices(openIndices.filter((i) => i !== index));
    } else {
      setOpenIndices([...openIndices, index]);
    }
  };

  return (
    <section id="sec-faq" className="scroll-mt-24 my-12 pt-6 border-t border-stone-200">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-red-700 font-semibold text-xs tracking-wider uppercase mb-1">
          <HelpCircle className="w-4 h-4" />
          <span>{language === 'ta' ? 'அடிக்கடி கேட்கப்படும் கேள்விகள்' : 'Frequently Asked Questions'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif-tamil font-bold text-stone-900">
          {title}
        </h2>
        <p className="text-sm text-stone-600 mt-1">
          {subtitle}
        </p>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => {
          const isOpen = openIndices.includes(index);
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen 
                  ? 'bg-stone-50 border-red-200 shadow-xs' 
                  : 'bg-white border-stone-200 hover:border-stone-300'
              }`}
            >
              <button
                id={`faq-toggle-${index}`}
                onClick={() => toggleIndex(index)}
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-serif-tamil font-bold text-base text-stone-900 focus:outline-none"
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <span className={`p-1 rounded-lg transition-transform ${isOpen ? 'bg-red-100 text-red-700 rotate-180' : 'text-stone-700'}`}>
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-4 pt-1 text-sm text-stone-700 leading-relaxed border-t border-stone-200/60 animate-fade-in">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
