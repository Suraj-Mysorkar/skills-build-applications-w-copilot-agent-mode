import { useEffect, useState } from 'react';
import { fetchTeams } from '../utils/api';

interface Team {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  memberIds?: Array<{ _id: string; name: string; email: string; role: string }>;
}

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTeams()
      .then(setTeams)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-4">Loading teams...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Teams</h2>
      <div className="space-y-4">
        {teams.map((team) => (
          <div key={team._id} className="border border-gray-300 p-4 rounded">
            <h3 className="text-xl font-semibold">{team.name}</h3>
            <p className="text-gray-600">{team.description}</p>
            <p className="text-sm text-gray-500">
              Created: {new Date(team.createdAt).toLocaleDateString()}
            </p>
            {team.memberIds && team.memberIds.length > 0 && (
              <div className="mt-2">
                <p className="font-semibold">Members:</p>
                <ul className="list-disc list-inside">
                  {team.memberIds.map((member) => (
                    <li key={member._id}>{member.name} ({member.role})</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      {teams.length === 0 && <p className="mt-4 text-gray-600">No teams found.</p>}
    </div>
  );
}
