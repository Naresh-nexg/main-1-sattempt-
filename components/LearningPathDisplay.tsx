
import React, { useState } from 'react';
import type { LearningPath, LearningModule, Resource } from '../types';
import { ChevronDownIcon } from './icons/Icons';

interface LearningPathDisplayProps {
  learningPath: LearningPath | null;
  isLoading: boolean;
  translations: { [key:string]: string };
}

const ResourceLink: React.FC<{ resource: Resource }> = ({ resource }) => {
  const getIcon = (type: Resource['type']) => {
    switch (type) {
      case 'video': return '🎬';
      case 'article': return '📄';
      case 'interactive': return '🎮';
      case 'book': return '📚';
      case 'documentation': return '💻';
      default: return '🔗';
    }
  };

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 bg-gray-800/50 hover:bg-gray-800 p-3 rounded-lg transition-all duration-200 group"
    >
      <span className="text-xl">{getIcon(resource.type)}</span>
      <span className="text-amber-300 group-hover:text-amber-200 group-hover:underline truncate">{resource.name}</span>
    </a>
  );
};


const ModuleCard: React.FC<{ module: LearningModule; translations: { [key:string]: string } }> = ({ module, translations }) => {
  const [isOpen, setIsOpen] = useState(module.moduleNumber === 1);

  return (
    <div className="bg-gray-900/50 border border-gray-700 rounded-xl overflow-hidden transition-all duration-300 mb-4 shadow-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 md:p-6 text-left hover:bg-gray-900 transition-colors duration-200"
      >
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-amber-600/30 text-amber-300 rounded-full flex items-center justify-center font-bold text-lg">
            {module.moduleNumber}
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white">{module.title}</h3>
            <p className="text-gray-400 text-sm hidden md:block">{module.description}</p>
          </div>
        </div>
        <ChevronDownIcon className={`h-6 w-6 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`transition-all duration-500 ease-in-out grid ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="p-4 md:p-6 border-t border-gray-700">
             <p className="text-gray-400 text-sm md:hidden mb-4">{module.description}</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-white mb-3">{translations.subtopics}</h4>
                <ul className="space-y-2">
                  {module.subtopics.map((subtopic, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300">
                      <span className="text-amber-400 mt-1">&#10003;</span>
                      <span>{subtopic}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-3">{translations.resources}</h4>
                <div className="space-y-3">
                  {module.resources.map((resource, i) => (
                    <ResourceLink key={i} resource={resource} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const LoadingSkeleton: React.FC = () => (
  <div className="space-y-4">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="bg-gray-900/50 border border-gray-700 rounded-xl p-6 flex items-center gap-4 animate-pulse">
        <div className="w-12 h-12 bg-gray-800 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-800 rounded w-3/4"></div>
          <div className="h-3 bg-gray-800 rounded w-1/2"></div>
        </div>
      </div>
    ))}
  </div>
);

const LearningPathDisplay: React.FC<LearningPathDisplayProps> = ({ learningPath, isLoading, translations }) => {
  if (isLoading) {
    return (
      <div className="mt-12 max-w-4xl mx-auto">
        <p className="text-center text-gray-400 mb-6">{translations.loadingMessage}</p>
        <LoadingSkeleton />
      </div>
    );
  }

  if (!learningPath) {
    return null;
  }

  return (
    <div className="mt-12 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">{translations.pathTitle}</h2>
      <div>
        {learningPath.map((module) => (
          <ModuleCard key={module.moduleNumber} module={module} translations={translations} />
        ))}
      </div>
    </div>
  );
};

export default LearningPathDisplay;