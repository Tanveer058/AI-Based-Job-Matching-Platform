import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import LoadingDots from '../components/LoadingDots';
import toast from 'react-hot-toast';

export default function UpdateResume() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    profileSummary: '',
    skills: '',
    education: '',
    experience: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await API.get(`/resume/${id}`);
        setForm({
          email: res.data.email || '',
          profileSummary: res.data.profileSummary || '',
          skills: Array.isArray(res.data.skills) ? res.data.skills.join(', ') : res.data.skills || '',
          education: Array.isArray(res.data.education) ? res.data.education.join(', ') : res.data.education || '',
          experience: res.data.experience || ''
        });

      } catch (err) {
        setError('Failed to fetch resume details.');
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, [id]);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');

    try {
      await API.put(`/resume/${id}`, {
        ...form,
        skills: form.skills.split(',').map(s => s.trim()),
        education: form.education.split(',').map(e => e.trim())
      });

      toast.success('Resume updated successfully!', { position: 'top-right', duration: 2000 });
      navigate('/candidate-resumes', { state: { resumeUpdated: true } });
    } catch (err) {
      toast.error('Failed to update resume.', { position: 'top-center', duration: 2000 });
      setError('Failed to update resume.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingDots message="Loading resume..." />;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Your Resume</h2>

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

        {error && <div className="text-red-600 text-sm mt-2 p-2 bg-red-50 rounded">{error}</div>}

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full text-black font-semibold py-2 px-4 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: '#7fe7ebbe' }}
          onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(88,177,172,0.77)'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#7fe7ebbe'}
        >
          {submitting ? <LoadingDots /> : 'Update Resume'}
        </button>
      </div>
    </div>
  );
}
