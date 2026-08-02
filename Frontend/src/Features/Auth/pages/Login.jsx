import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import "../styles/Login.scss";

const Login = () => {
  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await handleLogin(loginCredentials);
      navigate("/");
    } catch (loginError) {
      setError(
        loginError?.response?.data?.message ||
          "Unable to log in. Check your credentials.",
      );
    }
  }

  return (
    <div className="auth-page">
      {/* Background */}
      <div className="auth-page__bg" aria-hidden="true">
        <div className="orb orb--1" />
        <div className="orb orb--2" />
        <div className="orb orb--3" />
        <div className="grid-overlay" />
      </div>

      <div className="auth-split">
        {/* ── Left: Brand Panel ── */}
        <aside className="auth-hero">
          <div className="auth-hero__brand">
            <span className="logo-icon">🎵</span>
            <span className="logo-name">Predicto</span>
          </div>

          <h2 className="auth-hero__headline">
            Your mood.
            <br />
            Your <span className="accent">soundtrack.</span>
          </h2>

          <p className="auth-hero__sub">
            Sign in to unlock personalized playlists powered by real-time
            emotion detection. Your face tells the story — we pick the music.
          </p>

          <div className="auth-hero__pills">
            {[
              { icon: "📷", text: "Real-time facial expression analysis" },
              { icon: "🧠", text: "AI-powered mood recognition" },
              { icon: "🎵", text: "Instant mood-matched playlists" },
            ].map((p) => (
              <div className="auth-hero__pill" key={p.text}>
                <span className="pill-icon">{p.icon}</span>
                <span>{p.text}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* ── Right: Form Panel ── */}
        <main className="auth-form-panel">
          <Link to="/" className="auth-back">
            <span className="back-arrow">←</span> Back to home
          </Link>

          <div className="auth-card">
            {/* Mobile brand */}
            <div className="auth-card__mobile-brand">
              <span className="logo-icon">🎵</span>
              <span className="logo-name">Predicto</span>
            </div>

            <p className="auth-card__eyebrow">Welcome back</p>
            <h1 className="auth-card__title">Sign In</h1>
            <p className="auth-card__sub">
              Good to see you again. Let's find your vibe.
            </p>

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              {/* Username / Email */}
              <div className="field">
                <label htmlFor="login-user">Username or Email</label>
                <div className="input-wrap">
                  <span className="input-icon">👤</span>
                  <input
                    id="login-user"
                    type="text"
                    autoComplete="username"
                    placeholder="jane@music.com"
                    value={loginCredentials.username}
                    onChange={(e) =>
                      setLoginCredentials((c) => ({
                        ...c,
                        username: e.target.value,
                        email: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="field">
                <label htmlFor="login-pass">Password</label>
                <div className="input-wrap">
                  <span className="input-icon">🔒</span>
                  <input
                    id="login-pass"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Your password"
                    value={loginCredentials.password}
                    onChange={(e) =>
                      setLoginCredentials((c) => ({
                        ...c,
                        password: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="form-error" role="alert">
                  ⚠️ {error}
                </p>
              )}

              <button
                type="submit"
                className="auth-submit"
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? "Signing in…" : "Sign In →"}
              </button>
            </form>

            <div className="auth-divider">or</div>

            <p className="auth-switch">
              New here? <Link to="/register">Create an account</Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;
