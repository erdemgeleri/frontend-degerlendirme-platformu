import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminHomePage from './pages/adminPage/homePage';
import ModeratorPage from './pages/moderatorPage/homePageComponents/HomePage';
import ReviewerPage from './pages/degerlendirici_sayfa/evaluator';
import TopReviewerPage from './pages/topEvaluatorPage/homePage';
import LoginPage from './pages/loginPage/loginPage';
import StudentPage from './pages/studentPage/homePage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        
        <Route path="/moderator" element={
          <PrivateRoute requiredRole="moderator" element={<ModeratorPage />} />
        } />
        <Route path="/degerlendirici" element={
          <PrivateRoute requiredRole="evaluator" element={<ReviewerPage />} />
        } />
        <Route path="/ogrenci" element={
          <PrivateRoute requiredRole="student" element={<StudentPage />} />
        } />
        <Route path="/ustdegerlendirici" element={
          <PrivateRoute requiredRole="topEvaluator" element={<TopReviewerPage />} />
        } />
        <Route path="/yonetici" element={
          <PrivateRoute requiredRole="admin" element={<AdminHomePage />} />
        } />
        
      
      </Routes>
    </Router>
  );
}

export default App;
