import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import "../styles/Register.scss";

const Register = () => {
  const { loading, handleRegister } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [registerCredentials, setRegisterCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await handleRegister(registerCredentials);
      navigate("/");
    } catch (registerError) {
      setError(
        registerError?.response?.data?.message || "Unable to create account.",
      );
    }
  };

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
            Music that <span className="accent">feels</span>
            <br />
            what you feel.
          </h2>

          <p className="auth-hero__sub">
            Create your account and let Predicto turn your emotions into the
            perfect playlist — every single time you open the camera.
          </p>

          <div className="auth-hero__pills">
            {[
              { icon: "⚡", text: "Set up in under 30 seconds" },
              { icon: "🔒", text: "Zero camera data stored" },
              { icon: "🎶", text: "Unlimited mood-based sessions" },
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

            <p className="auth-card__eyebrow">Get started — it's free</p>
            <h1 className="auth-card__title">Create Account</h1>
            <p className="auth-card__sub">
              Join Predicto and discover music that truly matches your mood.
            </p>

            <form
              className="auth-form"
              onSubmit={handleRegisterSubmit}
              noValidate
            >
              {/* Username */}
              <div className="field">
                <label htmlFor="reg-username">Username</label>
                <div className="input-wrap">
                  <span className="input-icon">👤</span>
                  <input
                    id="reg-username"
                    type="text"
                    autoComplete="username"
                    placeholder="cooluser42"
                    value={registerCredentials.username}
                    onChange={(e) =>
                      setRegisterCredentials((c) => ({
                        ...c,
                        username: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="field">
                <label htmlFor="reg-email">Email</label>
                <div className="input-wrap">
                  <span className="input-icon">✉️</span>
                  <input
                    id="reg-email"
                    type="email"
                    autoComplete="email"
                    placeholder="jane@music.com"
                    value={registerCredentials.email}
                    onChange={(e) =>
                      setRegisterCredentials((c) => ({
                        ...c,
                        email: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="field">
                <label htmlFor="reg-password">Password</label>
                <div className="input-wrap">
                  <span className="input-icon">🔒</span>
                  <input
                    id="reg-password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Create a strong password"
                    value={registerCredentials.password}
                    onChange={(e) =>
                      setRegisterCredentials((c) => ({
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
                {loading ? "Creating account…" : "Create Account →"}
              </button>
            </form>

            <div className="auth-divider">or</div>

            <p className="auth-switch">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Register;
