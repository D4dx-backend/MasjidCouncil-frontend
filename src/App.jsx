import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminNavbar from './components/AdminNavbar';
import Home from './pages/Home';
import AffiliationForm from './pages/AffiliationForm';
import MedicalAidForm from './pages/MedicalAidForm';
import MosqueFundForm from './pages/MosqueFundForm';
import AdminLogin from './pages/AdminLogin';
import AffiliationFormLit from './pages/AffiliationFormList';
import AffiliationFormListAdmin from './pages/AffiliationFormListAdmin';
import AdminHome from './pages/AdminHome';
import MedicalAidDataList from './pages/MedicalAidDataList';
import MedicalAidDataListAdmin from './pages/MedicalAidDataListAdmin';
import MosqueFundList from './pages/MosqueFundList';
import MosqueFundListAdmin from './pages/MosqueFundListAdmin';
import ChangePasswordRequest from './pages/ChangePasswordRequest';


// Helper component to wrap Routes and conditional navbar
const Layout = () => {
  const location = useLocation();

  const adminRoutes = [
    '/affliation-list',
    '/affliation-list-admin',
    '/admin-home',
    '/medical-list',
    '/medical-list-admin',
    '/mosque-list',
    '/mosque-list-admin',
    '/change-password'
  ];

  const isAdminRoute = adminRoutes.includes(location.pathname);
  const isAdminLogin = location.pathname === '/admin-login';

  return (
    <>
      {!isAdminLogin && (isAdminRoute ? <AdminNavbar /> : <Navbar />)}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/affiliation" element={<AffiliationForm />} />
        <Route path="/medical-aid" element={<MedicalAidForm />} />
        <Route path="/mosque-fund" element={<MosqueFundForm />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/affliation-list" element={<AffiliationFormLit />} />
        <Route path="/affliation-list-admin" element={<AffiliationFormListAdmin />} />
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/medical-list" element={<MedicalAidDataList />} />
        <Route path="/medical-list-admin" element={<MedicalAidDataListAdmin />} />
        <Route path="/mosque-list" element={<MosqueFundList />} />
        <Route path="/mosque-list-admin" element={<MosqueFundListAdmin />} />
        <Route path="/change-password" element={<ChangePasswordRequest />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
