// use 'localhost' environment URL for testing locally

// export const ENVIRONMENT_URL = 'localhost';
export const ENVIRONMENT_URL = window.location.href.includes('development') ? '192.168.33.27' : '192.168.33.28';
export const BASE_API_URL = `http://${ENVIRONMENT_URL}:1234/api/heroes/`;
