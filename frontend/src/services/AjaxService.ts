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

async function request(method: Methods, url: string, params?: Params, body?: Record<string, any>): Promise<Response> {
  let data: any = { method };

  const token = localStorage.getItem('token');
  if (token) data = { ...data, headers: { Authorization: 'Token ' + token } };

  if ((method === 'POST' || method === 'PUT') && !!body) {
    data = {
      ...data,
      headers: {
        ...data.headers,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(body),
    };
  }

  const res = await fetch(makeUrl(url, params), data);

  if (!res.ok) throw { status: res.status, statusText: res.statusText, errors: await res.json() };
  else if (res.status === 204) return {};
  else return res.json();
}

// ------------------------------ 

export function get(url: string, params?: Params): Promise<Response> {
  return request('GET', url, params);
}

export function post(url: string, body: Record<string, any>, params?: Params): Promise<Response> {
  return request('POST', url, params, body);
}

export function put(url: string, body: Record<string, any>, params?: Params): Promise<Response> {
  return request('PUT', url, params, body);
}

export function remove(url: string, params?: Params): Promise<Response> {
  return request('DELETE', url, params);
}
