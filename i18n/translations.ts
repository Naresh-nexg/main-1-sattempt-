
export type Language = 'en' | 'es' | 'fr';

export const languageOptions: { value: Language; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
];

interface Translations {
  [key: string]: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'FlexiLearn',
    heroTagline: 'AI-Powered Education',
    heroTitle: 'Your Personalized Learning Journey Starts Here',
    heroSubtitle: 'Enter any topic you want to master, and our AI will craft a unique, step-by-step learning path just for you.',
    inputPlaceholder: 'e.g., "Quantum Computing" or "React for Beginners"',
    generateButton: 'Generate Path',
    generatingButton: 'Generating...',
    pathTitle: 'Your Custom Learning Path',
    loadingMessage: 'Crafting your personalized learning path... This may take a moment.',
    module: 'Module',
    subtopics: 'Key Sub-topics',
    resources: 'Suggested Resources',
    errorTopic: 'Please enter a topic to generate a learning path.',
    errorAI: 'An error occurred while generating the learning path. Please try again.',
    footerText: 'FlexiLearn. All rights reserved.',
  },
  es: {
    appName: 'FlexiLearn',
    heroTagline: 'Educación Impulsada por IA',
    heroTitle: 'Tu Viaje de Aprendizaje Personalizado Comienza Aquí',
    heroSubtitle: 'Ingresa cualquier tema que quieras dominar, y nuestra IA creará una ruta de aprendizaje única y paso a paso solo para ti.',
    inputPlaceholder: 'p. ej., "Computación Cuántica" o "React para Principiantes"',
    generateButton: 'Generar Ruta',
    generatingButton: 'Generando...',
    pathTitle: 'Tu Ruta de Aprendizaje Personalizada',
    loadingMessage: 'Creando tu ruta de aprendizaje personalizada... Esto puede tomar un momento.',
    module: 'Módulo',
    subtopics: 'Sub-temas Clave',
    resources: 'Recursos Sugeridos',
    errorTopic: 'Por favor, ingrese un tema para generar una ruta de aprendizaje.',
    errorAI: 'Ocurrió un error al generar la ruta de aprendizaje. Por favor, inténtelo de nuevo.',
    footerText: 'FlexiLearn. Todos los derechos reservados.',
  },
  fr: {
    appName: 'FlexiLearn',
    heroTagline: 'Éducation Propulsée par l’IA',
    heroTitle: 'Votre Parcours d\'Apprentissage Personnalisé Commence Ici',
    heroSubtitle: 'Entrez n\'importe quel sujet que vous souhaitez maîtriser, et notre IA élaborera un parcours d\'apprentissage unique, étape par étape, juste pour vous.',
    inputPlaceholder: 'par ex., "Informatique Quantique" ou "React pour Débutants"',
    generateButton: 'Générer le Parcours',
    generatingButton: 'Génération...',
    pathTitle: 'Votre Parcours d\'Apprentissage Personnalisé',
    loadingMessage: 'Création de votre parcours d\'apprentissage personnalisé... Cela peut prendre un moment.',
    module: 'Module',
    subtopics: 'Sous-thèmes Clés',
    resources: 'Ressources Suggérées',
    errorTopic: 'Veuillez entrer un sujet pour générer un parcours d\'apprentissage.',
    errorAI: 'Une erreur est survenue lors de la génération du parcours d\'apprentissage. Veuillez réessayer.',
    footerText: 'FlexiLearn. Tous droits réservés.',
  },
};
