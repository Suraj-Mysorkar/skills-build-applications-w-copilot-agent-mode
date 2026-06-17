import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';

export default function App() {
  return (
    <Router>
      <div style={{ fontFamily: 'system-ui, sans-serif' }}>
        <header style={{ backgroundColor: '#f5f5f5', padding: '1rem', borderBottom: '1px solid #ccc' }}>
          <h1>OctoFit Tracker</h1>
          <p style={{ margin: '0.5rem 0 0 0', color: '#666' }}>
            Modern workout tracking with React 19 and Vite
          </p>
        </header>

        <nav style={{ backgroundColor: '#e8e8e8', padding: '1rem' }}>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', gap: '1rem' }}>
            <li>
              <Link to="/" style={{ textDecoration: 'none', color: '#0066cc' }}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/users" style={{ textDecoration: 'none', color: '#0066cc' }}>
                Users
              </Link>
            </li>
            <li>
              <Link to="/teams" style={{ textDecoration: 'none', color: '#0066cc' }}>
                Teams
              </Link>
            </li>
            <li>
              <Link to="/activities" style={{ textDecoration: 'none', color: '#0066cc' }}>
                Activities
              </Link>
            </li>
            <li>
              <Link to="/leaderboard" style={{ textDecoration: 'none', color: '#0066cc' }}>
                Leaderboard
              </Link>
            </li>
            <li>
              <Link to="/workouts" style={{ textDecoration: 'none', color: '#0066cc' }}>
                Workouts
              </Link>
            </li>
          </ul>
        </nav>

        <main style={{ padding: '2rem' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Home() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000 (or set VITE_CODESPACE_NAME in .env.local)';

  return (
    <div>
      <h2>Welcome to OctoFit Tracker</h2>
      <p>Select a section from the navigation menu to view data.</p>
      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
        <h3>Configuration</h3>
        <p>
          <strong>Codespace Name:</strong> {codespaceName || '(not set)'}
        </p>
        <p>
          <strong>API Base URL:</strong> <code>{apiUrl}</code>
        </p>
        <details style={{ marginTop: '1rem' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Setup Instructions</summary>
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #ccc' }}>
            <p>
              To connect to your Codespaces backend, create a <code>.env.local</code> file in the frontend directory:
            </p>
            <pre
              style={{
                backgroundColor: '#f0f0f0',
                padding: '1rem',
                borderRadius: '4px',
                overflow: 'auto'
              }}
            >
              VITE_CODESPACE_NAME=your-codespace-name
            </pre>
            <p>Then restart the development server:</p>
            <pre
              style={{
                backgroundColor: '#f0f0f0',
                padding: '1rem',
                borderRadius: '4px',
                overflow: 'auto'
              }}
            >
              npm run dev
            </pre>
          </div>
        </details>
      </div>
    </div>
  );
}
