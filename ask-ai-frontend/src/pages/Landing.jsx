import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800">
      <div className="text-center bg-zinc-950 shadow-2xl rounded-2xl p-10 max-w-lg w-full border border-zinc-700">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6 animate-pulse">
          Welcome to ASK AI
        </h1>
        <p className="text-gray-400 mb-10 text-lg">
          Your smart AI assistant ready to help you anytime.
        </p>
        <div className="flex justify-center gap-6">
          <Link to="/signup">
            <button className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition shadow-md hover:scale-105">
              Sign Up
            </button>
          </Link>
          <Link to="/login">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md hover:scale-105">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
