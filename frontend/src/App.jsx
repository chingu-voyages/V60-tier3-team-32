import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';

// Layouts & Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import SignUpForm from '@/features/auth/sign-up/SignUpForm';

// Pages
import Home from './pages/home/Home';

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
            
             
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;