import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';

// Layouts & Components
import Navbar from './components/layout/nav/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/layout/ProtectedRoute';
import AuthProvider from './features/auth/components/AuthProvider';

// Pages
import LandingPage from './features/landing/pages/LandingPage';
import SignUp from './features/auth/pages/SignUp';
import Login from './features/auth/pages/Login';
import Dashboard from './features/dashboard/pages/Dashboard';
import Write from './features/write/pages/Write';
import CorrectionQueue from './features/correct/pages/CorrectionQueue';
import Correct from './features/correct/pages/Correct';
import CorrectionReviewPage from './features/correct/pages/CorrectionReviewPage';
import SubmissionDetail from './features/submissions/pages/SubmissionDetail';
import Submissions from './features/submissions/pages/Submissions';
import Profile from './features/profile/pages/Profile';
import NotFound from '@/components/layout/NotFound';
import MyCorrections from './features/correct/components/MyCorrections';

import { Toaster } from 'sonner';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='min-h-screen bg-gray-50 text-slate-900'>
          <AuthProvider>
            <Navbar />
            <Toaster richColors position='top-right' />
            <main className='container mx-auto px-4 py-6 pb-10 md:pb-0'>
              <Routes>
                {/* Public routes */}
                <Route path='/' element={<LandingPage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/sign-up' element={<SignUp />} />

                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path='/dashboard' element={<Dashboard />} />
                  <Route path='/write' element={<Write />} />
                  <Route path='/write/:id' element={<Write />} />

                  <Route path='/correct' element={<CorrectionQueue />} />
                  <Route path='/correct/:id' element={<Correct />} />
                  <Route
                    path='/correct/:id/review'
                    element={<CorrectionReviewPage />}
                  />

                  <Route path='/submissions' element={<Submissions />} />
                  <Route path='/my-corrections' element={<MyCorrections />} />
                  <Route
                    path='/submissions/:id'
                    element={<SubmissionDetail />}
                  />
                  <Route path='/profile' element={<Profile />} />
                  <Route path='*' element={<NotFound />} />
                </Route>
              </Routes>
            </main>
          </AuthProvider>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
