import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';

// Layouts & Components (We'll create these next)
import Navbar from './components/layout/Navbar';

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
            
              {/* Future routes like /practice or /profile go here */}
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;