import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import LoadingDots from '../components/LoadingDots';
import toast from 'react-hot-toast';

export default function PostJob() {
  const [form, setForm] = useState({ title: '', skills: '', experience: '', contact: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Job title is required.';
    if (!form.skills.trim()) newErrors.skills = 'At least one skill is required.';
    if (!form.contact.trim()) newErrors.contact = 'Contact number is required.';
    return newErrors;
  };

  const handlePost = async () => {
    const clientErrors = validate();
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }
    setLoading(true);
    setErrors({});
    try {
      await API.post('/jobs', {
        title: form.title,
        skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
        experience: form.experience,
        contact: form.contact
      });
  navigate('/employer-dashboard', { state: { jobPosted: true } });
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors);
        toast.error('Please fix the errors in the form.', { position: 'top-center', duration: 3000 });
      } else {
        setErrors({ general: 'Failed to post job. Please try again.' });
        toast.error('Failed to post job. Please try again.', { position: 'top-center', duration: 3000 });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="bg-white p-6 rounded shadow">
      <h3 className="text-lg font-semibold mb-4">Post a Job</h3>
      <div className="mb-4">
        <input
          className="border p-2 w-full"
          placeholder="Job Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          required
        />
        {errors.title && <div className="text-red-600 text-xs mt-1">{errors.title}</div>}
      </div>
      <div className="mb-4">
        <input
          className="border p-2 w-full"
          placeholder="Skills (comma-separated)"
          value={form.skills}
          onChange={e => setForm({ ...form, skills: e.target.value })}
          required
        />
        {errors.skills && <div className="text-red-600 text-xs mt-1">{errors.skills}</div>}
      </div>
      <div className="mb-4">
        <input
          className="border p-2 w-full"
          placeholder="Experience (optional)"
          value={form.experience}
          onChange={e => setForm({ ...form, experience: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <input
          className="border p-2 w-full"
          placeholder="Contact Number"
          value={form.contact}
          onChange={e => setForm({ ...form, contact: e.target.value })}
          required
        />
        {errors.contact && <div className="text-red-600 text-xs mt-1">{errors.contact}</div>}
      </div>
      {errors.general && <div className="text-red-600 mb-2">{errors.general}</div>}
      {/* <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handlePost} disabled={loading}>Post Job</button> */}
      <button  className="px-4 py-2 rounded shadow font-semibold text-black transition bg-[#7fe7ebbe] hover:bg-[rgba(88,177,172,0.77)] hover:text-black"
        onClick={handlePost} disabled={loading}>Post Job</button>
      <button
        className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 ms-2"
        onClick={() => {
        navigate('/employer-dashboard');
        }}
      >
        Cancel
      </button>
      {loading && <LoadingDots message="Posting your job..." />}
    </div>
  );
}
