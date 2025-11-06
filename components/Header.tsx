
import React from 'react';
import type { Language } from '../i18n/translations';
import LanguageSelector from './LanguageSelector';
import { BookOpenIcon } from './icons/Icons';

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  translations: { [key: string]: string };
}

const Header: React.FC<HeaderProps> = ({ currentLanguage, onLanguageChange, translations }) => {
  return (
    <header className="bg-black/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BookOpenIcon className="h-8 w-8 text-amber-500" />
          <span className="text-2xl font-bold text-white tracking-wide">{translations.appName}</span>
        </div>
        <LanguageSelector
          currentLanguage={currentLanguage}
          onLanguageChange={onLanguageChange}
        />
      </div>
    </header>
  );
};

export default Header;