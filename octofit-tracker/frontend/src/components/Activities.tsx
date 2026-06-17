import { useEffect, useState } from 'react';
import { fetchActivities } from '../utils/api';

interface Activity {
  _id: string;
  userId: { _id: string; name: string; email: string };
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  performedAt: string;
  notes?: string;
}

export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchActivities()
      .then(setActivities)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-4">Loading activities...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Activities</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2 text-left">User</th>
              <th className="border border-gray-300 p-2 text-left">Type</th>
              <th className="border border-gray-300 p-2 text-left">Duration (min)</th>
              <th className="border border-gray-300 p-2 text-left">Calories</th>
              <th className="border border-gray-300 p-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id}>
                <td className="border border-gray-300 p-2">{activity.userId.name}</td>
                <td className="border border-gray-300 p-2">{activity.type}</td>
                <td className="border border-gray-300 p-2">{activity.durationMinutes}</td>
                <td className="border border-gray-300 p-2">{activity.caloriesBurned}</td>
                <td className="border border-gray-300 p-2">
                  {new Date(activity.performedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {activities.length === 0 && <p className="mt-4 text-gray-600">No activities found.</p>}
    </div>
  );
}
