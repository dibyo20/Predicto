import React from "react";

export function DashboardSkeleton() {
  return (
    <div className="skeleton-dashboard">
      <div className="detector-bg" aria-hidden="true" style={{ opacity: 0.3 }}>
        <div className="detector-orb detector-orb--1" />
        <div className="detector-orb detector-orb--2" />
        <div className="detector-grid" />
      </div>

      <header className="skeleton-header">
        <div className="skeleton-item" style={{ width: "120px", height: "24px" }} />
        <div className="skeleton-item" style={{ width: "36px", height: "36px", borderRadius: "50%" }} />
      </header>

      <main className="skeleton-body">
        <section style={{ marginBottom: "2rem" }}>
          <div className="skeleton-item skeleton-title" style={{ width: "280px", height: "42px" }} />
          <div className="skeleton-item skeleton-text" style={{ width: "500px", height: "16px", marginTop: "10px" }} />
        </section>

        <div className="skeleton-grid">
          <div className="skeleton-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div className="skeleton-item" style={{ width: "100px", height: "20px" }} />
              <div className="skeleton-item" style={{ width: "80px", height: "18px", borderRadius: "20px" }} />
            </div>

            <div className="skeleton-item" style={{ width: "100%", paddingBottom: "56.25%", borderRadius: "12px", position: "relative" }}>
              <div 
                className="skeleton-item skeleton-circle" 
                style={{ 
                  position: "absolute", 
                  top: "50%", 
                  left: "50%", 
                  transform: "translate(-50%, -50%)", 
                  width: "120px", 
                  height: "120px",
                  opacity: 0.15
                }} 
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="skeleton-item skeleton-btn" style={{ width: "48%" }} />
              <div className="skeleton-item skeleton-btn" style={{ width: "48%" }} />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div className="skeleton-card" style={{ alignItems: "center", textAlign: "center", padding: "2.5rem" }}>
              <div className="skeleton-item skeleton-circle" style={{ width: "80px", height: "80px", marginBottom: "1rem" }} />
              <div className="skeleton-item" style={{ width: "150px", height: "24px", marginBottom: "0.5rem" }} />
              <div className="skeleton-item skeleton-text" style={{ width: "200px", height: "14px" }} />
            </div>

            <div className="skeleton-card" style={{ gap: "1.25rem" }}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div className="skeleton-item" style={{ width: "120px", height: "16px" }} />
                  <div className="skeleton-item" style={{ width: "90px", height: "16px" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export function LoginSkeleton() {
  return (
    <div className="auth-page auth-page--login">
      <div className="auth-page__bg" aria-hidden="true" style={{ opacity: 0.5 }}>
        <div className="orb orb--1" />
        <div className="orb orb--2" />
        <div className="grid-overlay" />
      </div>

      <div className="auth-container">
        <div className="auth-split">
          <aside className="auth-hero">
            <div className="auth-hero__center-content" style={{ opacity: 0.6 }}>
              <div className="skeleton-item skeleton-circle" style={{ width: "100px", height: "100px", margin: "0 auto 1.5rem" }} />
              <div className="skeleton-item" style={{ width: "140px", height: "32px", margin: "0 auto 1rem" }} />
              <div className="skeleton-item skeleton-text" style={{ width: "240px", height: "16px", margin: "0 auto" }} />
            </div>
          </aside>

          <main className="auth-form-panel">
            <div className="auth-card">
              <div className="auth-card__header">
                <div className="skeleton-item" style={{ width: "180px", height: "36px", marginBottom: "0.5rem" }} />
                <div className="skeleton-item skeleton-text" style={{ width: "220px", height: "16px" }} />
              </div>

              <div className="auth-form">
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.5rem" }}>
                  <div className="skeleton-item" style={{ width: "100px", height: "14px" }} />
                  <div className="skeleton-item skeleton-input" style={{ marginBottom: 0 }} />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.5rem" }}>
                  <div className="skeleton-item" style={{ width: "80px", height: "14px" }} />
                  <div className="skeleton-item skeleton-input" style={{ marginBottom: 0 }} />
                </div>

                <div className="skeleton-item skeleton-btn" style={{ marginTop: "1rem" }} />
              </div>

              <div style={{ textAlign: "center", marginTop: "1rem" }}>
                <div className="skeleton-item" style={{ width: "200px", height: "16px" }} />
              </div>
            </div>
          </main>
        </div>

        <footer className="auth-footer" style={{ opacity: 0.5 }}>
          <div className="skeleton-item" style={{ width: "320px", height: "14px" }} />
        </footer>
      </div>
    </div>
  );
}

export function RegisterSkeleton() {
  return (
    <div className="auth-page auth-page--register">
      <div className="auth-page__bg" aria-hidden="true" style={{ opacity: 0.5 }}>
        <div className="orb orb--1" />
        <div className="orb orb--2" />
        <div className="grid-overlay" />
      </div>

      <div className="auth-container">
        <div className="auth-split">
          <aside className="auth-hero">
            <div className="auth-hero__center-content" style={{ opacity: 0.6 }}>
              <div className="skeleton-item skeleton-circle" style={{ width: "100px", height: "100px", margin: "0 auto 1.5rem" }} />
              <div className="skeleton-item" style={{ width: "140px", height: "32px", margin: "0 auto 1rem" }} />
              <div className="skeleton-item skeleton-text" style={{ width: "240px", height: "16px", margin: "0 auto" }} />
            </div>
          </aside>

          <main className="auth-form-panel">
            <div className="auth-card">
              <div className="auth-card__header">
                <div className="skeleton-item" style={{ width: "200px", height: "36px", marginBottom: "0.5rem" }} />
                <div className="skeleton-item skeleton-text" style={{ width: "240px", height: "16px" }} />
              </div>

              <div className="auth-form">
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.25rem" }}>
                  <div className="skeleton-item" style={{ width: "80px", height: "14px" }} />
                  <div className="skeleton-item skeleton-input" style={{ marginBottom: 0 }} />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.25rem" }}>
                  <div className="skeleton-item" style={{ width: "100px", height: "14px" }} />
                  <div className="skeleton-item skeleton-input" style={{ marginBottom: 0 }} />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.25rem" }}>
                  <div className="skeleton-item" style={{ width: "80px", height: "14px" }} />
                  <div className="skeleton-item skeleton-input" style={{ marginBottom: 0 }} />
                </div>

                <div className="skeleton-item skeleton-btn" style={{ marginTop: "0.5rem" }} />
              </div>

              <div style={{ textAlign: "center", marginTop: "1rem" }}>
                <div className="skeleton-item" style={{ width: "200px", height: "16px" }} />
              </div>
            </div>
          </main>
        </div>

        <footer className="auth-footer" style={{ opacity: 0.5 }}>
          <div className="skeleton-item" style={{ width: "320px", height: "14px" }} />
        </footer>
      </div>
    </div>
  );
}
