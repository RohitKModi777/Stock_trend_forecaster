import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // OTP Target state for verification screens
  const [pendingEmail, setPendingEmail] = useState(() => sessionStorage.getItem('st_pending_email') || '');
  const [pendingPhone, setPendingPhone] = useState(() => sessionStorage.getItem('st_pending_phone') || '');

  // OTP Resend cooldown timers
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Initial session check and event listener
  useEffect(() => {
    if (sessionStorage.getItem('st_demo_session') === 'true') {
      const demoUser = {
        id: 'demo-analyst-id',
        email: 'demo.analyst@stocktrend.ai',
        user_metadata: { full_name: 'Demo Quantitative Analyst' },
        aud: 'authenticated',
        role: 'authenticated'
      };
      setUser(demoUser);
      setSession({ user: demoUser, access_token: 'demo-token' });
      setLoading(false);
      return;
    }

    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    // 1. Fetch initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Session retrieval error:', error);
      }
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const clearError = () => setAuthError(null);

  // Google OAuth
  const signInWithGoogle = async () => {
    setAuthError(null);
    if (!isSupabaseConfigured) {
      setAuthError('Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.');
      return { error: new Error('Supabase not configured') };
    }
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/overview`,
        },
      });
      if (error) throw error;
      return { data };
    } catch (err) {
      setAuthError(err.message || 'Google OAuth failed');
      return { error: err };
    }
  };

  // Send Email OTP
  const sendEmailOtp = async (email) => {
    setAuthError(null);
    if (!isSupabaseConfigured) {
      setAuthError('Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.');
      return { error: new Error('Supabase not configured') };
    }
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: `${window.location.origin}/overview`,
        },
      });
      if (error) throw error;
      setPendingEmail(email);
      sessionStorage.setItem('st_pending_email', email);
      setResendCooldown(60);
      return { data };
    } catch (err) {
      setAuthError(err.message || 'Failed to send Email OTP');
      return { error: err };
    }
  };

  // Verify Email OTP
  const verifyEmailOtp = async (token) => {
    setAuthError(null);
    if (!pendingEmail) {
      const err = new Error('No pending email found for verification.');
      setAuthError(err.message);
      return { error: err };
    }
    if (!isSupabaseConfigured) {
      setAuthError('Supabase is not configured. Please check your .env configuration.');
      return { error: new Error('Supabase not configured') };
    }
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: pendingEmail,
        token: token.trim(),
        type: 'email',
      });
      if (error) throw error;
      sessionStorage.removeItem('st_pending_email');
      setPendingEmail('');
      return { data };
    } catch (err) {
      setAuthError(err.message || 'Invalid or expired OTP token.');
      return { error: err };
    }
  };

  // Send Phone SMS OTP
  const sendPhoneOtp = async (phone) => {
    setAuthError(null);
    if (!isSupabaseConfigured) {
      setAuthError('Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.');
      return { error: new Error('Supabase not configured') };
    }
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        phone,
        options: {
          channel: 'sms',
        },
      });
      if (error) throw error;
      setPendingPhone(phone);
      sessionStorage.setItem('st_pending_phone', phone);
      setResendCooldown(60);
      return { data };
    } catch (err) {
      setAuthError(err.message || 'Failed to send Phone SMS OTP');
      return { error: err };
    }
  };

  // Verify Phone SMS OTP
  const verifyPhoneOtp = async (token) => {
    setAuthError(null);
    if (!pendingPhone) {
      const err = new Error('No pending phone number found for verification.');
      setAuthError(err.message);
      return { error: err };
    }
    if (!isSupabaseConfigured) {
      setAuthError('Supabase is not configured. Please check your .env configuration.');
      return { error: new Error('Supabase not configured') };
    }
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: pendingPhone,
        token: token.trim(),
        type: 'sms',
      });
      if (error) throw error;
      sessionStorage.removeItem('st_pending_phone');
      setPendingPhone('');
      return { data };
    } catch (err) {
      setAuthError(err.message || 'Invalid or expired SMS verification code.');
      return { error: err };
    }
  };

  // Resend OTP
  const resendOtp = async () => {
    if (resendCooldown > 0) return;
    if (pendingEmail) {
      return sendEmailOtp(pendingEmail);
    }
    if (pendingPhone) {
      return sendPhoneOtp(pendingPhone);
    }
  };

  // Guest / Demo Sign In
  const signInAsGuest = () => {
    setAuthError(null);
    const demoUser = {
      id: 'demo-analyst-id',
      email: 'demo.analyst@stocktrend.ai',
      user_metadata: { full_name: 'Demo Quantitative Analyst' },
      aud: 'authenticated',
      role: 'authenticated'
    };
    setUser(demoUser);
    setSession({ user: demoUser, access_token: 'demo-token' });
    sessionStorage.setItem('st_demo_session', 'true');
    return { data: { user: demoUser } };
  };

  // Sign Out
  const signOut = async () => {
    setAuthError(null);
    sessionStorage.removeItem('st_demo_session');
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        authError,
        clearError,
        isConfigured: isSupabaseConfigured,
        pendingEmail,
        setPendingEmail,
        pendingPhone,
        setPendingPhone,
        resendCooldown,
        signInWithGoogle,
        sendEmailOtp,
        verifyEmailOtp,
        sendPhoneOtp,
        verifyPhoneOtp,
        resendOtp,
        signInAsGuest,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
