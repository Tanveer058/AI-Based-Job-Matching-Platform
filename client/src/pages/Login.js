import { TextField, Button } from '@mui/material';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';
import LoadingDots from '../components/LoadingDots';
import { Link } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      login(res.data.token, res.data.role);
      if (res.data.role === 'candidate') navigate('/candidate-dashboard');
      else navigate('/employer-dashboard');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow-md">
      <h2
        className="text-2xl font-bold mb-4 text-center"
        style={{ color: 'rgb(12 64 126/var(--tw-bg-opacity))' }}
      >
        Login to Your Account
      </h2>
      <div className="mb-4 mt-4">
        <TextField
          label="Email"
          fullWidth
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <TextField
          label="Password"
          type="password"
          fullWidth
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
      </div>

      {error && <div className="text-red-600 mb-2">{error}</div>}

      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={loading}
        fullWidth
        sx={{ backgroundColor: 'rgb(12 64 126/var(--tw-bg-opacity))', '&:hover': { backgroundColor: 'rgb(5 37 75/var(--tw-bg-opacity))' } }}
      >
        Login
      </Button>

      {loading && <LoadingDots message="Logging you in..." />}

      <div className="text-center mt-4">
        <span className="text-gray-600">Don’t have an account? <Link to="/signup"
        style={{color: 'rgb(5 37 75/var(--tw-bg-opacity))', textDecoration: 'none', fontWeight: 'bold'}} 
        onMouseOver={e => (e.currentTarget.style.textDecoration = 'underline')}
        onMouseOut={e => (e.currentTarget.style.textDecoration = 'none')}
        >Signup</Link></span>
      </div>
    </div>
  );
}



// import { TextField, Button, Typography } from '@mui/material';
// import { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import API from '../services/api';
// import LoadingDots from '../components/LoadingDots';
// import { Link } from 'react-router-dom';

// export default function Login() {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

 
//   const handleSubmit = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const res = await API.post('/auth/login', form);
//       console.log('Login response:', res);
      
//       // Only pass the token to login function - it will decode the token to get role and userId
//       login(res.token);
      
//       // Use the role from the response to navigate
//       if (res.role === 'candidate') {
//         navigate('/candidate-dashboard');
//       } else {
//         navigate('/employer-dashboard');
//       }
      
//     } catch (err) {
//       console.error('Login error:', err);
//       setError('Login failed. Please check your credentials.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto bg-white rounded shadow-md">
//       <h2
//         className="text-2xl font-bold mb-4 text-center"
//         style={{ color: 'rgb(12 64 126/var(--tw-bg-opacity))' }}
//       >
//         Login to Your Account
//       </h2>
//       <div className="mb-4 mt-4">
//         <TextField
//           label="Email"
//           fullWidth
//           onChange={e => setForm({ ...form, email: e.target.value })}
//         />
//       </div>
//       <div className="mb-4">
//         <TextField
//           label="Password"
//           type="password"
//           fullWidth
//           onChange={e => setForm({ ...form, password: e.target.value })}
//         />
//       </div>

//       {error && <div className="text-red-600 mb-2">{error}</div>}

//       <Button
//         variant="contained"
//         onClick={handleSubmit}
//         disabled={loading}
//         fullWidth
//         sx={{ backgroundColor: 'rgb(12 64 126/var(--tw-bg-opacity))', '&:hover': { backgroundColor: 'rgb(5 37 75/var(--tw-bg-opacity))' } }}
//       >
//         Login
//       </Button>

//       {loading && <LoadingDots message="Logging you in..." />}

//       <div className="text-center mt-4">
//         <span className="text-gray-600">Don't have an account? <Link to="/signup"
//         style={{color: 'rgb(5 37 75/var(--tw-bg-opacity))', textDecoration: 'none', fontWeight: 'bold'}} 
//         onMouseOver={e => (e.currentTarget.style.textDecoration = 'underline')}
//         onMouseOut={e => (e.currentTarget.style.textDecoration = 'none')}
//         >Signup</Link></span>
//       </div>
//     </div>
//   );
// }