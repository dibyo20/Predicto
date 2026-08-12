import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import InputField from "../components/InputField.jsx";
import "../styles/Login.scss";

// SVG indicator icons for form inputs
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

// Static face-wireframe scanning graphic SVG
const FaceScannerGraphic = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    width="100"
    height="100"
    className="large-logo-svg"
  >
    <path d="M2 7V3h5M17 3h5v4M2 17v5h5M17 22h5v-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 5c2 0 4.5 2.5 4.5 6s-1.5 5.5-4.5 7.5c-3-2-4.5-4-4.5-7.5s2.5-6 4.5-6z" strokeDasharray="3 3" />
    <path d="M6 10h12M7.5 13.5h9M9 17h6" />
    <circle cx="12" cy="10" r="1.5" fill="currentColor" />
    <circle cx="9.5" cy="10" r="1" fill="currentColor" />
    <circle cx="14.5" cy="10" r="1" fill="currentColor" />
    <circle cx="12" cy="13.5" r="1" fill="currentColor" />
  </svg>
);

const Login = () => {
  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // Tracking credentials state
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!loginCredentials.username.trim()) {
      setError("Username or Email is required.");
      return;
    }
    if (!loginCredentials.password) {
      setError("Password is required.");
      return;
    }

    try {
      const res = await handleLogin(loginCredentials);
      if (res) {
        navigate("/predict");
      } else {
        setError("Invalid username or password.");
      }
    } catch (loginError) {
      setError(
        loginError?.response?.data?.message ||
          "Unable to log in. Check your credentials.",
      );
    }
  }

  const handleInputChange = (field, val) => {
    setLoginCredentials((prev) => {
      if (field === "usernameOrEmail") {
        return {
          ...prev,
          username: val,
          email: val,
        };
      }
      return {
        ...prev,
        [field]: val,
      };
    });
  };

  return (
    <div className="auth-page auth-page--login">
      {/* Background orbs */}
      <div className="auth-page__bg" aria-hidden="true">
        <div className="orb orb--1" />
        <div className="orb orb--2" />
        <div className="grid-overlay" />
      </div>

      <div className="auth-container">
        <div className="auth-split">
          {/* Brand Panel: Displays head scanning branding */}
          <aside className="auth-hero">
            <div className="auth-hero__center-content">
              <div className="large-logo-icon">
                {FaceScannerGraphic}
              </div>
              <h2 className="auth-hero__logo-name">Predicto</h2>
              <p className="auth-hero__tagline">
                Harmonizing emotions through generative AI soundscapes.
              </p>
            </div>
          </aside>

          {/* Form Action Panel */}
          <main className="auth-form-panel">
            <div className="auth-card">
              <div className="auth-card__header">
                <h1 className="auth-card__title">Welcome Back</h1>
                <p className="auth-card__subtitle">
                  Sign in to continue your sonic journey.
                </p>
              </div>

              <form className="auth-form" onSubmit={handleSubmit} noValidate>
                {/* Username or Email Input Field */}
                <InputField
                  label="Username/Email"
                  id="login-user"
                  type="text"
                  placeholder="name@company.com"
                  value={loginCredentials.username}
                  onChange={(e) => handleInputChange("usernameOrEmail", e.target.value)}
                  icon={MailIcon}
                  required
                  autoComplete="username"
                />

                {/* Password Input Field */}
                <InputField
                  label="Password"
                  id="login-pass"
                  type="password"
                  placeholder="••••••••"
                  value={loginCredentials.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  icon={LockIcon}
                  showPasswordToggle={true}
                  required
                  autoComplete="current-password"
                />

                {/* Validation message handler */}
                {error && (
                  <div className="form-error" role="alert">
                    <span className="error-icon">⚠️</span>
                    <span className="error-text">{error}</span>
                  </div>
                )}

                {/* Form submit execution button */}
                <button
                  type="submit"
                  className="auth-submit-btn"
                  disabled={loading}
                  aria-busy={loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </form>

              {/* Redirect switch link */}
              <div className="auth-switch-prompt">
                Don't have an account?{" "}
                <Link to="/register" className="auth-switch-link">
                  Register
                </Link>
              </div>
            </div>
          </main>
        </div>

        {/* Global Footer */}
        <footer className="auth-footer">
          <p className="auth-footer__text">
            © 2026 Predicto AI. Harmonizing emotions through sound.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Login;
