import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm p-4 flex gap-4">
      <Link to="/" className="hover:text-blue-600">Home</Link>
      <Link to="/login" className="hover:text-blue-600">Login</Link>
    </nav>
  );
}