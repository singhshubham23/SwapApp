import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warning("Please enter both email and password.");
      return;
    }
    setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      login(res.data);
      toast.success("Welcome back! Redirecting to dashboard...");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Invalid credentials. Please check your email and password.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="glass-card auth-card animate-scaleIn">
        <div style={{ textAlign: "center", marginBottom: "var(--space-sm)" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              margin: "0 auto var(--space-md)",
              borderRadius: "var(--radius-md)",
              background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
            }}
          >
            🔑
          </div>
        </div>
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Sign in to manage your time slots</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="login-email" className="input-label">
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              className="input-field"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="login-password" className="input-label">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              className="input-field"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button
            className="btn btn-primary btn-lg"
            type="submit"
            disabled={loading}
            style={{ width: "100%", marginTop: "var(--space-sm)" }}
          >
            {loading ? (
              <>
                <span className="spinner" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>

          <p className="auth-footer">
            Don't have an account?{" "}
            <Link to="/register">Create one</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
