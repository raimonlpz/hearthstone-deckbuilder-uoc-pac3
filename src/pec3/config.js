/*
Script amb configuració sensible sobre els tokens/keys de la API utilitzada, els headers de la petició
http i el mètode fetch amb la resposta resultant, que permet abstreure part de la lògica a l'hora d'utilitzar 
els endpoints a 'api.js'. 
*/
const API = 'omgvamp-hearthstone-v1.p.rapidapi.com';
const API_KEY = 'c927399b70msh4da279bb07305eep1d2804jsnafa5a01f46df';
let requestsApiCounter = 0;

export async function getEndpoint(url) {
    const headers = new Headers();
    headers.append('x-rapidapi-host', API);
    headers.append('x-rapidapi-key', API_KEY);

    requestsApiCounter++;
    console.log(`API Requests Counter: ${requestsApiCounter}`);

    try {
        console.log('Fetching request...')
        const response = await fetch(url, { method: 'GET', headers });
        const apiData = await response.json();
        return apiData;
    } catch (err) {
        console.log('Fetch failed...', err);
    }
}

export const API_ENDPOINT = {
    BY_FILTER: `https://${API}/cards/`,
    BY_ID: `https://${API}/cards/`,
    INFO: `https://${API}/info`,
}
