
import { QuestionsResponse, Question } from '../types/questionnaire';
import { mockQuestions } from '../mocks/mockQuestions';

const API_URL = 'https://www.doctoranytime.gr/searchq/GetQuestions?version=v2';
const BASE_RESULT_URL = 'https://www.doctoranytime.gr/s/Psychologos';

export async function fetchQuestions(): Promise<Question[]> {
  try {
    // For development: use mock data to avoid CORS issues
    console.log('Using mock questions data');
    return mockQuestions;
    
    /* Commented out the real API call due to CORS issues
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data: QuestionsResponse = await response.json();
    return data.Data;
    */
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
}

export function constructFinalUrl(userSelections: Map<number, Array<number>>): string {
  // Initialize params object to track and deduplicate params
  const params: Record<string, string[]> = {};
  
  // Iterate through all selections and build params
  userSelections.forEach((optionIds, questionId) => {
    // Get the question from the cache/state
    const question = window.cachedQuestions.find(q => q.Id === questionId);
    
    if (!question) return;
    
    // Process each selected option
    optionIds.forEach(optionId => {
      const option = question.Options.find(o => o.Id === optionId);
      
      if (!option || !option.FilterQueryStringKey || !option.FilterQueryStringValue) return;
      
      // Initialize the array for this key if it doesn't exist
      if (!params[option.FilterQueryStringKey]) {
        params[option.FilterQueryStringKey] = [];
      }
      
      // Add the value if it's not already in the array
      if (!params[option.FilterQueryStringKey].includes(option.FilterQueryStringValue)) {
        params[option.FilterQueryStringKey].push(option.FilterQueryStringValue);
      }
    });
  });
  
  // Construct the query string
  const queryString = Object.entries(params)
    .map(([key, values]) => {
      // Join multiple values with "_and_"
      const value = values.join('_and_');
      return `${key}=${value}`;
    })
    .join('&');
  
  // Return the final URL
  return queryString ? `${BASE_RESULT_URL}?${queryString}` : BASE_RESULT_URL;
}

// Add a global cache for questions to avoid re-fetching
declare global {
  interface Window {
    cachedQuestions: Question[];
  }
}

// Initialize the cache
window.cachedQuestions = [];
