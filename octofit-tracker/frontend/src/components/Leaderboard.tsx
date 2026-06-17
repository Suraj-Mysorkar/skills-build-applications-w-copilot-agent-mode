import { useEffect, useState } from 'react';
import { fetchLeaderboard } from '../utils/api';

interface LeaderboardEntry {
  _id: string;
  teamId: { _id: string; name: string };
  score: number;
  rank: number;
  updatedAt: string;
}

export default function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLeaderboard()
      .then(setEntries)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-4">Loading leaderboard...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2 text-left">Rank</th>
              <th className="border border-gray-300 p-2 text-left">Team</th>
              <th className="border border-gray-300 p-2 text-left">Score</th>
              <th className="border border-gray-300 p-2 text-left">Updated</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry._id}>
                <td className="border border-gray-300 p-2 font-semibold">#{entry.rank}</td>
                <td className="border border-gray-300 p-2">{entry.teamId.name}</td>
                <td className="border border-gray-300 p-2">{entry.score}</td>
                <td className="border border-gray-300 p-2">
                  {new Date(entry.updatedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {entries.length === 0 && <p className="mt-4 text-gray-600">No leaderboard entries found.</p>}
    </div>
  );
}
