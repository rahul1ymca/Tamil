import React from 'react';
import { UserCheck, ShieldAlert, Award, MapPin, Building2, FileText, CheckCircle2 } from 'lucide-react';
import { ArticleData, Language } from '../types';

interface BioCardProps {
  bio: ArticleData['quickBio'];
  language: Language;
}

export const BioCard: React.FC<BioCardProps> = ({ bio, language }) => {
  const isTamil = language === 'ta';

  return (
    <aside
      id="quick-bio-card"
      aria-label="Profile Card"
      className="bg-stone-50 rounded-2xl border border-stone-200 p-5 shadow-xs"
    >
      {/* Profile Header */}
      <div className="flex items-start gap-3.5 pb-4 border-b border-stone-200">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-800 to-stone-900 flex items-center justify-center text-white text-xl font-serif-tamil font-black shadow-inner shrink-0 ring-2 ring-red-700/20">
          ச
        </div>
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-100">
            {isTamil ? 'சுயவிவரக் குறிப்பு' : 'Profile Dossier'}
          </span>
          <h3 className="font-serif-tamil font-bold text-lg text-stone-900 mt-1 leading-tight">
            {bio.name}
          </h3>
          <p className="text-xs font-semibold text-stone-600">
            {bio.alias}
          </p>
        </div>
      </div>

      {/* Role & Org */}
      <div className="py-3.5 space-y-2 text-xs border-b border-stone-200">
        <div className="flex items-center gap-2 text-stone-700">
          <Building2 className="w-4 h-4 text-stone-700 shrink-0" />
          <span><strong className="text-stone-900">{isTamil ? 'அமைப்பு' : 'Org'}:</strong> {bio.organization}</span>
        </div>
        <div className="flex items-center gap-2 text-stone-700">
          <MapPin className="w-4 h-4 text-stone-700 shrink-0" />
          <span><strong className="text-stone-900">{isTamil ? 'இடம்' : 'Location'}:</strong> {bio.birthPlace}</span>
        </div>
        <div className="flex items-start gap-2 text-stone-700">
          <Award className="w-4 h-4 text-stone-700 shrink-0 mt-0.5" />
          <span><strong className="text-stone-900">{isTamil ? 'அடையாளம்' : 'Known For'}:</strong> {bio.knownFor}</span>
        </div>
      </div>

      {/* Highlights List */}
      <div className="pt-3.5 space-y-2.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
          {isTamil ? 'முக்கியக் குறிப்புகள்' : 'Key Highlights'}
        </h4>
        <div className="space-y-2">
          {bio.details.map((detail, idx) => (
            <div key={idx} className="bg-white p-2.5 rounded-xl border border-stone-200/80 shadow-2xs">
              <span className="block text-[11px] font-bold text-red-800">
                {detail.label}
              </span>
              <span className="text-xs text-stone-700 font-medium">
                {detail.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Verification note */}
      <div className="mt-4 pt-3 border-t border-stone-200 flex items-center gap-1.5 text-[11px] text-stone-700 font-medium">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span>{isTamil ? 'சரிபார்க்கப்பட்ட பொது ஆவணத் தகவல்' : 'Verified public records data'}</span>
      </div>
    </aside>
  );
};
