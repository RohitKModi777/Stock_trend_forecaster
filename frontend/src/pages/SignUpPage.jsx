import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/brand/Logo';
import { useAuth } from '../context/AuthContext';

export default function SignUpPage() {
  const navigate = useNavigate();
  const { signInWithGoogle, sendEmailOtp, sendPhoneOtp, authError, clearError } = useAuth();

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleSignUp = async () => {
    clearError();
    setGoogleLoading(true);
    await signInWithGoogle();
    setGoogleLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email && !phone) {
      alert('Please provide either an email or a phone number.');
      return;
    }
    if (!agreed) {
      alert('Please agree to terms and regulatory disclosure.');
      return;
    }
    clearError();
    setLoading(true);

    if (email) {
      const { error } = await sendEmailOtp(email);
      setLoading(false);
      if (!error) {
        navigate('/verify-email-otp');
      }
    } else if (phone) {
      const fullPhone = phone.startsWith('+') ? phone : `+1${phone.replace(/\D/g, '')}`;
      const { error } = await sendPhoneOtp(fullPhone);
      setLoading(false);
      if (!error) {
        navigate('/verify-phone-otp');
      }
    }
  };

  return (
    <main className="w-full min-h-screen bg-surface selection:bg-primary-container selection:text-on-primary-container">
      <div className="flex flex-col w-full">
        <div className="relative w-full min-h-[calc(100vh-2rem)] flex flex-col justify-center px-4 py-8 lg:px-12 lg:py-12">
          {/* Ambient Precision Glows */}
          <div className="absolute top-1/4 left-1/12 w-96 h-96 rounded-full bg-primary-container/5 blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-1/12 w-96 h-96 rounded-full bg-secondary/5 blur-[120px] pointer-events-none"></div>

          <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left 50% Narrative Column */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-8 pr-0 lg:pr-8">
              {/* Brand Unit */}
              <div className="flex flex-col space-y-4">
                <Link to="/" className="flex items-center space-x-3.5">
                  <Logo className="w-10 h-10" showText={false} />
                  <div className="flex flex-col">
                    <div className="flex items-center space-x-2">
                      <span className="font-headline-md text-headline-md tracking-tight text-on-surface font-semibold">
                        StockTrend AI
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-primary font-label-caps text-label-caps">
                        v4.2-PROD
                      </span>
                    </div>
                    <span className="font-metric-sm text-metric-sm text-on-surface-variant uppercase tracking-wider">
                      Empirical Research Terminal
                    </span>
                  </div>
                </Link>

                <div className="pt-4">
                  <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-surface-container-low text-secondary font-metric-sm text-metric-sm mb-3 border border-outline-variant/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                    <span>CALIBRATION SUITE: ACTIVE</span>
                    <span className="text-on-surface-variant font-label-caps text-label-caps">| AUDIT P-VAL &lt; 0.001</span>
                  </div>
                  <h1 className="font-display-lg text-display-lg text-on-surface max-w-xl font-bold tracking-tight leading-tight">
                    Institutional next-day forecasting, empirically validated.
                  </h1>
                  <p className="mt-3 font-body-lg text-body-lg text-on-surface-variant max-w-lg leading-relaxed">
                    Eliminate statistical drift and retail noise. Deploy calibrated next-day forecast corridors with verifiable historical validation logs.
                  </p>
                </div>
              </div>

              {/* Key Bullet Points */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start space-x-3.5 group">
                  <div className="mt-0.5 w-5 h-5 rounded bg-surface-container-high flex items-center justify-center flex-shrink-0 text-secondary">
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-medium">
                      Next-day price targets with mathematical uncertainty bounds
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      Expected range corridors (1σ, 2σ) computed from empirical historical volatility distributions.
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 group">
                  <div className="mt-0.5 w-5 h-5 rounded bg-surface-container-high flex items-center justify-center flex-shrink-0 text-secondary">
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-medium">
                      Complete out-of-sample historical accuracy auditing
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      Every projection immutably timestamped on market-close data feeds with open log files.
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 group">
                  <div className="mt-0.5 w-5 h-5 rounded bg-surface-container-high flex items-center justify-center flex-shrink-0 text-secondary">
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-medium">
                      Real-time macroeconomic & sector regime classification
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      Dynamic macro context factoring sovereign spreads, yield curves, and market volatility structure.
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 group">
                  <div className="mt-0.5 w-5 h-5 rounded bg-surface-container-high flex items-center justify-center flex-shrink-0 text-secondary">
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-medium">
                      Strict transparency: zero hidden black-box promises or inflated claims
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      Transparent market context metrics exposed for every market driver and signal vector.
                    </span>
                  </div>
                </div>
              </div>

              {/* Inline Telemetry Ribbon */}
              <div className="p-4 rounded-xl bg-surface-container-low shadow-sm border border-outline-variant/30">
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Walk-Forward Accuracy</span>
                    <span className="font-metric-display text-metric-display text-primary mt-1">68.4%</span>
                    <span className="font-metric-sm text-metric-sm text-secondary mt-0.5">+4.1% vs S&P 500 benchmark</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Mean Calib Error</span>
                    <span className="font-metric-display text-metric-display text-on-surface mt-1">0.042</span>
                    <span className="font-metric-sm text-metric-sm text-on-surface-variant mt-0.5">Reliability score: 95.8%</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Tick Latency</span>
                    <span className="font-metric-display text-metric-display text-secondary-fixed mt-1">14ms</span>
                    <span className="font-metric-sm text-metric-sm text-on-surface-variant mt-0.5">L2 direct exchange pipe</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 50% Auth Card Column */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <div className="w-full max-w-xl rounded-xl bg-surface-container shadow-xl p-6 sm:p-8 flex flex-col space-y-6 border border-outline-variant/30">
                <div className="flex flex-col space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">
                      REGISTRATION CONSOLE
                    </span>
                    <span className="font-metric-sm text-metric-sm text-secondary flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-secondary"></span>
                      <span>SECURE ENCLAVE ACTIVE</span>
                    </span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
                    Create your StockTrend AI account
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Start researching market forecasts with verified track records
                  </p>
                </div>

                {authError && (
                  <div className="p-3 rounded bg-error-container/40 border border-error/30 text-error flex items-start gap-2">
                    <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">error</span>
                    <div className="flex-1 text-body-sm font-body-sm leading-tight">{authError}</div>
                    <button onClick={clearError} className="text-error/60 hover:text-error">
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </div>
                )}

                {/* OAuth Action */}
                <button
                  onClick={handleGoogleSignUp}
                  disabled={googleLoading}
                  className="w-full h-11 px-4 rounded bg-surface-container-high hover:bg-surface-container-highest transition-colors flex items-center justify-center space-x-3 text-on-surface font-body-md text-body-md font-medium group shadow-sm cursor-pointer disabled:opacity-50"
                  type="button"
                >
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                    <path d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.4 8.8 5 12 5z" fill="#EA4335" />
                    <path d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z" fill="#4285F4" />
                    <path d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.7s.1-2 .4-2.7L1.6 6.4C.6 8.3 0 10.6 0 12s.6 3.7 1.6 5.6l3.7-2.9z" fill="#FBBC05" />
                    <path d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.2 0-5.8-2.4-6.7-5.3L1.6 16C3.5 19.7 7.4 23 12 23z" fill="#34A853" />
                  </svg>
                  <span>{googleLoading ? 'Redirecting to Google...' : 'Continue with Google'}</span>
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant group-hover:translate-x-0.5 transition-transform">
                    arrow_forward
                  </span>
                </button>

                <div className="relative flex items-center justify-center py-1">
                  <div className="w-full h-[1px] bg-surface-container-highest"></div>
                  <span className="absolute px-3 bg-surface-container font-label-caps text-label-caps text-outline uppercase tracking-wider">
                    OR
                  </span>
                </div>

                {/* Registration Form */}
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                  <div className="flex flex-col space-y-1">
                    <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider" htmlFor="email-input">
                      Work Email
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                        <span className="material-symbols-outlined text-[18px]">mail</span>
                      </span>
                      <input
                        className="w-full h-10 pl-9 pr-3 rounded bg-surface-container-lowest text-on-surface font-body-md text-body-md placeholder-outline focus:outline-none focus:ring-1 focus:ring-primary transition-all border border-outline-variant/30"
                        id="email-input"
                        placeholder="analyst@fund.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider" htmlFor="phone-input">
                      Phone Number (For 2FA Telemetry)
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                        <span className="material-symbols-outlined text-[18px]">phone</span>
                      </span>
                      <input
                        className="w-full h-10 pl-9 pr-3 rounded bg-surface-container-lowest text-on-surface font-body-md text-body-md placeholder-outline focus:outline-none focus:ring-1 focus:ring-primary transition-all border border-outline-variant/30"
                        id="phone-input"
                        placeholder="+1 (555) 019-2834"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Disclaimer Checkbox */}
                  <div className="flex items-start space-x-2 pt-1">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded bg-surface-container-lowest border-outline-variant/60 text-primary-container focus:ring-0 cursor-pointer"
                    />
                    <label htmlFor="terms" className="text-body-sm font-body-sm text-on-surface-variant leading-tight cursor-pointer">
                      I understand that StockTrend AI outputs empirical probabilistic forecasts, not financial advice, and agree to the Terms of Service.
                    </label>
                  </div>

                  <button
                    className="w-full h-11 rounded bg-primary-container text-on-primary-container hover:bg-primary font-headline-sm text-headline-sm font-semibold transition-colors flex items-center justify-center space-x-1.5 flex-shrink-0 cursor-pointer disabled:opacity-50"
                    type="submit"
                    disabled={loading}
                  >
                    <span>{loading ? 'Dispatching OTP...' : 'Send OTP Vector'}</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </form>

                <div className="text-center font-body-sm text-body-sm text-on-surface-variant pt-2">
                  Already have an account?{' '}
                  <Link to="/sign-in" className="text-primary-container hover:text-primary font-medium transition-colors ml-1">
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
