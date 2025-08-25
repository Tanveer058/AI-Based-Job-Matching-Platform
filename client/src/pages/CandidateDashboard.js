import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import {  toast } from 'react-hot-toast';
import LoadingDots from '../components/LoadingDots';


export default function CandidateDashboard() {
  const { auth } = useContext(AuthContext);
  const [matches, setMatches] = useState([]);
  const [portalJobs, setPortalJobs] = useState([]);
  const [resumeExists, setResumeExists] = useState(true);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(navigator.onLine);


  useEffect(() => {
    const fetchData = async () => {
      if (!auth?.userId) return;
      setLoading(true);
      try {
        const resumeRes = await API.get('/resume');
        if (!resumeRes.data || !resumeRes.data.skills?.length) {
          setResumeExists(false);
          setErrorMessage('Resume not found. Please build your resume to get matched jobs.');
          // return;
        }

        try {
          const matchRes = await API.get('/linkedin');
          setMatches(matchRes.data);
        } catch (matchErr) {
          if (matchErr.response?.status === 403) {
            setErrorMessage('⚠️ Job matching service limit reached. Please try again later.');
          } else {
            setErrorMessage('⚠️ Failed to fetch matched jobs. Please try again soon.');
          }
        }

        try {
            const portalRes = await API.get('/jobs');
          setPortalJobs(portalRes.data);
          console.log("Portal jobs: ", portalRes.data);
        } catch (portalErr) {
          console.warn('Failed to fetch portal jobs:', portalErr.message);
        }

      } catch (err) {
        setResumeExists(false);
        setErrorMessage('Resume not found. Please build your resume to get matched jobs.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [auth]);

  useEffect(() => {
  const handleOnline = () => setIsOnline(true);
  const handleOffline = () => setIsOnline(false);

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
}, []);

useEffect(() => {
  if (!isOnline) {
    toast.error('You are offline. Some features may not work.', { position: 'top-center' });
  }
}, [isOnline]);



  if (loading) return <LoadingDots />;


  

  return (
  <div className="p-6 max-w-6xl mx-auto">
    {/* Dashboard Header */}
    <div
      className="flex justify-between items-center text-white px-6 py-4 rounded-lg shadow-md mb-8"
      style={{
        backgroundImage: 'linear-gradient(to right, rgb(12 64 126), rgb(88 177 172))'
      }}
    >
      <h1 className="text-3xl font-extrabold">Candidate Dashboard</h1>
      <button
        onClick={() => navigate('/candidate-resumes')}
        className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition"
      >
        My Resumes
      </button>

    </div>

    {/* Matched Jobs */}
    <h2 className="text-2xl font-bold mb-4 text-gray-800">Matched Jobs</h2>

    {errorMessage && (
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-300 text-yellow-800 rounded-lg shadow-sm flex items-center justify-between">
        <span>{errorMessage}</span>
        {!resumeExists && (
      
          <button
            onClick={() => navigate('/resume-builder')}
            className="ml-4 px-3 py-1 rounded shadow font-semibold text-black"
            style={{ backgroundColor: '#7fe7ebbe' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(88, 177, 172, 0.77)';
              e.currentTarget.style.color = '#000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#7fe7ebbe';
              e.currentTarget.style.color = '#000';
            }}
          >
            Build Resume
          </button>

        )}
      </div>
    )}

    {/* LinkedIn Jobs */}
    {!errorMessage && (
      <>
        <div className="bg-blue-50 px-4 py-2 rounded-md mb-6 border border-blue-200">
          <h2 className="text-xl font-bold text-blue-700">Jobs from LinkedIn</h2>
        </div>

        {matches.length === 0 ? (
          <p className="text-gray-600">No matched LinkedIn jobs found yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {matches.map((job, idx) => (
              <div key={idx} className="p-6 border rounded-lg bg-white shadow hover:shadow-md transition">
                <h3 className="text-lg font-bold text-gray-800">{job.job_position || job.title}</h3>
                <p className="text-gray-600">{job.company_name || job.description}</p>
                {job.job_link ? (
                  <a
                    href={job.job_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-blue-600 underline"
                  >
                    View on LinkedIn
                  </a>
                ) : (
                  <p className="text-green-600 mt-2">Posted on this portal</p>
                )}
              </div>
            ))}
          </div>
        )}
      </>
    )}

    {/* Portal Jobs */}
    <div className="bg-green-50 px-4 py-2 rounded-md mb-6 mt-12 border border-green-200">
      <h2 className="text-xl font-bold text-green-700">Jobs Posted on This Portal</h2>
    </div>

    {/* {portalJobs.length === 0 ? (
      <p className="text-gray-600">No jobs posted on the portal yet.</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portalJobs.map((job, idx) => (
          <div
            key={idx}
            className="p-6 border rounded-lg bg-white shadow hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{job.title}</h3>
              <p className="text-sm text-gray-700 mb-1">
                <strong className="text-gray-900">Required Skills:</strong> {job.skills.join(', ')}
              </p>
              <p className="text-sm text-gray-700 mb-1">
                <strong className="text-gray-900">Experience:</strong> {job.experience}
              </p>
              <p className="text-sm text-gray-700">
                <strong className="text-gray-900">Contact:</strong> {job.contact}
              </p>
            </div>
          </div>
        ))}
      </div>
    )} */}
    {!isOnline ? (
      <p className="text-red-600 font-medium">🚫 You’re offline. Please check your internet connection to view jobs.</p>
    ) : portalJobs.length === 0 ? (
      <p className="text-gray-600">No jobs posted on the portal yet.</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portalJobs.map((job, idx) => (
          <div
            key={idx}
            className="p-6 border rounded-lg bg-white shadow hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{job.title}</h3>
              <p className="text-sm text-gray-700 mb-1">
                <strong className="text-gray-900">Required Skills:</strong> {job.skills.join(', ')}
              </p>
              <p className="text-sm text-gray-700 mb-1">
                <strong className="text-gray-900">Experience:</strong> {job.experience}
              </p>
              <p className="text-sm text-gray-700">
                <strong className="text-gray-900">Contact:</strong> {job.contact}
              </p>
            </div>
          </div>
        ))}
      </div>
    )}

  </div>
);


}


// import { useState, useEffect } from 'react';
// import API from '../services/api';
// import CandidateResumes from './CandidateResumes';
// import LoadingDots from '../components/LoadingDots';

// export default function CandidateDashboard() {
//   const [resumes, setResumes] = useState([]); // Initialize as empty array
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchResumes = async () => {
//       try {
//         setError('');
//         const response = await API.get('/resume');
//         console.log('API Response:', response.data); // For debugging
//         setResumes(response.data); // Assuming response.data is the array of resumes
//       } catch (err) {
//         console.error('Failed to fetch resumes:', err);
//         setError('Failed to load your resumes. Please try again.');
//         setResumes([]); // Set to empty array on error
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResumes();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-64">
//         <LoadingDots message="Loading your resumes..." />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
//         <div className="text-red-600 bg-red-50 p-4 rounded-md mb-4">
//           {error}
//         </div>
//         <button
//           onClick={() => window.location.reload()}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">Your Resume Dashboard</h1>
//         <a
//           href="/build-resume"
//           className="bg-[#7fe7ebbe] text-black font-semibold py-2 px-4 rounded hover:bg-[rgba(88,177,172,0.77)] transition"
//         >
//           + Create New Resume
//         </a>
//       </div>
      
//       <CandidateResumes resumes={resumes} />
//     </div>
//   );
// }