import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';

// Layouts & Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import SignUpForm from '@/features/auth/sign-up/SignUpForm';
import Dashboard from './pages/Dashboard'; // Ensure this points to the right place

// Pages
import Home from './pages/Home';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50 text-slate-900">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sign-up" element={<SignUpForm />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;