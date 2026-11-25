import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/brand/Logo';
import { useAuth } from '../context/AuthContext';

export default function PhoneOtpPage() {
  const navigate = useNavigate();
  const { verifyPhoneOtp, pendingPhone, resendCooldown, resendOtp, authError, clearError } = useAuth();

  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [verifying, setVerifying] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    const char = value.slice(-1);
    if (char && !/^\d$/.test(char)) return;

    const newDigits = [...otpDigits];
    newDigits[index] = char;
    setOtpDigits(newDigits);

    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (char && index === 5 && newDigits.every((d) => d !== '')) {
      handleVerify(newDigits.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pasteData)) {
      const digits = pasteData.split('');
      setOtpDigits(digits);
      handleVerify(pasteData);
    }
  };

  const handleVerify = async (tokenToVerify) => {
    const token = tokenToVerify || otpDigits.join('');
    if (token.length !== 6) return;

    clearError();
    setVerifying(true);
    const { data, error } = await verifyPhoneOtp(token);
    setVerifying(false);
    if (!error && data?.session) {
      navigate('/overview');
    }
  };

  const displayPhone = pendingPhone
    ? pendingPhone.replace(/(\+\d{1,3})(\d+)(\d{4})/, (_m, p1, p2, p3) => `${p1} ${'*'.repeat(p2.length)}${p3}`)
    : '+1 ******2834';

  const formatSeconds = (sec) => {
    const s = sec < 10 ? `0${sec}` : sec;
    return `00:${s}`;
  };

  return (
    <main className="w-full min-h-screen bg-surface selection:bg-primary-container selection:text-on-primary-container">
      <div className="flex flex-col w-full items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8 relative">
        {/* Quantitative Ambient Topology Grid Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 flex items-center justify-center">
          <svg className="w-full h-full max-w-[1600px] text-surface-container-high" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern height="48" id="quant-grid" patternUnits="userSpaceOnUse" width="48">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="0.5"></path>
                <circle cx="48" cy="48" fill="currentColor" fillOpacity="0.4" r="0.75"></circle>
              </pattern>
            </defs>
            <rect fill="url(#quant-grid)" height="100%" width="100%"></rect>
          </svg>
        </div>

        {/* Subtle Radial Glow */}
        <div className="absolute w-[580px] h-[580px] bg-primary/5 rounded-full blur-3xl pointer-events-none -top-12"></div>

        {/* Terminal Status Meta Ribbon */}
        <div className="w-full max-w-[512px] mb-3 flex items-center justify-between px-2 text-on-surface-variant font-label-caps text-label-caps tracking-widest uppercase">
          <span className="flex items-center gap-1.5 text-secondary">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block animate-pulse"></span>
            SEC_GATE // 2FA_CHALLENGE
          </span>
          <span className="font-metric-sm text-metric-sm text-outline">SESSION_ID: #8F9A-402D</span>
        </div>

        {/* Main Terminal Card Container */}
        <div className="w-full max-w-[512px] bg-surface-container-low rounded-xl shadow-2xl p-8 relative flex flex-col gap-6 border border-outline-variant/30">
          {/* Card Brand & Diagnostic Header */}
          <div className="flex flex-col items-center text-center gap-3">
            <div className="relative flex items-center justify-center mb-1">
              <div className="w-14 h-14 rounded-lg bg-surface-container p-2 flex items-center justify-center shadow-md">
                <Logo className="w-10 h-10" showText={false} />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                Verify your phone number
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mx-auto">
                We've sent a 6-digit SMS verification code to:<br />
                <span className="font-metric-md text-metric-md text-primary tracking-normal font-semibold inline-flex items-center gap-1 mt-0.5">
                  {displayPhone}
                  <span className="material-symbols-outlined text-[15px] text-secondary" title="Encrypted Destination">
                    verified_user
                  </span>
                </span>
              </p>
            </div>
          </div>

          {/* Error Display */}
          {authError && (
            <div className="p-3 rounded bg-error-container/40 border border-error/30 text-error flex items-start gap-2">
              <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">error</span>
              <div className="flex-1 text-body-sm font-body-sm leading-tight">{authError}</div>
              <button onClick={clearError} className="text-error/60 hover:text-error">
                <span className="material-symbols-outlined text-[14px]">close</span>
              </button>
            </div>
          )}

          {/* OTP Input Form Structure */}
          <div className="flex flex-col gap-5 mt-2">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                  Passcode Vector [6-Digit]
                </label>
                <span className="font-metric-sm text-metric-sm text-outline flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px] text-secondary">lock</span> TLS 1.3
                </span>
              </div>

              {/* 6-Box Grid */}
              <div className="grid grid-cols-6 gap-2.5 sm:gap-3" onPaste={handlePaste}>
                {otpDigits.map((digit, idx) => (
                  <div key={idx} className="relative flex items-center justify-center">
                    <input
                      ref={(el) => (inputRefs.current[idx] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      className={`w-full h-14 sm:h-16 text-center font-metric-display text-metric-display rounded-lg focus:outline-none transition-all selection:bg-transparent cursor-pointer border ${
                        digit
                          ? 'bg-surface-container-high text-on-surface border-primary/50 ring-1 ring-primary/40'
                          : 'bg-surface-container-lowest text-on-surface border-outline-variant/30'
                      }`}
                    />
                    <div className="absolute bottom-1.5 w-4 h-0.5 bg-primary/60 rounded-full pointer-events-none"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action State: Primary Verify Action */}
            <button
              onClick={() => handleVerify()}
              disabled={verifying || otpDigits.some((d) => d === '')}
              className="relative group w-full h-11 bg-primary-container hover:bg-primary text-on-primary-container rounded-lg font-headline-sm text-headline-sm font-semibold flex items-center justify-center transition-all shadow-md active:scale-[0.99] overflow-hidden cursor-pointer disabled:opacity-50"
              type="button"
            >
              <span className="flex items-center gap-2">
                {verifying && (
                  <svg className="animate-spin h-4 w-4 text-on-primary-container" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"></path>
                  </svg>
                )}
                <span>{verifying ? 'Verifying Code...' : 'Verify & Sign In'}</span>
              </span>
            </button>

            {/* Sub-controls Partition Layer */}
            <div className="flex flex-col items-center gap-3 pt-2 text-center">
              <div className="flex items-center gap-1.5 font-body-sm text-body-sm text-on-surface-variant">
                <span>Didn't receive SMS?</span>
                {resendCooldown === 0 ? (
                  <button
                    onClick={resendOtp}
                    className="text-primary hover:underline font-metric-sm text-metric-sm font-bold cursor-pointer"
                  >
                    Resend OTP now
                  </button>
                ) : (
                  <span className="text-on-surface font-metric-sm text-metric-sm font-medium">
                    Resend OTP in <span className="text-primary font-bold">{formatSeconds(resendCooldown)}</span>
                  </span>
                )}
              </div>

              <div className="flex items-center justify-center gap-4 text-body-sm font-body-sm pt-1">
                <button
                  onClick={() => navigate('/sign-in')}
                  className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 hover:underline underline-offset-4 cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[15px]">edit</span>
                  <span>Change phone number</span>
                </button>
                <span className="text-surface-container-highest">•</span>
                <Link
                  to="/verify-email-otp"
                  className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 hover:underline underline-offset-4"
                >
                  <span className="material-symbols-outlined text-[15px]">mail</span>
                  <span>Use email verification instead</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Security & Institutional Terminal Footer Badge */}
          <div className="mt-2 pt-4 bg-surface-container rounded-lg px-4 py-3 flex items-center justify-between border border-outline-variant/30">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-secondary">security</span>
              <span className="font-label-caps text-label-caps text-on-surface-variant">
                SMS verification powered by Supabase Auth
              </span>
            </div>
            <div className="flex items-center gap-1 text-outline font-metric-sm text-metric-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block"></span>
              <span>LATENCY: 42ms</span>
            </div>
          </div>
        </div>

        {/* Bottom Institutional Metadata Ribbon */}
        <div className="w-full max-w-[512px] mt-4 flex items-center justify-between px-2 text-outline font-metric-sm text-metric-sm">
          <span>SECURE PROTOCOL // 2FA</span>
          <span>SHA-256 ENCRYPTED</span>
        </div>
      </div>
    </main>
  );
}
