import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import bannerImg from '../../assets/hero-home-bg.svg';

export default function HeroSection() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleExploreJobs = () => {
    if (!user) {
      navigate('/login');
    } else if (user.role === 'candidate') {
      navigate('/candidate-dashboard');
    } else {
      alert('Only candidates can explore jobs.');
    }
  };

  const handlePostJob = () => {
    if (!user) {
      navigate('/login');
    } else if (user.role === 'employer') {
      navigate('/employer-dashboard');
    } else {
      alert('Only employers can post jobs.');
    }
  };

  return (
    <div
      className="bg-gray-50 min-h-screen flex flex-col justify-center items-center px-6 py-20 bg-cover bg-center w-full"
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to the AI Job Matching Platform
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          {user
            ? user.role === 'candidate'
              ? 'Explore jobs tailored to your skills and experience.'
              : 'Post jobs and find the perfect candidates using AI.'
            : 'Login to explore jobs or post new opportunities. Employers can register to start hiring today.'}
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4 mb-10">
          {!user && (
            <>
              <button
                onClick={handleExploreJobs}
                className="text-white px-6 py-3 rounded"
                style={{
                  backgroundColor: 'rgb(12 64 126/var(--tw-bg-opacity))',
                  transition: 'background 0.2s'
                }}
                onMouseOver={e => (e.currentTarget.style.backgroundColor = 'rgb(5 37 75/var(--tw-bg-opacity))')}
                onMouseOut={e => (e.currentTarget.style.backgroundColor = 'rgb(12 64 126/var(--tw-bg-opacity))')}
              >
                Explore Jobs
              </button>
              <button
                onClick={handlePostJob}
                className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
              >
                Post a Job
              </button>
            </>
          )}

          {user?.role === 'candidate' && (
            <button
              onClick={handleExploreJobs}
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
              Explore Jobs
            </button>
          )}

          {user?.role === 'employer' && (
            <button
              onClick={handlePostJob}
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
            >
              Post a Job
            </button>
          )}
        </div>

        <div className="text-left bg-white shadow-md rounded p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">How It Works</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Candidates upload their resume or enter profile manually</li>
            <li>Employers post jobs with required skills and experience</li>
            <li>System matches jobs using AI and LinkedIn integration</li>
            <li>Secure dashboards for both roles after login</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
