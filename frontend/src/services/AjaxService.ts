const BASE_API_URL = 'http://' + window.location.hostname + ':8000';

type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Params = Record<string, string | number | null> | undefined;
type Response = any;


function makeUrl(url: string, params?: Params): URL {
  // Make sure the url ends with a slash, so that is works well with django
  if (!url.endsWith('/')) url += '/';
  const _url = new URL(url, BASE_API_URL);
  if (params) {
    // Remove null values from params
    const p: any = Object.fromEntries(Object.entries(params).filter(([_, v]) => v !== null));
    _url.search = new URLSearchParams(p).toString();
  }
  return _url;
}

function request(method: Methods, url: string, params?: Params, body?: Record<string, any>): Promise<Response> {
  let data = undefined;
  if (method === 'POST' && !!body) {
    data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
  }

  return fetch(makeUrl(url, params), data).then((r) => r.json());
}

// ------------------------------ 

export function get(url: string, params?: Params): Promise<Response> {
  return request('GET', url, params);
}

export function post(url: string, params?: Params, body?: Record<string, any>): Promise<Response> {
  return request('POST', url, params, body);
}

export function put(url: string, params?: Params, body?: Record<string, any>): Promise<Response> {
  return request('PUT', url, params, body);
}

export function remove(url: string, params?: Params): Promise<Response> {
    return request('DELETE', url, params);
}
