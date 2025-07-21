// App.tsx or Routes.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/Login';
import RegisterPage from './pages/RegisterPage';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { logout } from './slices/authSlice';
import Dashboard from './pages/Dashboard';
// import Dashboard from './pages/Dashboard';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const expiry = localStorage.getItem("tokenExpiry");
    console.log(expiry)
    if (expiry && new Date().getTime() > parseInt(expiry)) {
      console.log("Run");
      dispatch(logout());
    }
  }, [dispatch]);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}
