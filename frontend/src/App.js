import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ResetRequest from './components/auth/ResetRequest';
import ResetPassword from './components/auth/ResetPassword';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Error404 from './components/Error404';

function App() {
  return (
    <Router>
      <Routes>
        {/* RUTAS PUBLICAS */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ResetRequest />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="*" element={<Error404 />} />


        {/* RUTAS PRIVADAS */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
