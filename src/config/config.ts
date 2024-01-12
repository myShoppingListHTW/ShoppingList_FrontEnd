let API_BASE_URL: string;

async function checkAvailability(url: string): Promise<boolean> {
  try {
    const response = await fetch(url);
    return response.ok;
  } catch (error) {
    return false;
  }
}

const localEndpoint = 'http://localhost:8080/api/v1/article/';
const herokuEndpoint = 'https://myshoppinglist-5c77ab8495cc.herokuapp.com/api/v1/article/';

try {
  const localAvailable = await checkAvailability(localEndpoint);
  console.log('Local API available:', localAvailable);

  if (localAvailable) {
    API_BASE_URL = localEndpoint;
  } else {
    API_BASE_URL = herokuEndpoint;
  }
} catch (error) {
  console.error('Error checking local API availability:', error);
  API_BASE_URL = herokuEndpoint; // Fallback to Heroku in case of an error
}

console.log('API_BASE_URL:', API_BASE_URL);
export { API_BASE_URL };
