import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Destinations from './pages/passager/Destinations';
import Reservation from './pages/passager/Reservation';

// Auth
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) return <Navigate to="/login" />;
  if (role && userRole !== role) return <Navigate to="/login" />;

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect racine vers login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth - Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Pages à ajouter au fur et à mesure */}
        
        <Route path="/destinations" element={
          <ProtectedRoute role="passager">
            <Destinations />
          </ProtectedRoute>
        }/> 
	 
	<Route path="/reservation" element={
	  <ProtectedRoute role="passager">
	    <Reservation />
	  </ProtectedRoute>
	}/>        
      </Routes>
    </BrowserRouter>
  );
}


export default App;
