
import React, { useState, useRef, useEffect } from 'react';
import { languageOptions, Language } from '../i18n/translations';
import { GlobeIcon, ChevronDownIcon } from './icons/Icons';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLanguage, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLanguageLabel = languageOptions.find(opt => opt.value === currentLanguage)?.label;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (lang: Language) => {
    onLanguageChange(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
      >
        <GlobeIcon className="h-5 w-5" />
        <span>{selectedLanguageLabel}</span>
        <ChevronDownIcon className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-md shadow-lg z-10 animate-fade-in-down">
          <ul className="py-1">
            {languageOptions.map((option) => (
              <li key={option.value}>
                <button
                  onClick={() => handleSelect(option.value)}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    currentLanguage === option.value
                      ? 'bg-amber-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  } transition-colors duration-150`}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <style>{`
        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LanguageSelector;