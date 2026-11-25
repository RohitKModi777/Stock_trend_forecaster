import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import OverviewPage from './pages/OverviewPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import EmailOtpPage from './pages/EmailOtpPage';
import PhoneOtpPage from './pages/PhoneOtpPage';
import MobileOverviewPage from './pages/MobileOverviewPage';
import MobileForecastPage from './pages/MobileForecastPage';
import PredictionsPage from './pages/PredictionsPage';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/predictions" element={<PredictionsPage />} />
          <Route path="/forecast" element={<PredictionsPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/verify-email-otp" element={<EmailOtpPage />} />
          <Route path="/verify-phone-otp" element={<PhoneOtpPage />} />

          {/* Protected Institutional Terminal Routes */}
          <Route
            path="/overview"
            element={
              <ProtectedRoute>
                <OverviewPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/m/overview"
            element={
              <ProtectedRoute>
                <MobileOverviewPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/m/forecast"
            element={
              <ProtectedRoute>
                <MobileForecastPage />
              </ProtectedRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
