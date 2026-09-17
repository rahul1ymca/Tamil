import React from 'react';
import { Clock, Calendar, CheckCircle } from 'lucide-react';
import { TimelineItem, Language } from '../types';

interface TimelineProps {
  items: TimelineItem[];
  title: string;
  subtitle: string;
  language: Language;
}

export const Timeline: React.FC<TimelineProps> = ({
  items,
  title,
  subtitle,
  language
}) => {
  return (
    <section id="sec-timeline" className="scroll-mt-24 my-12">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-red-700 font-semibold text-xs tracking-wider uppercase mb-1">
          <Clock className="w-4 h-4" />
          <span>{language === 'ta' ? 'காலக்கோடு தொகுப்பு' : 'Chronological Timeline'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif-tamil font-bold text-stone-900">
          {title}
        </h2>
        <p className="text-sm text-stone-600 mt-1">
          {subtitle}
        </p>
      </div>

      <div className="relative border-l-2 border-stone-200 ml-4 sm:ml-6 pl-4 sm:pl-8 space-y-8">
        {items.map((item, index) => (
          <div key={index} className="relative group">
            {/* Timeline node */}
            <div className="absolute -left-[25px] sm:-left-[41px] top-1.5 w-5 h-5 rounded-full bg-white border-4 border-red-700 group-hover:scale-125 transition-transform shadow-xs" />
            
            <div className="bg-stone-50 hover:bg-stone-100/80 p-4 sm:p-5 rounded-2xl border border-stone-200 transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-md border border-red-100">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.year}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-700 bg-white px-2 py-0.5 rounded border border-stone-200">
                  {item.tag}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-serif-tamil font-bold text-stone-900 mb-1.5">
                {item.title}
              </h3>
              <p className="text-sm text-stone-700 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
