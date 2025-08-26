import { useEffect, useState, useContext, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import LoadingDots from '../components/LoadingDots';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const toastShown = useRef(false); // track toast display
  // confirm delete
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);


  useEffect(() => {
    const fetchJobs = async () => {
      if (!auth?.userId) return;
      setLoading(true);
      setError('');
      try {
        const res = await API.get('/jobs/jobsByEmployer');
        setJobs(res.data);
        if (res.data.length === 0) {
          setError('No jobs posted yet.');
        }
      } catch (err) {
        setError('Error fetching jobs.');
        console.error('Error fetching jobs:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();

    if (location.state?.jobPosted && !toastShown.current) {
      toast.success('Job posted successfully!', { position: 'top-right', duration: 2000 });
      toastShown.current = true;
      navigate(location.pathname, { replace: true, state: {} });
    }
    if (location.state?.jobUpdated && !toastShown.current) {
      toast.success('Job updated successfully!', { position: 'top-right', duration: 2000 });
      toastShown.current = true;
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [auth, location, navigate]);

  const confirmDelete = (jobId) => {
  setJobToDelete(jobId);
  setShowConfirmModal(true);
};

const handleDelete = async () => {
  if (!jobToDelete) return;
  try {
    await API.delete(`/jobs/${jobToDelete}`);
    setJobs(prev => prev.filter(job => job._id !== jobToDelete));
    toast.success('Job deleted successfully!', { position: 'top-right', duration: 2000 });
  } catch (err) {
    console.error('Delete failed:', err.response?.data || err.message);
    toast.error('Failed to delete job.', { position: 'top-right', duration: 2000 });
  } finally {
    setShowConfirmModal(false);
    setJobToDelete(null);
  }
};


    const handleUpdate = (jobId) => {
    navigate(`/update-job/${jobId}`);
  };

  return (
    <div className="p-6">
      <div
        className="text-white px-6 py-4 rounded-lg shadow-md text-center mb-8"
        style={{
          backgroundImage: 'linear-gradient(to right, rgb(12 64 126), rgb(88 177 172))'
        }}
      >
        <h1 className="text-3xl font-extrabold">Employer Dashboard</h1>
      </div>

      <h2 className="text-xl font-bold mb-4">Your Posted Jobs</h2>

      {loading ? (
        <LoadingDots message="Loading your posted jobs..." />
      ) : error ? (
        <div className="text-red-600 mb-2">{error}</div>
      ) : jobs.length === 0 ? (
        <div>
          <p>No jobs posted yet.</p>
          <Link
            to="/post-job"
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center w-fit"
          >
            Post a Job
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-20 mt-10">
            {jobs.map((job, idx) => (
              <div key={idx} className="p-6 border rounded-lg bg-white shadow hover:shadow-md transition">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{job.title}</h3>
                    <p className="text-gray-600 mb-2">{job.description}</p>
                    <p className="text-sm text-gray-700">
                      <strong>Required Skills:</strong>{' '}
                      {Array.isArray(job.skills) ? job.skills.join(', ') : 'Not specified'}
                    </p>

                    <p className="text-sm text-gray-700">
                      <strong>Employer Contact:</strong> {' '}
                      {job.contact}
                    </p>

                    <p className="text-sm text-gray-700">
                      <strong>Experience:</strong> {' '}
                      {job.experience || 'Not specified'}
                    </p>

                  </div>
                  <div className="flex flex-row gap-2 items-center justify-end mt-4 w-full">
                    <div className="inline-block relative">
                      <button
                        onClick={() => handleUpdate(job._id)}
                        className="p-2 rounded-full hover:bg-green-100 transition group"
                      >
                        <span className="absolute left-1/2 -translate-x-1/2 -top-6 bg-white text-xs text-green-600 px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 pointer-events-none z-10 whitespace-nowrap transition">
                          Update job
                        </span>
                        <FaEdit color="#38a169" size={18} />
                      </button>
                    </div>
                    <div className="inline-block relative">
                      <button
                        onClick={() => confirmDelete(job._id)}
                        className="p-2 rounded-full hover:bg-red-100 transition group"
                      >
                        <span className="absolute left-1/2 -translate-x-1/2 -top-6 bg-white text-xs text-red-600 px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 pointer-events-none z-10 whitespace-nowrap transition">
                          Delete job
                        </span>
                        <FaTrash color="#e3342f" size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Link
              to="/post-job"
              className="px-6 py-3 rounded shadow transition text-black font-semibold hover:shadow-lg"
              style={{ backgroundColor: '#7fe7ebbe' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(88, 177, 172, 0.77)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#7fe7ebbe'}
            >
              Post a New Job
            </Link>
          </div>

          {/* Confirmation Modal */}
          {showConfirmModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow-lg w-80 text-center">
                <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
                <p className="mb-6 text-gray-700">Are you sure you want to delete this job?</p>
                <div className="flex justify-center gap-4">
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    onClick={handleDelete}
                  >
                    Confirm
                  </button>
                  <button
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                    onClick={() => {
                      setShowConfirmModal(false);
                      setJobToDelete(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
