const configuredApiUrl =
  import.meta.env.VITE_API_URL || "https://cartburster.onrender.com";
const normalizedApiUrl = configuredApiUrl.trim().replace(/\/+$/, "");
const API_BASE_URL = normalizedApiUrl.endsWith("/api")
  ? normalizedApiUrl
  : `${normalizedApiUrl}/api`;

export async function apiRequest(path, options = {}, accessToken = "") {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (accessToken && !options.skipAuth) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });

  const responseText = await response.text();

  let data = responseText;

  try {
    data = responseText ? JSON.parse(responseText) : null;
  } catch {}

  if (!response.ok) {
    throw new Error(data?.message || "Request failed");
  }

  return data;
}

export { API_BASE_URL };