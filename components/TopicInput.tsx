
import React from 'react';
import { SparklesIcon } from './icons/Icons';

interface TopicInputProps {
  topic: string;
  setTopic: (topic: string) => void;
  onGenerate: (topic: string) => void;
  isLoading: boolean;
  translations: { [key: string]: string };
}

const TopicInput: React.FC<TopicInputProps> = ({ topic, setTopic, onGenerate, isLoading, translations }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(topic);
  };

  return (
    <div className="mt-8 md:mt-12 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder={translations.inputPlaceholder}
          className="w-full pl-4 pr-40 py-4 bg-gray-900 border-2 border-gray-700 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 shadow-lg"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center gap-2 px-6 py-3 bg-amber-600 text-white font-bold rounded-full hover:bg-amber-500 disabled:bg-amber-800 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-amber-500 shadow-amber-500/30 shadow-lg"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              {translations.generatingButton}
            </>
          ) : (
            <>
              <SparklesIcon className="h-5 w-5" />
              {translations.generateButton}
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default TopicInput;