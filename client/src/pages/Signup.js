import { TextField, Button, Select, MenuItem } from '@mui/material';
import { useState } from 'react';
import API from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import LoadingDots from '../components/LoadingDots';

export default function Signup() {
  const [form, setForm] = useState({ email: '', password: '', role: 'candidate', name: '' });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      await API.post('/auth/signup', form);
      alert('Signup successful');
      navigate('/login');
    } catch (err) {
      setError('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center"
      style={{ color: 'rgb(12 64 126/var(--tw-bg-opacity))' }}
      >Create Your Account</h2>
      <div className="text-center mb-4">
        <TextField label="Name" fullWidth className="mb-4" onChange={e => setForm({ ...form, name: e.target.value })} />
      </div>
      <div className="mb-4">
        <TextField label="Email" fullWidth className="mb-4" onChange={e => setForm({ ...form, email: e.target.value })} />
      </div>
      <div className="mb-4">
        <TextField label="Password" type="password" fullWidth className="mb-4" onChange={e => setForm({ ...form, password: e.target.value })} />
      </div>

      <Select fullWidth value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="mb-4">
        <MenuItem value="candidate">Candidate</MenuItem>
        <MenuItem value="employer">Employer</MenuItem>
      </Select>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <Button
        // className='mb-4'
        variant="contained"
        onClick={handleSubmit}
        disabled={loading}
        fullWidth
        sx={{ backgroundColor: 'rgb(12 64 126/var(--tw-bg-opacity))', '&:hover': { backgroundColor: 'rgb(5 37 75/var(--tw-bg-opacity))' } }}
        >
        Sign Up 
      </Button>
      <div className="text-center mt-4">
        <span className="text-gray-600">Already have an account? <Link to="/login"
          style={{color: 'rgb(5 37 75/var(--tw-bg-opacity))', textDecoration: 'none', fontWeight: 'bold'}} 
          onMouseOver={e => (e.currentTarget.style.textDecoration = 'underline')}
          onMouseOut={e => (e.currentTarget.style.textDecoration = 'none')}
        >Login</Link></span>
      </div>
      {loading && <LoadingDots message="Creating your account..." />}
    </div>
  );
}
