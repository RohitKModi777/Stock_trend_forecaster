import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/brand/Logo';
import { useAuth } from '../context/AuthContext';

export default function EmailOtpPage() {
  const navigate = useNavigate();
  const { verifyEmailOtp, pendingEmail, resendCooldown, resendOtp, authError, clearError } = useAuth();

  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [verifying, setVerifying] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus first empty input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    // Only accept numeric digit
    const char = value.slice(-1);
    if (char && !/^\d$/.test(char)) return;

    const newDigits = [...otpDigits];
    newDigits[index] = char;
    setOtpDigits(newDigits);

    // Auto-advance
    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 digits entered
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
    const { data, error } = await verifyEmailOtp(token);
    setVerifying(false);
    if (!error && data?.session) {
      navigate('/overview');
    }
  };

  const displayEmail = pendingEmail
    ? pendingEmail.replace(/(.{2})(.*)(?=@)/, (_gp1, gp2, gp3) => gp2 + '*'.repeat(gp3.length))
    : 'analyst@fund.com';

  const formatSeconds = (sec) => {
    const s = sec < 10 ? `0${sec}` : sec;
    return `00:${s}`;
  };

  return (
    <main className="w-full min-h-screen bg-surface selection:bg-primary-container selection:text-on-primary-container">
      <div className="flex flex-col w-full">
        <div className="relative w-full flex items-center justify-center p-gutter md:p-space-2xl overflow-hidden min-h-[calc(100vh-4rem)]">
          {/* Ambient Structural Grid and Glow */}
          <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center">
            <div className="w-[720px] h-[720px] rounded-full bg-primary-container/10 blur-[130px]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
          </div>

          {/* Central Authentication Frame */}
          <div className="relative w-full max-w-[540px] flex flex-col items-center">
            {/* Institutional Top Telemetry Ribbon */}
            <div className="w-full flex items-center justify-between px-space-md py-space-xs bg-surface-container-low text-on-surface-variant rounded-t-lg shadow-sm border border-outline-variant/30">
              <div className="flex items-center gap-space-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                <span className="font-label-caps text-label-caps uppercase tracking-wider text-secondary">
                  AUTH_GATEWAY // PROD_NODE_04
                </span>
              </div>
              <div className="flex items-center gap-space-sm font-metric-sm text-metric-sm opacity-80">
                <span>TLS 1.3</span>
                <span>•</span>
                <span>256-BIT SHA</span>
              </div>
            </div>

            {/* Main Surface Container */}
            <div className="w-full bg-surface-container p-space-xl md:p-space-2xl rounded-b-lg shadow-xl flex flex-col items-center text-center border-x border-b border-outline-variant/30">
              {/* Brand Emblem */}
              <div className="relative mb-space-lg flex items-center justify-center">
                <div className="w-16 h-16 rounded-xl bg-surface-container-high flex items-center justify-center overflow-hidden p-1 shadow-md">
                  <Logo className="w-12 h-12" showText={false} />
                </div>
                <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 bg-surface-container-lowest text-primary rounded font-label-caps text-[9px] tracking-widest shadow-sm">
                  CALIB:99.8%
                </div>
              </div>

              {/* Headings */}
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mb-space-xs">
                Verify your email
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mb-space-xl">
                We've sent a 6-digit one-time authorization vector to:
                <span className="font-metric-md text-metric-md text-primary block mt-space-2xs bg-surface-container-lowest/60 py-space-2xs px-space-sm rounded">
                  {displayEmail}
                </span>
              </p>

              {/* Error Display */}
              {authError && (
                <div className="w-full max-w-[420px] mb-4 p-3 rounded bg-error-container/40 border border-error/30 text-error flex items-start gap-2 text-left">
                  <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">error</span>
                  <div className="flex-1 text-body-sm font-body-sm leading-tight">{authError}</div>
                  <button onClick={clearError} className="text-error/60 hover:text-error">
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </div>
              )}

              {/* 6 Discrete OTP Input Cells */}
              <div
                className="w-full flex items-center justify-between gap-space-xs sm:gap-space-sm mb-space-lg max-w-[420px]"
                onPaste={handlePaste}
              >
                {otpDigits.map((digit, idx) => (
                  <div
                    key={idx}
                    className={`relative flex-1 aspect-square max-w-[58px] rounded-lg flex items-center justify-center transition-all ${
                      digit
                        ? 'bg-surface-container-high ring-1 ring-primary/40'
                        : 'bg-surface-container-lowest shadow-inner'
                    }`}
                  >
                    <input
                      ref={(el) => (inputRefs.current[idx] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      className="w-full h-full text-center font-metric-display text-metric-display text-on-surface bg-transparent focus:outline-none selection:bg-transparent cursor-pointer"
                    />
                    {digit ? (
                      <span className="absolute bottom-1.5 w-3 h-0.5 bg-primary/60 rounded pointer-events-none"></span>
                    ) : (
                      <span className="absolute bottom-1.5 w-2.5 h-0.5 bg-outline-variant/60 rounded pointer-events-none"></span>
                    )}
                  </div>
                ))}
              </div>

              {/* Real-time Verification Telemetry Status */}
              <div className="w-full max-w-[420px] bg-surface-container-low rounded-lg p-space-sm mb-space-lg flex items-center justify-between border border-outline-variant/30">
                <div className="flex items-center gap-space-sm text-left">
                  {verifying ? (
                    <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  )}
                  <div className="flex flex-col">
                    <span className="font-label-caps text-label-caps text-primary tracking-wide">
                      {verifying ? 'STATE // VERIFYING' : 'STATE // READY'}
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface">
                      {verifying ? 'Verifying code vector...' : 'Enter 6-digit authorization code'}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end pl-space-sm">
                  <span className="font-label-caps text-label-caps text-on-surface-variant">TTL EXPIRES</span>
                  <div className="flex items-center gap-1 font-metric-md text-metric-md text-secondary">
                    <span className="material-symbols-outlined text-sm leading-none">timer</span>
                    <span>{formatSeconds(resendCooldown)}</span>
                  </div>
                </div>
              </div>

              {/* Submission Trigger */}
              <button
                onClick={() => handleVerify()}
                disabled={verifying || otpDigits.some((d) => d === '')}
                className="w-full max-w-[420px] h-10 bg-primary-container text-on-primary-container font-headline-sm text-headline-sm rounded-lg flex items-center justify-center gap-space-xs hover:bg-primary transition-colors shadow-md mb-space-md cursor-pointer disabled:opacity-50"
                type="button"
              >
                <span>Authorize Terminal Session</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>

              {/* Auxiliary Action Links */}
              <div className="w-full max-w-[420px] flex items-center justify-between pt-space-xs font-body-sm text-body-sm text-on-surface-variant">
                <button
                  onClick={() => navigate('/sign-in')}
                  className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-xs">edit</span>
                  <span>Change email</span>
                </button>

                <div className="flex items-center gap-space-xs">
                  {resendCooldown === 0 ? (
                    <button
                      onClick={resendOtp}
                      className="text-primary hover:underline font-metric-sm text-metric-sm cursor-pointer flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-xs">refresh</span>
                      <span>Resend code</span>
                    </button>
                  ) : (
                    <span className="font-metric-sm text-metric-sm text-outline">
                      Resend in {resendCooldown}s
                    </span>
                  )}
                  <span className="opacity-30">•</span>
                  <Link
                    to="/sign-in"
                    className="text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-xs">arrow_back</span>
                    <span>Back to sign in</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Security Institutional Protocol Footnote */}
            <div className="w-full mt-space-md p-space-md rounded-lg bg-surface-container-lowest/80 flex items-start gap-space-sm text-left border border-outline-variant/30">
              <span className="material-symbols-outlined text-outline-variant text-base mt-0.5">verified_user</span>
              <div className="flex flex-col">
                <span className="font-label-caps text-label-caps text-on-surface-variant tracking-wider uppercase mb-0.5">
                  Strict Cryptographic Policy
                </span>
                <p className="font-body-sm text-body-sm text-outline">
                  Never share your OTP with anyone. Multi-factor challenges expire strictly in 5 minutes. Institutional audit logged under IP 192.168.1.104.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
