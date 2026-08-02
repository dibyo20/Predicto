import { Link } from "react-router-dom";
import "../styles/Home.scss";

// SVG Icon Definitions
const FaceScannerLogo = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    width="24"
    height="24"
    className="logo-svg"
  >
    <path d="M4 8V4h4M16 4h4v4M4 16v4h4M16 20h4v-4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 10a1 1 0 1 0 2 0m2 0a1 1 0 1 0 2 0" strokeLinecap="round" />
    <path d="M12 12v2m-3 2s1.5 1.5 3 1.5 3-1.5 3-1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="7" strokeDasharray="3 3" />
  </svg>
);

const EmotionIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    width="24"
    height="24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm6 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Z" />
  </svg>
);

const PlaylistIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    width="24"
    height="24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 0v5.25m0-5.25L9 12M9 12v5.25m0-5.25L19.5 9M9 17.25a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm10.5-3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
  </svg>
);

const SecureIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    width="24"
    height="24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

const LoginStepIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    width="24"
    height="24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
  </svg>
);

const CameraStepIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    width="24"
    height="24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316A2.192 2.192 0 0 0 14.502 4h-5c-.7 0-1.363.336-1.814.908l-.861 1.267Z" />
    <circle cx="12" cy="13" r="3" />
  </svg>
);

const BrainStepIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    width="24"
    height="24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21m0 0l-.813-5.096M9 21h7.5c.621 0 1.2-.252 1.62-.659m-1.12-2.341A4.488 4.488 0 0 1 22.5 13.5c0-2.485-2.015-4.5-4.5-4.5h-1.35c-.715-1.5-2.222-2.5-3.975-2.5A6.003 6.003 0 0 0 6.75 12c0 .856.18 1.671.502 2.408" />
  </svg>
);

const EnjoyStepIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    width="24"
    height="24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2Zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2ZM9 10l12-3" />
  </svg>
);

