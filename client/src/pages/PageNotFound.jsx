import { Link } from 'react-router-dom';
import PageNotFoundImage from '../assets/page-not-found.png';

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <img
        src={PageNotFoundImage}
        alt="404 Page Not Found"
        className="w-64 h-64 mb-6"
      />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Oops! Page Not Found</h1>
      <p className="text-gray-600 mb-4">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        Go to Homepage
      </Link>
    </div>
  );
}
