
import type { LearningPath } from '../types';
import type { Language } from '../i18n/translations';

// This function now calls our Netlify serverless function,
// which securely handles the API key and calls the Gemini API.
export async function generateLearningPath(topic: string, language: Language): Promise<LearningPath> {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic, language }),
    });

    if (!response.ok) {
      let errorMessage = "An error occurred while generating the learning path. Please try again.";
      try {
        const errorData = await response.json();
        if(errorData && errorData.error) {
          errorMessage = errorData.error;
        }
      } catch (e) {
        // The response might not be JSON, stick with the generic error.
      }
      throw new Error(errorMessage);
    }

    const parsedPath: LearningPath = await response.json();
    return parsedPath;

  } catch (error) {
    console.error("Error calling backend service:", error);
    // Re-throw to be handled by the UI. If it's a network error, error.message will be useful.
    if (error instanceof Error) {
        throw new Error(error.message);
    }
    throw new Error("An unknown error occurred.");
  }
}
