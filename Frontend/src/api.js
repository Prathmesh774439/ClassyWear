const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export async function apiRequest(path, options = {}, accessToken = '') {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (accessToken && !options.skipAuth) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    credentials: 'include'
  });

  const responseText = await response.text();
  let data = responseText;
  try {
    data = responseText ? JSON.parse(responseText) : null;
  } catch {
    // Keep non-JSON responses as text.
  }

  if (!response.ok) {
    const message = typeof data?.message === 'string' && data.message.trim()
      ? data.message
      : typeof data === 'string' && data.trim()
        ? data
        : 'Request failed';
    const error = new Error(message);
    if (Array.isArray(data?.errors)) {
      error.errors = data.errors;
    }
    throw error;
  }

  return data;
}

export { API_BASE_URL };
