export type Language = 'ta' | 'en';

export type FontSize = 'normal' | 'large' | 'xlarge';

export interface TocItem {
  id: string;
  title: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  tag: string;
}

export interface BioDetail {
  label: string;
  value: string;
}

export interface ArticleData {
  seo: {
    title: string;
    description: string;
    keywords: string[];
    readTime: string;
    publishDate: string;
    updatedDate: string;
    author: string;
    category: string;
  };
  header: {
    badge: string;
    title: string;
    subtitle: string;
  };
  quickBio: {
    title: string;
    name: string;
    alias: string;
    role: string;
    birthPlace: string;
    knownFor: string;
    organization: string;
    details: BioDetail[];
  };
  tocTitle: string;
  tocItems: TocItem[];
  sections: {
    intro: {
      id: string;
      title: string;
      p1: string;
      p2: string;
      p3: string;
      callout: string;
    };
    career: {
      id: string;
      title: string;
      subtitle: string;
      p1: string;
      p2: string;
      p3: string;
      bulletPoints: string[];
    };
    savukkuMedia: {
      id: string;
      title: string;
      subtitle: string;
      p1: string;
      p2: string;
      features: { title: string; desc: string }[];
    };
    politicalImpact: {
      id: string;
      title: string;
      subtitle: string;
      p1: string;
      p2: string;
      quote: string;
      quoteAuthor: string;
      p3: string;
    };
    legalBattles: {
      id: string;
      title: string;
      subtitle: string;
      p1: string;
      p2: string;
      highlights: { year: string; event: string }[];
    };
    timeline: {
      id: string;
      title: string;
      subtitle: string;
      items: TimelineItem[];
    };
    publicViews: {
      id: string;
      title: string;
      supportersTitle: string;
      supportersPoints: string[];
      criticsTitle: string;
      criticsPoints: string[];
    };
    faq: {
      id: string;
      title: string;
      subtitle: string;
      items: FaqItem[];
    };
    conclusion: {
      id: string;
      title: string;
      p1: string;
      p2: string;
      finalQuote: string;
    };
  };
  keywordsCloudTitle: string;
  keywordsList: string[];
  sharePrompt: string;
  copiedText: string;
}
