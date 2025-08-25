
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../services/api';
import LoadingDots from '../components/LoadingDots';

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    API.get(`/jobs/${id}`)
      .then(res => setJob(res.data))
      .catch(() => setError('Failed to load job details.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingDots message="Loading job details..." />;
  if (error) return <div className="text-red-600 mb-2">{error}</div>;
  if (!job) return <div className="text-red-600 mb-2">Job not found.</div>;

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-2">{job.title}</h2>
      <p><strong>Skills:</strong> {job.skills.join(', ')}</p>
      <p><strong>Experience:</strong> {job.experience}</p>
      <p><strong>Contact:</strong> {job.contact}</p>
    </div>
  );
}
