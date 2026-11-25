import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/brand/Logo';
import { useAuth } from '../context/AuthContext';

export default function SignInPage() {
  const navigate = useNavigate();
  const { signInWithGoogle, sendEmailOtp, sendPhoneOtp, signInAsGuest, authError, clearError } = useAuth();

  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [phone, setPhone] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    clearError();
    setGoogleLoading(true);
    await signInWithGoogle();
    setGoogleLoading(false);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    clearError();
    setEmailLoading(true);
    const { error } = await sendEmailOtp(email);
    setEmailLoading(false);
    if (!error) {
      navigate('/verify-email-otp');
    }
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    if (!phone) return;
    clearError();
    setPhoneLoading(true);
    const fullPhone = `${countryCode}${phone.replace(/\D/g, '')}`;
    const { error } = await sendPhoneOtp(fullPhone);
    setPhoneLoading(false);
    if (!error) {
      navigate('/verify-phone-otp');
    }
  };

  return (
    <main className="w-full min-h-screen bg-surface selection:bg-primary-container selection:text-on-primary-container">
      <div className="flex flex-col w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen w-full bg-surface">
          {/* Left Column: Quantitative Dossier & Telemetry */}
          <div className="lg:col-span-6 flex flex-col justify-between p-8 lg:p-14 bg-surface-container-lowest relative overflow-hidden border-r border-surface-container-high/40">
            {/* Ambient subtle mathematical field */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary-container/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-10 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>

            {/* Header with Brand Emblem */}
            <div className="relative z-10 flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3">
                <Logo className="w-10 h-10" showText={false} />
                <div className="flex flex-col">
                  <span className="font-headline-md text-headline-md tracking-tight text-on-surface">
                    StockTrend<span className="text-primary-container">AI</span>
                  </span>
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">
                    Statistical Terminal v4.2
                  </span>
                </div>
              </Link>
              <div className="flex items-center gap-2 px-2.5 py-1 bg-surface-container rounded-DEFAULT">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="font-metric-sm text-metric-sm text-secondary">FEED: LIVE_99.98%</span>
              </div>
            </div>

            {/* Quantitative Research Motif & Hero Statement */}
            <div className="relative z-10 my-10 flex flex-col gap-6 max-w-xl">
              <div className="inline-flex items-center gap-2 self-start px-2 py-0.5 bg-surface-container rounded-DEFAULT font-label-caps text-label-caps text-primary tracking-wider">
                <span className="material-symbols-outlined text-[14px]">query_stats</span>
                QUANTITATIVE TELEMETRY
              </div>
              <h1 className="font-display-lg text-display-lg text-on-surface leading-tight font-bold tracking-tight">
                Forecast with <span className="text-primary-container">evidence</span>.
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Access calibrated next-day market forecasts, out-of-sample verification telemetry, and historical accuracy logs with expected probability bounds.
              </p>

              {/* Mini Interactive-Style Telemetry Divergence Card */}
              <div className="mt-4 p-5 bg-surface-container rounded-DEFAULT shadow-xl border border-outline-variant/30">
                <div className="flex items-center justify-between pb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-metric-md text-metric-md text-primary font-bold">SPX-REGIME // LOG-DIV</span>
                    <span className="font-metric-sm text-metric-sm px-2 py-0.5 rounded-DEFAULT bg-surface-container-high text-on-surface-variant">
                      T+1 HORIZON
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-metric-sm text-metric-sm">
                    <span className="text-on-surface-variant">
                      FIT ACC: <strong className="text-secondary font-medium">96.84%</strong>
                    </span>
                    <span className="text-on-surface-variant">
                      RESIDUAL: <strong className="text-primary font-medium">0.0014</strong>
                    </span>
                  </div>
                </div>

                {/* Inline Vector Divergence Chart */}
                <div className="relative w-full h-36 mt-2 bg-surface-container-lowest rounded-DEFAULT p-3 overflow-hidden flex flex-col justify-end">
                  <div className="absolute inset-0 flex flex-col justify-between p-2 pointer-events-none opacity-20">
                    <div className="w-full h-px bg-outline-variant"></div>
                    <div className="w-full h-px bg-outline-variant"></div>
                    <div className="w-full h-px bg-outline-variant"></div>
                  </div>
                  <svg className="w-full h-24 overflow-visible" preserveAspectRatio="none" viewBox="0 0 300 80">
                    <polygon
                      className="text-primary-container/15"
                      fill="currentColor"
                      points="0,55 30,50 60,42 90,48 120,38 150,30 180,35 210,25 240,28 270,18 300,12 300,32 270,36 240,46 210,48 180,56 150,52 120,58 90,66 60,60 30,68 0,72"
                    />
                    <polyline
                      className="text-on-surface-variant"
                      fill="none"
                      points="0,62 30,58 60,51 90,56 120,47 150,38 180,42 210,34 240,36 270,25 300,20"
                      stroke="currentColor"
                      strokeDasharray="2 3"
                      strokeWidth="1.5"
                    />
                    <polyline
                      className="text-primary-container"
                      fill="none"
                      points="0,64 30,59 60,49 90,54 120,44 150,37 180,41 210,31 240,33 270,23 300,18"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle className="text-secondary" cx="270" cy="23" fill="currentColor" r="3" />
                    <circle className="text-primary-container" cx="300" cy="18" fill="currentColor" r="3" />
                  </svg>
                  <div className="relative z-10 flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                      <span className="font-metric-sm text-metric-sm text-secondary">ACTUAL DELTA +1.18%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                      <span className="font-metric-sm text-metric-sm text-primary">NEXT-DAY FORECAST +1.22%</span>
                    </div>
                    <span className="font-label-caps text-label-caps text-on-surface-variant tracking-wider">
                      CONF: 99.2% σ
                    </span>
                  </div>
                </div>

                {/* Bottom Micro Specs */}
                <div className="grid grid-cols-3 gap-2 mt-3 pt-3">
                  <div className="bg-surface-container-high p-2 rounded-DEFAULT">
                    <div className="font-label-caps text-label-caps text-on-surface-variant">FORECAST HORIZON</div>
                    <div className="font-metric-sm text-metric-sm text-on-surface font-semibold mt-0.5">NEXT-DAY T+1</div>
                  </div>
                  <div className="bg-surface-container-high p-2 rounded-DEFAULT">
                    <div className="font-label-caps text-label-caps text-on-surface-variant">LATENCY REGIME</div>
                    <div className="font-metric-sm text-metric-sm text-secondary font-semibold mt-0.5">8.2ms REALTIME</div>
                  </div>
                  <div className="bg-surface-container-high p-2 rounded-DEFAULT">
                    <div className="font-label-caps text-label-caps text-on-surface-variant">OUT-OF-SAMPLE</div>
                    <div className="font-metric-sm text-metric-sm text-primary font-semibold mt-0.5">VERIFIED // PASS</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Left Column Institutional Metadata Footer */}
            <div className="relative z-10 flex items-center justify-between text-on-surface-variant">
              <span className="font-metric-sm text-metric-sm">TERMINAL PROTOCOL // ID: 884-X9F</span>
              <div className="flex items-center gap-4 font-label-caps text-label-caps">
                <span>SOC-2 TYPE II</span>
                <span>•</span>
                <span>ISO 27001 COMPLIANT</span>
              </div>
            </div>
          </div>

          {/* Right Column: Supabase Authentication Desk */}
          <div className="lg:col-span-6 flex flex-col justify-center items-center p-6 sm:p-10 lg:p-16 bg-surface relative">
            <div className="w-full max-w-md bg-surface-container-low rounded-DEFAULT p-8 shadow-2xl relative border border-outline-variant/30">
              {/* Authentication Card Header */}
              <div className="flex flex-col gap-1 mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">lock</span>
                  <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">
                    Institutional Gateway
                  </span>
                </div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
                  Welcome back
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Sign in to access your quantitative research desk
                </p>
              </div>

              {/* Error Toast */}
              {authError && (
                <div className="mb-4 p-3 rounded bg-error-container/40 border border-error/30 text-error flex items-start gap-2">
                  <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">error</span>
                  <div className="flex-1 text-body-sm font-body-sm leading-tight">{authError}</div>
                  <button onClick={clearError} className="text-error/60 hover:text-error">
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </div>
              )}

              {/* Google OAuth Provider Trigger */}
              <button
                onClick={handleGoogleSignIn}
                disabled={googleLoading}
                className="w-full flex items-center justify-center gap-3 h-10 px-4 rounded-DEFAULT bg-surface-container-high hover:bg-surface-container-highest transition duration-150 text-on-surface font-body-md text-body-md shadow-sm cursor-pointer disabled:opacity-50"
                type="button"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.2 8.9 5 12 5z" fill="#EA4335" />
                  <path d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z" fill="#4285F4" />
                  <path d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.4s.2-1.7.4-2.4L1.6 7c-.8 1.6-1.3 3.4-1.3 5.3s.5 3.7 1.3 5.3l3.7-2.9z" fill="#FBBC05" />
                  <path d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.2-6.7-5.3L1.6 16C3.5 19.8 7.4 23 12 23z" fill="#34A853" />
                </svg>
                <span className="font-medium text-on-surface">
                  {googleLoading ? 'Redirecting to Google...' : 'Continue with Google'}
                </span>
              </button>

              {/* Instant Demo Access Button */}
              <button
                onClick={() => {
                  signInAsGuest();
                  navigate('/overview');
                }}
                className="w-full flex items-center justify-center gap-2 h-10 px-4 rounded-DEFAULT bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary font-body-md text-body-md font-semibold transition duration-150 cursor-pointer mt-3"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">terminal</span>
                <span>Launch Demo Terminal (Instant Access)</span>
              </button>

              {/* Visual Partition Divider 1 */}
              <div className="relative my-6 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-px bg-surface-container-highest"></div>
                </div>
                <span className="relative px-3 bg-surface-container-low font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                  OR
                </span>
              </div>

              {/* Form 1: Email Passwordless OTP */}
              <form className="flex flex-col gap-2.5" onSubmit={handleEmailSubmit}>
                <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider" htmlFor="email-input">
                  Institutional or Personal Email
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[16px]">
                      alternate_email
                    </span>
                    <input
                      className="w-full h-9 pl-9 pr-3 bg-surface-container-lowest text-on-surface font-metric-md text-metric-md rounded-DEFAULT focus:outline-none focus:bg-surface-container transition-colors placeholder:text-on-surface-variant/40 border border-outline-variant/30"
                      id="email-input"
                      placeholder="quant@firm.com"
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <button
                    className="h-9 px-4 rounded-DEFAULT bg-primary-container hover:bg-primary text-on-primary-container font-metric-md text-metric-md font-semibold transition duration-150 flex items-center gap-1.5 shrink-0 cursor-pointer disabled:opacity-50"
                    type="submit"
                    disabled={emailLoading}
                  >
                    <span>{emailLoading ? 'Sending...' : 'Send OTP'}</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </form>

              {/* Visual Partition Divider 2 */}
              <div className="relative my-6 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-px bg-surface-container-highest"></div>
                </div>
                <span className="relative px-3 bg-surface-container-low font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                  OR
                </span>
              </div>

              {/* Form 2: Mobile SMS Telemetry OTP */}
              <form className="flex flex-col gap-2.5" onSubmit={handlePhoneSubmit}>
                <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider" htmlFor="phone-input">
                  Direct Mobile Telemetry
                </label>
                <div className="flex gap-2">
                  <div className="relative shrink-0 w-24">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="w-full h-9 pl-2.5 pr-6 bg-surface-container-lowest text-on-surface font-metric-md text-metric-md rounded-DEFAULT focus:outline-none appearance-none cursor-pointer border border-outline-variant/30"
                    >
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+65">🇸🇬 +65</option>
                      <option value="+49">🇩🇪 +49</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-1.5 top-2.5 text-on-surface-variant pointer-events-none text-[16px]">
                      expand_more
                    </span>
                  </div>
                  <div className="relative flex-1">
                    <input
                      className="w-full h-9 px-3 bg-surface-container-lowest text-on-surface font-metric-md text-metric-md rounded-DEFAULT focus:outline-none focus:bg-surface-container transition-colors placeholder:text-on-surface-variant/40 border border-outline-variant/30"
                      id="phone-input"
                      placeholder="555 019 2834"
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <button
                    className="h-9 px-4 rounded-DEFAULT bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-metric-md text-metric-md font-semibold transition duration-150 flex items-center gap-1.5 shrink-0 cursor-pointer disabled:opacity-50"
                    type="submit"
                    disabled={phoneLoading}
                  >
                    <span>{phoneLoading ? 'Sending...' : 'Send OTP'}</span>
                  </button>
                </div>
              </form>

              {/* Institutional Footer Navigation */}
              <div className="mt-8 pt-6 flex flex-col gap-4 text-center">
                <div className="font-body-sm text-body-sm text-on-surface-variant">
                  Don't have an account?{' '}
                  <Link to="/sign-up" className="text-primary-container hover:text-primary font-medium transition-colors ml-1">
                    Create account
                  </Link>
                </div>
                <div className="inline-flex items-center justify-center gap-2 py-1.5 px-3 bg-surface-container rounded-DEFAULT self-center">
                  <span className="material-symbols-outlined text-[14px] text-secondary">verified_user</span>
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                    Protected by 256-bit encryption
                  </span>
                </div>
              </div>
            </div>

            {/* Institutional Disclaimer Footer */}
            <div className="mt-6 flex items-center gap-6 text-on-surface-variant font-label-caps text-label-caps">
              <a className="hover:text-on-surface transition-colors" href="#terms">TERMS OF EXECUTION</a>
              <span>//</span>
              <a className="hover:text-on-surface transition-colors" href="#privacy">REGULATORY DISCLOSURE</a>
              <span>//</span>
              <a className="hover:text-on-surface transition-colors" href="#telemetry">API STATUS</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
