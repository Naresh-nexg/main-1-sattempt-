
import React, { useState, useCallback } from 'react';
import type { LearningPath } from './types';
import { translations, Language } from './i18n/translations';
import { generateLearningPath } from './services/geminiService';
import Header from './components/Header';
import TopicInput from './components/TopicInput';
import LearningPathDisplay from './components/LearningPathDisplay';
import { SparklesIcon, BookOpenIcon } from './components/icons/Icons';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [topic, setTopic] = useState<string>('');
  const [learningPath, setLearningPath] = useState<LearningPath | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const t = translations[language];

  const handleGeneratePath = useCallback(async (currentTopic: string) => {
    if (!currentTopic) {
      setError(t.errorTopic);
      return;
    }

    setIsLoading(true);
    setError(null);
    setLearningPath(null);

    try {
      const path = await generateLearningPath(currentTopic, language);
      setLearningPath(path);
    } catch (err) {
      console.error(err);
      setError(t.errorAI);
    } finally {
      setIsLoading(false);
    }
  }, [language, t.errorTopic, t.errorAI]);

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans">
      <Header
        currentLanguage={language}
        onLanguageChange={setLanguage}
        translations={t}
      />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block bg-amber-500/20 text-amber-300 rounded-full px-4 py-1 mb-4 text-sm font-medium">
            {t.heroTagline}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text">
            {t.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            {t.heroSubtitle}
          </p>
        </div>

        <TopicInput
          topic={topic}
          setTopic={setTopic}
          onGenerate={handleGeneratePath}
          isLoading={isLoading}
          translations={t}
        />

        {error && (
          <div className="mt-8 text-center bg-red-500/20 text-red-300 p-4 rounded-lg max-w-2xl mx-auto">
            <p>{error}</p>
          </div>
        )}

        <LearningPathDisplay
          learningPath={learningPath}
          isLoading={isLoading}
          translations={t}
        />
      </main>

      <footer className="text-center py-6 border-t border-gray-800 mt-12">
        <p className="text-gray-500">&copy; {new Date().getFullYear()} {t.footerText}</p>
      </footer>
    </div>
  );
}