'use client';
import { useI18n, Lang } from '@/lib/i18n';

const flags: Record<Lang, string> = {
  fr: '🇫🇷',
  en: '🇬🇧',
};

const labels: Record<Lang, string> = {
  fr: 'FR',
  en: 'EN',
};

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18n();

  const langs: Lang[] = ['fr', 'en'];

  return (
    <div className="flex items-center gap-1 border border-vanilla-400/20 rounded-full px-1 py-1 bg-dark-800/60">
      {langs.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-label={l === 'fr' ? 'Passer en français' : 'Switch to English'}
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
            lang === l
              ? 'bg-vanilla-400 text-dark-900 shadow-sm'
              : 'text-cream-400 hover:text-cream-100'
          }`}
        >
          <span className="text-base leading-none">{flags[l]}</span>
          <span className="tracking-wide">{labels[l]}</span>
        </button>
      ))}
    </div>
  );
}
