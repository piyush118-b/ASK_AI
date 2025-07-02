import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3003/auth/signup', {
        email,
        password,
      });
      console.log('User created:', res.data.user);
      alert('Signup successful! Please log in.');
      navigate('/login');
    } catch (err) {
      console.error(err.response?.data?.error || err.message);
      alert(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800">
      <div className="bg-zinc-950 p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-zinc-700">
        <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6 animate-pulse">
          ASK AI Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-zinc-900 text-white border border-zinc-600 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-zinc-900 text-white border border-zinc-600 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-cyan-600 text-white font-semibold py-2 rounded hover:bg-cyan-700 transition duration-200 shadow-md hover:scale-105"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-zinc-400">
          Already have an account?{' '}
          <Link to="/login" className="text-cyan-400 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
