import nlp from 'compromise';

// Helper function to detect passive voice using regex patterns
export function detectPassiveVoice(text: string): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  const passivePattern = /\b(am|is|are|was|were|be|been|being)\s+(\w+ed|[^aeiou]*en)\b/i;
  
  return sentences.filter(sentence => passivePattern.test(sentence.trim()));
}

// Helper function to calculate readability (Flesch-Kincaid Grade Level)
export function calculateReadability(text: string): string {
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  const syllables = words.reduce((count, word) => {
    return count + countSyllables(word);
  }, 0);

  if (words.length === 0 || sentences.length === 0) {
    return 'Add more content';
  }

  const score = 0.39 * (words.length / sentences.length) + 
                11.8 * (syllables / words.length) - 15.59;

  if (score <= 6) return 'Very Easy';
  if (score <= 8) return 'Easy';
  if (score <= 10) return 'Fairly Easy';
  if (score <= 12) return 'Standard';
  if (score <= 14) return 'Fairly Difficult';
  if (score <= 16) return 'Difficult';
  return 'Very Difficult';
}

// Helper function to count syllables in a word
function countSyllables(word: string): number {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;
  
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  
  const syllables = word.match(/[aeiouy]{1,2}/g);
  return syllables ? syllables.length : 1;
}

// Helper function to identify complex words
export function findComplexWords(text: string): string[] {
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  return words.filter(word => {
    const syllableCount = countSyllables(word);
    return syllableCount >= 3 && word.length > 6;
  });
}