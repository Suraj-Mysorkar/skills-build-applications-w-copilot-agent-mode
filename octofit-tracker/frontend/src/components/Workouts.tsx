import { useEffect, useState } from 'react';
import { fetchWorkouts } from '../utils/api';

interface Workout {
  _id: string;
  title: string;
  description: string;
  difficulty: string;
  estimatedDuration: number;
  createdAt: string;
  coachId?: { _id: string; name: string; email: string };
}

export default function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWorkouts()
      .then(setWorkouts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-4">Loading workouts...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Workouts</h2>
      <div className="space-y-4">
        {workouts.map((workout) => (
          <div key={workout._id} className="border border-gray-300 p-4 rounded">
            <h3 className="text-xl font-semibold">{workout.title}</h3>
            <p className="text-gray-600">{workout.description}</p>
            <div className="mt-2 text-sm">
              <p>
                <span className="font-semibold">Difficulty:</span>{' '}
                <span className="capitalize">{workout.difficulty}</span>
              </p>
              <p>
                <span className="font-semibold">Duration:</span> {workout.estimatedDuration} minutes
              </p>
              {workout.coachId && (
                <p>
                  <span className="font-semibold">Coach:</span> {workout.coachId.name}
                </p>
              )}
              <p className="text-gray-500">
                Created: {new Date(workout.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
      {workouts.length === 0 && <p className="mt-4 text-gray-600">No workouts found.</p>}
    </div>
  );
}
