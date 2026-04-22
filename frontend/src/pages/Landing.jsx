import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Landing() {
  const { user } = useContext(AuthContext);

  const features = [
    {
      icon: "📅",
      title: "Manage Your Slots",
      desc: "Create and organize your time slots with an intuitive dashboard. Mark any slot as swappable with one click.",
    },
    {
      icon: "🔄",
      title: "Instant Swapping",
      desc: "Browse the marketplace for available slots from other users and request a swap in seconds.",
    },
    {
      icon: "🤝",
      title: "Smart Requests",
      desc: "Accept or reject incoming swap requests. Track all your pending, accepted, and rejected swaps.",
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      desc: "Your data is protected with JWT authentication. Only you control which slots are visible to others.",
    },
  ];

  const stats = [
    { value: "10K+", label: "Swaps Completed" },
    { value: "5K+", label: "Active Users" },
    { value: "99.9%", label: "Uptime" },
    { value: "< 1s", label: "Swap Speed" },
  ];

  return (
    <div className="page-wrapper">
      {/* Hero Section */}
      <section
        style={{
          minHeight: "calc(100vh - 70px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "var(--space-2xl) var(--space-lg)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Floating orbs */}
        <div
          style={{
            position: "absolute",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(108,92,231,0.15) 0%, transparent 70%)",
            top: "10%",
            left: "10%",
            animation: "float 6s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,206,201,0.12) 0%, transparent 70%)",
            bottom: "15%",
            right: "15%",
            animation: "float 8s ease-in-out infinite reverse",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(253,121,168,0.1) 0%, transparent 70%)",
            top: "50%",
            right: "30%",
            animation: "float 7s ease-in-out infinite",
            animationDelay: "2s",
            pointerEvents: "none",
          }}
        />

        <div className="animate-slideUp" style={{ maxWidth: "720px" }}>
          <div
            style={{
              display: "inline-block",
              padding: "0.375rem 1rem",
              background: "rgba(108,92,231,0.12)",
              border: "1px solid rgba(108,92,231,0.2)",
              borderRadius: "var(--radius-full)",
              fontSize: "var(--font-size-sm)",
              color: "var(--color-primary-light)",
              fontWeight: 600,
              marginBottom: "var(--space-xl)",
            }}
          >
            ✨ The smarter way to manage time
          </div>

          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: "var(--space-lg)",
              background: "linear-gradient(135deg, #fff 0%, var(--color-primary-light) 50%, var(--color-secondary) 100%)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "gradientShift 4s ease infinite",
            }}
          >
            Swap Time Slots
            <br />
            Effortlessly
          </h1>

          <p
            style={{
              fontSize: "var(--font-size-lg)",
              color: "var(--color-text-secondary)",
              maxWidth: "560px",
              margin: "0 auto var(--space-2xl)",
              lineHeight: 1.7,
            }}
          >
            Stop wasting time coordinating schedule changes. SlotSwapper lets you
            post your available slots, browse others', and swap instantly — all in
            one place.
          </p>

          <div style={{ display: "flex", gap: "var(--space-md)", justifyContent: "center", flexWrap: "wrap" }}>
            {user ? (
              <Link to="/dashboard" className="btn btn-primary btn-lg">
                Go to Dashboard →
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary btn-lg">
                  Get Started Free →
                </Link>
                <Link to="/login" className="btn btn-ghost btn-lg">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: "var(--space-3xl) var(--space-lg)" }}>
        <div
          className="glass-card-static"
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "var(--space-2xl)",
          }}
        >
          <div className="stats-grid stagger-children">
            {stats.map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "var(--font-size-4xl)",
                    fontWeight: 800,
                    background: "linear-gradient(135deg, var(--color-primary-light), var(--color-secondary))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {s.value}
                </div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        style={{
          padding: "var(--space-3xl) var(--space-lg)",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "var(--space-3xl)" }}>
          <h2
            style={{
              fontSize: "var(--font-size-3xl)",
              fontWeight: 800,
              marginBottom: "var(--space-sm)",
            }}
          >
            Everything you need
          </h2>
          <p style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-lg)" }}>
            Built for speed, simplicity, and seamless scheduling.
          </p>
        </div>

        <div className="cards-grid stagger-children">
          {features.map((f, i) => (
            <div key={i} className="glass-card" style={{ padding: "var(--space-2xl)" }}>
              <div
                style={{
                  fontSize: "2.5rem",
                  marginBottom: "var(--space-md)",
                  width: "60px",
                  height: "60px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--color-surface)",
                  borderRadius: "var(--radius-md)",
                }}
              >
                {f.icon}
              </div>
              <h3
                style={{
                  fontSize: "var(--font-size-xl)",
                  fontWeight: 700,
                  marginBottom: "var(--space-sm)",
                }}
              >
                {f.title}
              </h3>
              <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          padding: "var(--space-3xl) var(--space-lg)",
          textAlign: "center",
          marginBottom: "var(--space-3xl)",
        }}
      >
        <div
          className="glass-card-static"
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            padding: "var(--space-3xl) var(--space-2xl)",
            background: "linear-gradient(135deg, rgba(108,92,231,0.1) 0%, rgba(0,206,201,0.08) 100%)",
          }}
        >
          <h2
            style={{
              fontSize: "var(--font-size-3xl)",
              fontWeight: 800,
              marginBottom: "var(--space-md)",
            }}
          >
            Ready to swap smarter?
          </h2>
          <p
            style={{
              color: "var(--color-text-secondary)",
              fontSize: "var(--font-size-lg)",
              marginBottom: "var(--space-2xl)",
            }}
          >
            Join thousands of users already saving time with SlotSwapper.
          </p>
          {!user && (
            <Link to="/register" className="btn btn-primary btn-lg">
              Create Free Account →
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "var(--space-xl) var(--space-lg)",
          borderTop: "1px solid var(--color-border)",
          color: "var(--color-text-muted)",
          fontSize: "var(--font-size-sm)",
        }}
      >
        © 2026 SlotSwapper. Built with ❤️ for better scheduling.
      </footer>
    </div>
  );
}
