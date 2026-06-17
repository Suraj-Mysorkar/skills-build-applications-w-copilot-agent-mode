/**
 * API utility for OctoFit Tracker
 * 
 * Uses VITE_CODESPACE_NAME environment variable to build API URL.
 * Must be defined in .env.local for proper functionality.
 * 
 * Example .env.local:
 * VITE_CODESPACE_NAME=your-codespace-name
 */

function getApiBaseUrl(): string {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  
  if (!codespaceName) {
    console.debug(
      'VITE_CODESPACE_NAME is not set. Using localhost fallback. ' +
      'Define VITE_CODESPACE_NAME in .env.local for Codespaces support.'
    );
    return 'http://localhost:8000';
  }
  
  return `https://${codespaceName}-8000.app.github.dev`;
}

async function fetchFromApi(endpoint: string) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint}`;
  
  console.debug(`Fetching: ${url}`);
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    const json = await response.json();
    console.debug(`Success: ${endpoint}`, json);
    return json.data || [];
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    throw error;
  }
}

export async function fetchUsers() {
  return fetchFromApi('/api/users');
}

export async function fetchTeams() {
  return fetchFromApi('/api/teams');
}

export async function fetchActivities() {
  return fetchFromApi('/api/activities');
}

export async function fetchLeaderboard() {
  return fetchFromApi('/api/leaderboard');
}

export async function fetchWorkouts() {
  return fetchFromApi('/api/workouts');
}

export function getApiUrl(): string {
  return getApiBaseUrl();
}
