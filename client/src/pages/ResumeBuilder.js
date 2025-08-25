import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import LoadingDots from '../components/LoadingDots';
import toast from 'react-hot-toast';

export default function ResumeBuilder() {
  // 1. Update state to include new fields
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


  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      const allowed = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowed.includes(selected.type)) {
        setError('Only PDF and DOCX files are allowed.');
        setFile(null);
        return;
      }
      setError('');
      setFile(selected);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    // Update validation logic
    const hasManualData = form.email || form.profileSummary || form.skills || form.education || form.experience;
    const hasFile = !!file;

    if (!hasManualData && !hasFile) {
      setError('Please provide resume details or upload a file.');
      setLoading(false);
      return;
    }

    // Basic email validation
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      // Append all form fields to the FormData object
      formData.append('email', form.email);
      formData.append('profileSummary', form.profileSummary);
      formData.append('skills', form.skills);
      formData.append('education', form.education);
      formData.append('experience', form.experience);
      if (hasFile) formData.append('resumeFile', file);

      await API.post('/resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // alert('Resume saved successfully!');
      toast.success('Resume saved successfully!', { position: 'top-right', duration: 2000 });
      navigate('/candidate-resumes');
    } catch (err) {
      toast.error('Failed to save resume. Please try again.', err.message, { position: 'top-center', duration: 2000 });
      console.error('Submission error:', err);
      setError(err.response?.data?.message || 'Failed to save resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Build Your Resume</h2>

      <div className="space-y-4">
        {/* Added new input fields for email and profile summary */}
        <input
          type="email"
          placeholder="Email *"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[rgba(88,177,172,0.77)] focus:border-[rgba(88,177,172,0.77)]"
          onChange={e => setForm({ ...form, email: e.target.value })}
          value={form.email}
          required
        />

        <textarea
          placeholder="Profile Summary (Describe your experience, skills, and career goals. This helps AI find better matches for you!)"
          rows={4}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[rgba(88,177,172,0.77)] focus:border-[rgba(88,177,172,0.77)] resize-none"
          onChange={e => setForm({ ...form, profileSummary: e.target.value })}
          value={form.profileSummary}
        />

        <input
          type="text"
          placeholder="Skills (e.g., Python, JavaScript, Project Management)"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[rgba(88,177,172,0.77)] focus:border-[rgba(88,177,172,0.77)]"
          onChange={e => setForm({ ...form, skills: e.target.value })}
          value={form.skills}
        />

        <input
          type="text"
          placeholder="Education (e.g., BSc Computer Science - MIT, 2020)"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[rgba(88,177,172,0.77)] focus:border-[rgba(88,177,172,0.77)]"
          onChange={e => setForm({ ...form, education: e.target.value })}
          value={form.education}
        />

        <textarea
          placeholder="Work Experience (Describe your previous roles and responsibilities)"
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
            <span className="text-sm font-medium p-2" style={{backgroundColor: '#7fe7ebbe' }}>
              Selected: {file.name}
            </span>
          )}
        </div>

        {error && <div className="text-red-600 text-sm mt-2 p-2 bg-red-50 rounded">{error}</div>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full text-black font-semibold py-2 px-4 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: '#7fe7ebbe',
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(88,177,172,0.77)'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#7fe7ebbe'}
        >
          {loading ? <LoadingDots /> : 'Save Resume'}
        </button>
      </div>
    </div>
  );
}