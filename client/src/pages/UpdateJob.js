import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import toast from 'react-hot-toast';

export default function UpdateJob() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    skills: '',
    experience: '',
    contact: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await API.get(`/jobs/get-job-by-id/${jobId}`);
        setForm({
          title: res.data.title || '',
          skills: Array.isArray(res.data.skills) ? res.data.skills.join(', ') : res.data.skills || '',
          experience: res.data.experience || '',
          contact: res.data.contact || ''
        });
      } catch (err) {
        setError('Failed to fetch job details');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [jobId]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await API.put(`/jobs/${jobId}`, {
        ...form,
        skills: form.skills.split(',').map(s => s.trim())
      });
      navigate('/employer-dashboard', { state: { jobUpdated: true } });
    } catch (err) {
      setError('Failed to update job');
      toast.error('Failed to update job', { position: 'top-center', duration: 2000 });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Update Job</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Title</label>
          <input name="title" value={form.title} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Skills (comma separated)</label>
          <input name="skills" value={form.skills} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Experience</label>
          <input name="experience" value={form.experience} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Contact</label>
          <input name="contact" value={form.contact} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        </div>
        {/* <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update Job</button> */}
        <button
          type="submit"
          className="px-4 py-2 rounded shadow font-semibold text-black transition bg-[#7fe7ebbe] hover:bg-[rgba(88,177,172,0.77)] hover:text-black"
        >
          Update Job
        </button>

      </form>
    </div>
  );
}
