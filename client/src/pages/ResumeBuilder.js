import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import LoadingDots from '../components/LoadingDots';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function ResumeBuilder() {
  const [form, setForm] = useState({
    email: '',
    profileSummary: '',
    skills: '',
    education: '',
    experience: ''
  });
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { auth } = useContext(AuthContext);
  // const userId = auth?.user?._id;
  const userId = auth?.userId;
  const email = auth?.user?.email;


  // const handleFileChange = (e) => {
  //   const selected = e.target.files[0];
  //   const allowed = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

  //   if (selected && allowed.includes(selected.type)) {
  //     setFile(selected);
  //     setError('');
  //   } else {
  //     setFile(null);
  //     setError('Only PDF and DOCX files are allowed.');
  //   }
  // };
const handleFileChange = (e) => {
  const selected = e.target.files[0];
  const allowed = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

  if (selected && allowed.includes(selected.type)) {
    setFile(selected);
    setError('');
  } else {
    setFile(null);
    setError('Only PDF and DOCX files are allowed.');
  }
};


  // const handleSubmit = async () => {
  //   setLoading(true);
  //   setError('');

  //   const hasManualData = form.email || form.profileSummary || form.skills || form.education || form.experience;
  //   const hasFile = !!file;

  //   if (!hasManualData && !hasFile) {
  //     setError('Please provide resume details or upload a file.');
  //     setLoading(false);
  //     return;
  //   }

  //   if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
  //     setError('Please enter a valid email address.');
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     const formData = new FormData();
  //     formData.append('email', form.email);

  //     if (hasManualData) {
  //       formData.append('profileSummary', form.profileSummary);
  //       formData.append('skills', form.skills);
  //       formData.append('education', form.education);
  //       formData.append('experience', form.experience);
  //       if (hasFile) formData.append('resumeFile', file);

  //       await API.post('/resume', formData, {
  //         headers: { 'Content-Type': 'multipart/form-data' }
  //       });
  //     } else {
  //       // Upload-only flow
  //       formData.append('resume', file);
  //       formData.append('userId', 'user-id-from-auth'); // Replace with actual userId from context or auth
  //       await API.post('/resume/upload', formData, {
  //         headers: { 'Content-Type': 'multipart/form-data' }
  //       });
  //     }

  //     toast.success('Resume saved successfully!', { position: 'top-right', duration: 2000 });
  //     navigate('/candidate-resumes');
  //   } catch (err) {
  //     console.error('Submission error:', err);
  //     toast.error('Failed to save resume. Please try again.', { position: 'top-center', duration: 2000 });
  //     setError(err.response?.data?.message || 'Failed to save resume. Please try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
const handleSubmit = async () => {
  setLoading(true);
  setError('');

  const hasManualData = form.profileSummary || form.skills || form.education || form.experience;
  const hasFile = !!file;

  if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
    setError('Please enter a valid email address.');
    setLoading(false);
    return;
  }

  if (!hasManualData && !hasFile) {
    setError('Please provide resume details or upload a file.');
    setLoading(false);
    return;
  }

  try {
    const formData = new FormData();
    formData.append('email', form.email);
    formData.append('profileSummary', form.profileSummary);
    formData.append('skills', form.skills);
    formData.append('education', form.education);
    formData.append('experience', form.experience);
    if (hasFile) formData.append('resumeFile', file);

    await API.post('/resume', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    toast.success('Resume saved successfully!', { position: 'top-right', duration: 2000 });
    navigate('/candidate-resumes');
  } catch (err) {
    console.error('Submission error:', err);
    toast.error('Failed to save resume. Please try again.', { position: 'top-center', duration: 2000 });
    setError(err.response?.data?.message || 'Failed to save resume. Please try again.');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Build Your Resume</h2>

      <div className="space-y-4">
        <input
          type="email"
          placeholder="Email *"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[rgba(88,177,172,0.77)] focus:border-[rgba(88,177,172,0.77)]"
          onChange={e => setForm({ ...form, email: e.target.value })}
          value={form.email}
          required
        />

        <textarea
          placeholder="Profile Summary"
          rows={4}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[rgba(88,177,172,0.77)] focus:border-[rgba(88,177,172,0.77)] resize-none"
          onChange={e => setForm({ ...form, profileSummary: e.target.value })}
          value={form.profileSummary}
        />

        <input
          type="text"
          placeholder="Skills (comma separated)"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[rgba(88,177,172,0.77)] focus:border-[rgba(88,177,172,0.77)]"
          onChange={e => setForm({ ...form, skills: e.target.value })}
          value={form.skills}
        />

        <input
          type="text"
          placeholder="Education (comma separated)"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[rgba(88,177,172,0.77)] focus:border-[rgba(88,177,172,0.77)]"
          onChange={e => setForm({ ...form, education: e.target.value })}
          value={form.education}
        />

        <textarea
          placeholder="Work Experience"
          rows={4}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[rgba(88,177,172,0.77)] focus:border-[rgba(88,177,172,0.77)] resize-none"
          onChange={e => setForm({ ...form, experience: e.target.value })}
          value={form.experience}
        />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <input
            type="file"
            accept=".pdf,.docx"
            className="block w-full sm:w-auto text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#7fe7ebbe] file:text-black hover:file:bg-[rgba(88,177,172,0.77)] hover:file:text-black"
            onChange={handleFileChange}
          />
          {file && (
            <span className="text-sm font-medium p-2" style={{ backgroundColor: '#7fe7ebbe' }}>
              Selected: {file.name}
            </span>
          )}
        </div>

        {error && <div className="text-red-600 text-sm mt-2 p-2 bg-red-50 rounded">{error}</div>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full text-black font-semibold py-2 px-4 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: '#7fe7ebbe' }}
          onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(88,177,172,0.77)'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#7fe7ebbe'}
        >
          {loading ? <LoadingDots /> : 'Save Resume'}
        </button>
      </div>
    </div>
  );
}
