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
    console.warn(
      'VITE_CODESPACE_NAME is not set. Using localhost fallback. ' +
      'Define VITE_CODESPACE_NAME in .env.local for Codespaces support.'
    );
    return 'http://localhost:8000';
  }
  
  return `https://${codespaceName}-8000.app.github.dev`;
}

export async function fetchUsers() {
  const baseUrl = getApiBaseUrl();
  const response = await fetch(`${baseUrl}/api/users`);
  if (!response.ok) throw new Error('Failed to fetch users');
  const json = await response.json();
  return json.data || [];
}

export async function fetchTeams() {
  const baseUrl = getApiBaseUrl();
  const response = await fetch(`${baseUrl}/api/teams`);
  if (!response.ok) throw new Error('Failed to fetch teams');
  const json = await response.json();
  return json.data || [];
}

export async function fetchActivities() {
  const baseUrl = getApiBaseUrl();
  const response = await fetch(`${baseUrl}/api/activities`);
  if (!response.ok) throw new Error('Failed to fetch activities');
  const json = await response.json();
  return json.data || [];
}

export async function fetchLeaderboard() {
  const baseUrl = getApiBaseUrl();
  const response = await fetch(`${baseUrl}/api/leaderboard`);
  if (!response.ok) throw new Error('Failed to fetch leaderboard');
  const json = await response.json();
  return json.data || [];
}

export async function fetchWorkouts() {
  const baseUrl = getApiBaseUrl();
  const response = await fetch(`${baseUrl}/api/workouts`);
  if (!response.ok) throw new Error('Failed to fetch workouts');
  const json = await response.json();
  return json.data || [];
}

export function getApiUrl(): string {
  return getApiBaseUrl();
}
