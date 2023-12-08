let API_BASE_URL: string;

async function checkAvailability(url: string): Promise<boolean> {
  try {
    const response = await fetch(url);
    return response.ok;
  } catch (error) {
    return false;
  }
}

const localEndpoint = 'http://localhost:8080/api/v1/article';
const herokuEndpoint = 'https://myshoppinglist-5c77ab8495cc.herokuapp.com/api/v1/article';

const localAvailable = await checkAvailability(localEndpoint);

if (localAvailable) {
  API_BASE_URL = localEndpoint;
} else {
  API_BASE_URL = herokuEndpoint;
}

export { API_BASE_URL };
