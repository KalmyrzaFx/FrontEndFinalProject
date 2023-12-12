// api.jsx
const DOG_API_URL = 'https://random.dog/woof.json';
const CAT_API_URL = 'https://api.thecatapi.com/v1/images/search';

const EXCLUDED_EXTENSIONS = ['.gif', '.mp4', '.webm'];

export const fetchRandomDogImage = async () => {
  try {
    const response = await fetch(DOG_API_URL);

    if (!response.ok) {
      throw new Error(`Dog API request failed with status ${response.status}`);
    }

    const data = await response.json();

    // Filter out unwanted file extensions
    if (data.url && !EXCLUDED_EXTENSIONS.some(ext => data.url.endsWith(ext))) {
      return data.url;
    } else {
      console.warn('Excluded dog image with unwanted file extension');
      return fetchRandomDogImage(); // Retry fetching another dog image
    }
  } catch (error) {
    console.error('Error fetching dog image:', error.message);
    return null;
  }
};

export const fetchRandomCatImage = async () => {
  try {
    const response = await fetch(CAT_API_URL);

    if (!response.ok) {
      throw new Error(`Cat API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data[0]?.url || null;
  } catch (error) {
    console.error('Error fetching cat image:', error.message);
    return null;
  }
};
