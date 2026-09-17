import React from 'react';
import { ListFilter, ChevronRight, Hash, ArrowUp } from 'lucide-react';
import { TocItem } from '../types';

interface TableOfContentsProps {
  items: TocItem[];
  title: string;
  activeId: string;
  onItemClick?: () => void;
  isMobileDrawer?: boolean;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  items,
  title,
  activeId,
  onItemClick,
  isMobileDrawer = false
}) => {
  const handleScrollTo = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90; // account for sticky header + reading progress bar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    if (onItemClick) {
      onItemClick();
    }
  };

  return (
    <nav
      id="table-of-contents-nav"
      aria-label="Table of contents"
      className={`${
        isMobileDrawer
          ? 'p-4'
          : 'p-5 bg-stone-50/80 rounded-2xl border border-stone-200/90 shadow-xs backdrop-blur-xs'
      }`}
    >
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-200">
        <div className="flex items-center gap-2 text-stone-900 font-serif-tamil font-bold text-base">
          <ListFilter className="w-4 h-4 text-red-700" />
          <span>{title}</span>
        </div>
        <span className="text-[11px] font-mono font-medium px-2 py-0.5 bg-stone-200/60 rounded text-stone-700">
          {items.length} பிரிவுகள்
        </span>
      </div>

      <ul className="space-y-1 text-sm">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                id={`toc-link-${item.id}`}
                href={`#${item.id}`}
                onClick={(e) => handleScrollTo(item.id, e)}
                className={`group flex items-center justify-between py-2 px-2.5 rounded-lg transition-all duration-150 ${
                  isActive
                    ? 'bg-red-700 text-white font-semibold shadow-xs'
                    : 'text-stone-700 hover:text-stone-950 hover:bg-stone-200/60'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <Hash
                    className={`w-3.5 h-3.5 shrink-0 ${
                      isActive ? 'text-white' : 'text-stone-700 group-hover:text-red-700'
                    }`}
                  />
                  <span className="truncate">{item.title}</span>
                </div>
                <ChevronRight
                  className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                    isActive
                      ? 'text-white translate-x-0.5'
                      : 'text-stone-700 group-hover:text-stone-700 group-hover:translate-x-0.5'
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ul>

      {/* Quick Jump Back to Top */}
      <div className="mt-4 pt-3 border-t border-stone-200/80 flex justify-end">
        <button
          id="toc-jump-to-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-xs font-medium text-stone-700 hover:text-red-700 flex items-center gap-1 transition"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>மேலே செல்ல (Top)</span>
        </button>
      </div>
    </nav>
  );
};
