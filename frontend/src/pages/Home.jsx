import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
// CHANGE: Import the action from testActions.js
import { fetchTest } from '../features/test/testActions';

export default function Home() {
  const dispatch = useAppDispatch();
  const { message, status } = useAppSelector((state) => state.test);

  useEffect(() => {
    
    dispatch(fetchTest()); 
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">LinguaLoop Test Pipe</h1>
      <div className={`p-4 rounded ${
        status === 'success' ? 'bg-green-100' : 
        status === 'failed' ? 'bg-red-100' : 'bg-yellow-100'
      }`}>
        Status: <strong>{status === 'loading' ? 'Checking...' : message}</strong>
      </div>
    </div>
  );
}