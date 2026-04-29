import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';

// Layouts & Components
import Navbar from './components/layout/nav/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/layout/ProtectedRoute';

// Pages
import Home from './pages/home/Home';
import SignUp from './features/auth/pages/SignUp';
import Login from './features/auth/pages/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Write from './pages/write/WriteLayout';
import Correct from './pages/correct/CorrectLayout';
import Corrections from './pages/corrections/CorrectionWorkspace';
import SubmissionReview from './pages/corrections/SubmissionReview';
import SubmissionsAll from './pages/corrections/SubmissionsAll';
import SubmissionDetail from './pages/corrections/SubmissionDetail';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='min-h-screen bg-gray-50 text-slate-900'>
          <Navbar />
          <main className='container mx-auto px-4 py-6 pb-10 md:pb-0'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/sign-up' element={<SignUp />} />
              <Route
                path='/dashboard'
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/write'
                element={
                  <ProtectedRoute>
                    <Write />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/correct'
                element={
                  <ProtectedRoute>
                    <Correct />
                  </ProtectedRoute>
                }
              />
               <Route
                path='/corrections'
                element={
                  <ProtectedRoute>
                    <Corrections />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/review'
                element={
                  <ProtectedRoute>
                    <SubmissionReview />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/submissions'
                element={
                  <ProtectedRoute>
                    <SubmissionsAll />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/submissions/:id'
                element={
                  <ProtectedRoute>
                    <SubmissionDetail />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
