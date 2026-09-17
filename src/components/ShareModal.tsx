import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Send, 
  Share2,
  ExternalLink
} from 'lucide-react';
import { Language } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  const [copied, setCopied] = useState(false);
  const isTamil = language === 'ta';

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ais-dev-l6o66vsp6jw4almcjozetg-85821410625.asia-east1.run.app/';
  const shareTitle = isTamil
    ? 'சவுக்கு சங்கர்: வாழ்க்கை வரலாறு, அரசியல் விமர்சனங்கள் & புலனாய்வு இதழியல்'
    : 'Savukku Shankar: Biography, Political Commentary & Investigative Journalism';
  const shareText = isTamil
    ? 'சவுக்கு சங்கர் (Savukku Shankar) மற்றும் சவுக்கு மீடியா பற்றிய விரிவான அரசியல் ஆய்வுக்கட்டுரை:'
    : 'Comprehensive investigative profile on Savukku Shankar and Savukku Media:';

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(currentUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = currentUrl;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const shareLinks = [
    {
      name: 'WhatsApp',
      iconBg: 'bg-emerald-600',
      iconText: 'WA',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareTitle} - ${currentUrl}`)}`,
      actionText: isTamil ? 'வாட்ஸ்அப்' : 'WhatsApp'
    },
    {
      name: 'X (Twitter)',
      iconBg: 'bg-black',
      iconText: '𝕏',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(currentUrl)}&hashtags=SavukkuShankar,சவுக்குசங்கர்,SavukkuMedia`,
      actionText: 'X (Twitter)'
    },
    {
      name: 'Telegram',
      iconBg: 'bg-sky-600',
      iconText: 'TG',
      url: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareTitle)}`,
      actionText: 'Telegram'
    },
    {
      name: 'Facebook',
      iconBg: 'bg-blue-600',
      iconText: 'FB',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      actionText: 'Facebook'
    },
    {
      name: 'LinkedIn',
      iconBg: 'bg-blue-700',
      iconText: 'IN',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
      actionText: 'LinkedIn'
    }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div 
        id="share-modal-container"
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-red-50 text-red-700">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-tamil font-bold text-lg text-stone-900">
                {isTamil ? 'கட்டுரையைப் பகிர்க' : 'Share this article'}
              </h3>
              <p className="text-xs text-stone-700">
                {isTamil ? 'சமூக வலைதளங்களில் நண்பர்களுடன் பகிருங்கள்' : 'Share with your community & networks'}
              </p>
            </div>
          </div>
          <button
            id="close-share-modal-btn"
            onClick={onClose}
            className="p-2 text-stone-700 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Share buttons grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-5">
          {shareLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-3 rounded-xl border border-stone-200 hover:border-stone-300 hover:bg-stone-50 transition group active:scale-95"
            >
              <span className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm mb-1.5 shadow-xs ${link.iconBg}`}>
                {link.iconText}
              </span>
              <span className="text-xs font-semibold text-stone-800 group-hover:text-red-700 flex items-center gap-0.5">
                {link.actionText}
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </span>
            </a>
          ))}
        </div>

        {/* Copy Link input */}
        <div className="pt-2 border-t border-stone-100">
          <label className="block text-xs font-semibold text-stone-700 mb-1.5">
            {isTamil ? 'வலைதள முகவரியை நகலெடுக்க' : 'Direct Link to Article'}
          </label>
          <div className="flex items-center gap-2 p-1.5 bg-stone-50 rounded-xl border border-stone-200">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="w-full text-xs font-mono text-stone-600 bg-transparent px-2.5 outline-none truncate"
            />
            <button
              id="copy-article-link-btn"
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition active:scale-95 shrink-0 ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-stone-900 hover:bg-stone-800 text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{isTamil ? 'நகலெடுக்கப்பட்டது!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{isTamil ? 'நகல் செய்' : 'Copy'}</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