export default function Home() {
  return (
    <div className="home-page">
      {/* Background visual components */}
      <div className="home-page__bg" aria-hidden="true">
        <div className="orb orb--1" />
        <div className="orb orb--2" />
        <div className="grid-overlay" />
      </div>

      {/* Header Navigation Section */}
      <header className="home-navbar">
        <div className="home-navbar__container">
          <div className="home-navbar__brand">
            {FaceScannerLogo}
            <span className="home-navbar__brand-name">Predicto</span>
          </div>
          <nav className="home-navbar__menu">
            <Link to="/login" className="home-navbar__link">
              Login
            </Link>
            <Link to="/register" className="home-navbar__btn">
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Split Section */}
      <section className="home-hero">
        <div className="home-hero__container">
          <div className="home-hero__content">
            <div className="home-hero__badge">
              <span className="badge-spark">✨</span> NOW IN PUBLIC BETA
            </div>
            <h1 className="home-hero__title">
              Your Mood.<br />Your Music.
            </h1>
            <p className="home-hero__description">
              Experience the world's first emotion-adaptive AI music engine.
              Predicto analyzes your facial expressions in real-time to curate the
              perfect atmospheric soundscape for your current state of mind.
            </p>
            <Link to="/predict" className="home-hero__cta-btn">
              Try Now
            </Link>
          </div>

          {/* Right Hero Panel: Interactive Face/Music Waves Graphic */}
          <div className="home-hero__visual">
            <div className="hero-animation-container">
              {/* Glass window representing the AI interface */}
              <div className="ai-window">
                <div className="ai-window__header">
                  <span className="dot dot--red" />
                  <span className="dot dot--yellow" />
                  <span className="dot dot--green" />
                </div>
                <div className="ai-window__body">
                  {/* Face scanning visual graphic */}
                  <div className="ai-face-scanner">
                    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1" className="face-mesh">
                      <path d="M50 20c-15 0-25 15-25 30s10 25 25 30c15-5 25-15 25-30s-10-30-25-30z" strokeDasharray="2 2" strokeOpacity="0.5" />
                      {/* Grid tracking facial mapping */}
                      <path d="M25 50h50M50 20v60" strokeOpacity="0.3" />
                      <circle cx="50" cy="50" r="25" strokeDasharray="3 3" strokeOpacity="0.4" />
                      {/* Interactive face scanner tracking indices */}
                      <circle cx="50" cy="50" r="1.5" fill="#a78bfa" className="glowing-node node--nose" />
                      <circle cx="40" cy="42" r="1.5" fill="#a78bfa" className="glowing-node node--eye-l" />
                      <circle cx="60" cy="42" r="1.5" fill="#a78bfa" className="glowing-node node--eye-r" />
                      <circle cx="50" cy="65" r="1.5" fill="#a78bfa" className="glowing-node node--mouth" />
                      <circle cx="33" cy="50" r="1.5" fill="#a78bfa" className="glowing-node node--cheek-l" />
                      <circle cx="67" cy="50" r="1.5" fill="#a78bfa" className="glowing-node node--cheek-r" />
                    </svg>
                    <div className="scanning-beam" />
                    <span className="window-tag">AI MUSIC ENGINE</span>
                  </div>
                </div>
              </div>

              {/* Surrounding headphones and music waves */}
              <div className="headphone-overlay">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" className="headphones-svg">
                  <path d="M15 50c0-20 15-35 35-35s35 15 35 35" strokeLinecap="round" />
                  <rect x="8" y="44" width="10" height="18" rx="4" fill="#7c3aed" />
                  <rect x="82" y="44" width="10" height="18" rx="4" fill="#7c3aed" />
                </svg>
              </div>

              {/* Surrounding floating audio waves */}
              <div className="pulsing-soundwaves">
                <span className="wave-ring wr--1" />
                <span className="wave-ring wr--2" />
                <span className="wave-ring wr--3" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grids Section */}
      <section className="home-features">
        <div className="home-features__container">
          <h2 className="section-title">Precision Engineering for your Soul</h2>
          <p className="section-subtitle">
            Our deep learning models bridge the gap between biological sentiment and digital soundscapes.
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-card__icon">{EmotionIcon}</div>
              <h3 className="feature-card__title">AI Emotion Detection</h3>
              <p className="feature-card__text">
                Privacy-first computer vision that recognizes over 40 distinct
                emotional micro-expressions to understand exactly how you feel.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-card__icon">{PlaylistIcon}</div>
              <h3 className="feature-card__title">Personalized Playlists</h3>
              <p className="feature-card__text">
                Generative audio pipelines that don't just pick songs, but create
                seamless transitions and sonic textures tailored to your flow.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-card__icon">{SecureIcon}</div>
              <h3 className="feature-card__title">Secure JWT Auth</h3>
              <p className="feature-card__text">
                Military-grade encryption for your personal data. We ensure your
                emotional biometrics never leave your device.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section (Standalone items, no connecting lines) */}
      <section className="home-journey">
        <div className="home-journey__container">
          <span className="eyebrow-tag">THE JOURNEY</span>
          <h2 className="section-title">Seamless Immersion</h2>

          <div className="journey-grid">
            <div className="journey-step">
              <div className="journey-step__icon-box">{LoginStepIcon}</div>
              <h4 className="journey-step__title">Login</h4>
              <p className="journey-step__text">
                Connect with your favorite streaming provider or create a Predicto ID.
              </p>
            </div>

            <div className="journey-step">
              <div className="journey-step__icon-box">{CameraStepIcon}</div>
              <h4 className="journey-step__title">Allow Camera</h4>
              <p className="journey-step__text">
                Grant one-time access for real-time mood analysis. Your data is encrypted locally.
              </p>
            </div>

            <div className="journey-step">
              <div className="journey-step__icon-box">{BrainStepIcon}</div>
              <h4 className="journey-step__title">Detect Mood</h4>
              <p className="journey-step__text">
                Our AI identifies your emotional spectrum within milliseconds.
              </p>
            </div>

            <div className="journey-step">
              <div className="journey-step__icon-box">{EnjoyStepIcon}</div>
              <h4 className="journey-step__title">Enjoy</h4>
              <p className="journey-step__text">
                Lose yourself in a musical environment that moves exactly as you do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="home-cta">
        <div className="home-cta__container">
          <div className="home-cta__card">
            <h2 className="home-cta__title">Ready to discover music that understands you?</h2>
            <Link to="/register" className="home-cta__btn">
              Create My Account
            </Link>
            <p className="home-cta__sub">No credit card required. Free 30-day premium trial.</p>
          </div>
        </div>
      </section>

      {/* Landing Footer Section */}
      <footer className="home-footer">
        <div className="home-footer__container">
          <div className="home-footer__left">
            {FaceScannerLogo}
            <span className="home-footer__brand-name">Predicto AI</span>
          </div>
          <div className="home-footer__right">
            <span className="home-footer__tagline">
              © 2026 Predicto AI. Harmonizing emotions through sound.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
