import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading, isConfigured } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-space-lg text-on-surface">
        <div className="flex items-center gap-space-sm mb-space-md">
          <span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-ping"></span>
          <span className="font-headline-sm text-on-surface font-semibold tracking-tight">
            Authenticating Institutional Terminal Session...
          </span>
        </div>
        <div className="w-64 h-1.5 bg-surface-container-high rounded overflow-hidden">
          <div className="h-full bg-primary-container animate-pulse w-3/4"></div>
        </div>
        <span className="font-label-caps text-outline mt-space-sm uppercase tracking-wider">
          Connecting to Secure Auth Telemetry
        </span>
      </div>
    );
  }

  // Strict authentication: unauthenticated users cannot access protected routes
  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children;
}
