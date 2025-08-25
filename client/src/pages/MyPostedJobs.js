import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';
import LoadingDots from '../components/LoadingDots';

export default function MyPostedJobs() {
  const { auth } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    const fetchMyJobs = async () => {
      if (!auth?.userId) return;

      try {
        const res = await API.get(`/jobs?postedBy=${auth.userId}`);
        setJobs(res.data);
      } catch (err) {
        console.error('Error fetching posted jobs:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyJobs();
  }, [auth]);

  if (loading) return <LoadingDots message="Loading your posted jobs..." />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Posted Jobs</h2>
      {jobs.length === 0 ? (
        <p>You haven't posted any jobs yet.</p>
      ) : (
        jobs.map((job, idx) => (
          <div key={idx} className="mb-4 p-4 border rounded bg-white shadow">
            <h3 className="text-lg font-bold">{job.title}</h3>
            <p>{job.description}</p>
            <p><strong>Required Skills:</strong> {job.requiredSkills.join(', ')}</p>
            <p><strong>Experience:</strong> {job.experience}</p>
            <p><strong>Contact:</strong> {job.contact}</p>
          </div>
        ))
      )}
    </div>
  );
}
