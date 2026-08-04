import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import InputField from "../components/InputField.jsx";
import "../styles/Register.scss";

// SVG indicator icons for form fields
const UserIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    width="20"
    height="20"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
  </svg>
);

const MailIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    width="20"
    height="20"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
    />
  </svg>
);

const LockIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    width="20"
    height="20"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
    />
  </svg>
);

// Face-scanning brand logo SVG
const FaceScannerLogo = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    width="32"
    height="32"
    className="brand-logo-svg"
  >
    <path d="M4 8V4h4M16 4h4v4M4 16v4h4M16 20h4v-4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 10a1 1 0 1 0 2 0m2 0a1 1 0 1 0 2 0" strokeLinecap="round" />
    <path d="M12 12v2m-3 2s1.5 1.5 3 1.5 3-1.5 3-1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="7" strokeDasharray="3 3" />
  </svg>
);

const Register = () => {
  const { loading, handleRegister } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);

  // Form registration state
  const [registerCredentials, setRegisterCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Submit action triggers validations
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!registerCredentials.username.trim()) {
      setError("Username is required.");
      return;
    }
    if (!registerCredentials.email.trim()) {
      setError("Email address is required.");
      return;
    }
    if (!registerCredentials.password) {
      setError("Password is required.");
      return;
    }
    if (registerCredentials.password !== registerCredentials.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!agreed) {
      setError("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }

    try {
      const { username, email, password } = registerCredentials;
      const res = await handleRegister({ username, email, password });
      if (res) {
        navigate("/predict");
      } else {
        setError("Unable to create account. Please check your inputs.");
      }
    } catch (registerError) {
      setError(
        registerError?.response?.data?.message || "Unable to create account.",
      );
    }
  };

  const handleInputChange = (field, val) => {
    setRegisterCredentials((prev) => ({
      ...prev,
      [field]: val,
    }));
  };

  return (
    <div className="auth-page auth-page--register">
      {/* Background orbs */}
      <div className="auth-page__bg" aria-hidden="true">
        <div className="orb orb--1" />
        <div className="orb orb--2" />
        <div className="grid-overlay" />
      </div>

      <div className="auth-container">
        <div className="auth-split">
          {/* Left Panel: Branding & Animations */}
          <aside className="auth-hero">
            <div className="auth-hero__register-content">
              <div className="auth-hero__brand-header">
                {FaceScannerLogo}
                <h2 className="auth-hero__logo-name">Predicto</h2>
              </div>
              <p className="auth-hero__tagline">
                The future of sound is emotional. Join the community harmonizing
                intelligence with intuition.
              </p>

              {/* Graphical scanner and equalizer components */}
              <div className="auth-hero__visual-container">
                <div className="scanner-graphic">
                  <div className="scanner-circle">
                    <div className="scanner-line" />
                    <div className="scanner-crosshair" />
                    <div className="scanner-face-overlay">
                      <span className="face-point fp--1" />
                      <span className="face-point fp--2" />
                      <span className="face-point fp--3" />
                      <span className="face-point fp--4" />
                      <span className="face-point fp--5" />
                      <span className="face-point fp--6" />
                      <span className="face-point fp--7" />
                      <span className="face-point fp--8" />
                    </div>
                  </div>
                </div>

                <div className="soundwave-graphic">
                  <span className="sound-bar" />
                  <span className="sound-bar" />
                  <span className="sound-bar" />
                  <span className="sound-bar" />
                  <span className="sound-bar" />
                  <span className="sound-bar" />
                  <span className="sound-bar" />
                  <span className="sound-bar" />
                  <span className="sound-bar" />
                  <span className="sound-bar" />
                  <span className="sound-bar" />
                  <span className="sound-bar" />
                </div>
              </div>

              {/* Grid cards displaying tracks/AI info */}
              <div className="auth-hero__cards-grid">
                <div className="brand-info-card">
                  <div className="brand-info-card__icon">🎵</div>
                  <div className="brand-info-card__text">5M+ Tracks</div>
                </div>
                <div className="brand-info-card">
                  <div className="brand-info-card__icon">✨</div>
                  <div className="brand-info-card__text">AI Synthesis</div>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Panel: Action Forms */}
          <main className="auth-form-panel">
            <div className="auth-card">
              <div className="auth-card__header">
                <h1 className="auth-card__title">Create account</h1>
                <p className="auth-card__subtitle">
                  Get started with your emotional music journey.
                </p>
              </div>

              <form className="auth-form" onSubmit={handleRegisterSubmit} noValidate>
                {/* Username Input Field */}
                <InputField
                  label="Username"
                  id="reg-username"
                  type="text"
                  placeholder="johndoe_99"
                  value={registerCredentials.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  icon={UserIcon}
                  required
                  autoComplete="username"
                />

                {/* Email address Input Field */}
                <InputField
                  label="Email address"
                  id="reg-email"
                  type="email"
                  placeholder="name@example.com"
                  value={registerCredentials.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  icon={MailIcon}
                  required
                  autoComplete="email"
                />

                {/* Password Input Field */}
                <InputField
                  label="Password"
                  id="reg-password"
                  type="password"
                  placeholder="••••••••"
                  value={registerCredentials.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  icon={LockIcon}
                  showPasswordToggle={true}
                  required
                  autoComplete="new-password"
                />

                {/* Confirm Password Input Field */}
                <InputField
                  label="Confirm Password"
                  id="reg-confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={registerCredentials.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  icon={LockIcon}
                  showPasswordToggle={true}
                  required
                  autoComplete="new-password"
                />

                {/* Agreement Checkbox */}
                <div className="auth-agreement-field">
                  <label className="checkbox-container" style={{ display: "flex", alignItems: "center", cursor: "pointer", gap: "0.75rem", fontSize: "0.85rem", color: "#9ca3af", marginTop: "0.5rem", marginBottom: "0.5rem" }}>
                    <input
                      type="checkbox"
                      id="reg-agree"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      style={{ cursor: "pointer", width: "16px", height: "16px", accentColor: "#a78bfa" }}
                      required
                    />
                    <span>I agree to the Terms of Service and Privacy Policy</span>
                  </label>
                </div>

                {/* Alert handler */}
                {error && (
                  <div className="form-error" role="alert">
                    <span className="error-icon">⚠️</span>
                    <span className="error-text">{error}</span>
                  </div>
                )}

                {/* Submit button trigger */}
                <button
                  type="submit"
                  className="auth-submit-btn"
                  disabled={loading}
                  aria-busy={loading}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </form>

              {/* Login toggle prompt */}
              <div className="auth-switch-prompt">
                Already have an account?{" "}
                <Link to="/login" className="auth-switch-link">
                  Login
                </Link>
              </div>
            </div>
          </main>
        </div>

        {/* Branding copyright footer */}
        <footer className="auth-footer">
          <p className="auth-footer__text">
            © 2026 Predicto AI. Harmonizing emotions through sound.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Register;
