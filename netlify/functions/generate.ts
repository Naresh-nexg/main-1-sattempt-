
import { GoogleGenAI, Type } from "@google/genai";

// This file is a self-contained Netlify Function.
// It proxies requests to the Gemini API using a server-side API key.

type Language = 'en' | 'es' | 'fr' | 'ta' | 'te' | 'kn' | 'ml' | 'ur';

const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        moduleNumber: {
          type: Type.INTEGER,
          description: 'The sequential number of the module, starting from 1.'
        },
        title: {
          type: Type.STRING,
          description: 'A concise and clear title for the learning module.'
        },
        description: {
          type: Type.STRING,
          description: 'A brief, one or two-sentence overview of what the module covers.'
        },
        subtopics: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING
          },
          description: 'A list of key concepts or sub-topics covered within this module.'
        },
        resources: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: {
                type: Type.STRING,
                description: 'The title of the resource.'
              },
              url: {
                type: Type.STRING,
                description: 'The full URL to access the resource.'
              },
              type: {
                type: Type.STRING,
                description: "The type of resource, e.g., 'video', 'article', 'interactive', 'book', 'documentation'."
              }
            },
            required: ['name', 'url', 'type']
          },
          description: 'A curated list of high-quality online resources for this module.'
        }
      },
      required: ['moduleNumber', 'title', 'description', 'subtopics', 'resources']
    }
  };

const languageMap: Record<Language, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  ta: 'Tamil',
  te: 'Telugu',
  kn: 'Kannada',
  ml: 'Malayalam',
  ur: 'Urdu',
};


export const handler = async (event: { httpMethod: string; body: string | null; }) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const { topic, language } = JSON.parse(event.body || '{}');

    if (!topic || !language || !languageMap[language as Language]) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing or invalid topic or language' }) };
    }
    
    const API_KEY = process.env.API_KEY;
    if (!API_KEY) {
      console.error("API_KEY environment variable not set in Netlify function environment");
      return { statusCode: 500, body: JSON.stringify({ error: 'Server configuration error.' }) };
    }

    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const fullLanguageName = languageMap[language as Language];

    const prompt = `You are an expert curriculum designer for a platform called FlexiLearn. Your task is to create a personalized, comprehensive, and structured learning path for a beginner on the topic of "${topic}". 
The learning path should be broken down into logical modules, typically between 5 and 8 modules. 
For each module, provide a concise title, a brief description, a list of key sub-topics to cover, and a list of 2-4 suggested online resources (like articles, videos, or interactive tutorials) with their names, URLs, and types.
The entire response must be in ${fullLanguageName}.
Ensure the moduleNumber for each module is sequential, starting from 1.
The resource types should be one of: 'video', 'article', 'interactive', 'book', 'documentation'.
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: responseSchema,
            temperature: 0.5,
        }
    });
    
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: response.text.trim(),
    };

  } catch (error) {
    console.error("Error in Netlify function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An internal server error occurred.' }),
    };
  }
};
