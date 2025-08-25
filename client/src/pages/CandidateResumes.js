import { useEffect, useState, useContext, useRef } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function CandidateResumes() {
  const { auth } = useContext(AuthContext);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [resumeToDelete, setResumeToDelete] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const toastShown = useRef(false);

  useEffect(() => {
    const fetchResumes = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await API.get('/resume');
        setResumes(Array.isArray(res.data) ? res.data : [res.data]);
      } catch (err) {
        if (err.response?.status === 404 && err.response?.data?.error === 'Resume not found') {
          setResumes([]);
        } else {
          setError('Failed to fetch resumes.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();

    if (location.state?.resumeUpdated && !toastShown.current) {
      toast.success('Resume updated successfully!', { position: 'top-right', duration: 2000 });
      toastShown.current = true;
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [auth, location, navigate]);

  const confirmDelete = (resumeId) => {
    setResumeToDelete(resumeId);
    setShowConfirmModal(true);
  };

  const handleDelete = async () => {
    if (!resumeToDelete) return;
    try {
      await API.delete(`/resume/${resumeToDelete}`);
      setResumes(prev => prev.filter(r => r._id !== resumeToDelete));
      toast.success('Resume deleted successfully!', { position: 'top-right', duration: 2000 });
    } catch (err) {
      console.error('Failed to delete resume:', err);
      toast.error('Failed to delete resume.', { position: 'top-center', duration: 2000 });
    } finally {
      setShowConfirmModal(false);
      setResumeToDelete(null);
    }
  };

  const handleEdit = (resumeId) => {
    // navigate(`/resume-builder?edit=${resumeId}`);
    navigate(`/update-resume/${resumeId}`);

  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="text-lg font-semibold">Loading resumes...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded">
        {error}
      </div>
    );
  }

  if (!resumes.length) {
    return (
      <div className="p-6 bg-yellow-50 text-yellow-800 rounded shadow">
        <p className="mb-4">No resumes found. Start building your resume to get matched with jobs!</p>
        <button
          onClick={() => navigate('/resume-builder')}
          className="px-6 py-3 rounded shadow transition text-black font-semibold hover:shadow-lg"
          style={{ backgroundColor: '#7fe7ebbe' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(88, 177, 172, 0.77)'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#7fe7ebbe'}
        >
          Build Resume
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div
        className="text-white px-6 py-4 rounded-lg shadow-md text-center mb-8"
        style={{
          backgroundImage: 'linear-gradient(to right, rgb(12 64 126), rgb(88 177 172))'
        }}
      >
        <h1 className="text-3xl font-extrabold">Candidate Resumes</h1>
      </div>

      <h2 className="text-xl font-bold mb-4">Your Uploaded Resumes</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-20 mt-10">
        {resumes.map((resume) => (
          <div key={resume._id} className="p-6 border rounded-lg bg-white shadow hover:shadow-md transition">
            <div className="flex flex-col h-full justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{resume.name || 'Resume'}</h3>
                <p className="text-sm text-gray-700 mb-1"><strong>Email:</strong> {resume.email}</p>
                <p className="text-sm text-gray-700 mb-1"><strong>Education:</strong> {resume.education?.join(', ')}</p>
                <p className="text-sm text-gray-700 mb-1"><strong>Skills:</strong> {resume.skills?.join(', ')}</p>
                <p className="text-sm text-gray-700"><strong>Experience:</strong> {resume.experience}</p>
              </div>
              <div className="flex flex-row gap-2 items-center justify-end mt-4 w-full">
                <div className="inline-block relative">
                  <button
                    onClick={() => handleEdit(resume._id)}
                    className="p-2 rounded-full hover:bg-green-100 transition group"
                  >
                    <span className="absolute left-1/2 -translate-x-1/2 -top-6 bg-white text-xs text-green-600 px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 pointer-events-none z-10 whitespace-nowrap transition">
                      Edit resume
                    </span>
                    <FaEdit color="#38a169" size={18} />
                  </button>
                </div>
                <div className="inline-block relative">
                  <button
                    onClick={() => confirmDelete(resume._id)}
                    className="p-2 rounded-full hover:bg-red-100 transition group"
                  >
                    <span className="absolute left-1/2 -translate-x-1/2 -top-6 bg-white text-xs text-red-600 px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 pointer-events-none z-10 whitespace-nowrap transition">
                      Delete resume
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
        <button
          onClick={() => navigate('/resume-builder')}
          className="px-6 py-3 rounded shadow transition text-black font-semibold hover:shadow-lg"
          style={{ backgroundColor: '#7fe7ebbe' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(88, 177, 172, 0.77)'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#7fe7ebbe'}
        >
          Add New Resume
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80 text-center">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-6 text-gray-700">Are you sure you want to delete this resume?</p>
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
                  setResumeToDelete(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
