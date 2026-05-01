import { useAuth } from '@/features/auth';
import { Outlet, Navigate } from 'react-router-dom';

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  return isAuthenticated ? <Outlet /> : <Navigate to='/login' replace />;
}
