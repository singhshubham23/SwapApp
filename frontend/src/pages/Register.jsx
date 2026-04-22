import { useState } from "react";
import { useToast } from "../context/ToastContext";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.warning("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      await API.post("/auth/register", form);
      toast.success("Account created! You can now sign in.");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please check your details.";
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
              background: "linear-gradient(135deg, var(--color-success), var(--color-secondary))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
            }}
          >
            ✨
          </div>
        </div>
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Start swapping slots in seconds</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="reg-name" className="input-label">
              Full Name
            </label>
            <input
              id="reg-name"
              name="name"
              className="input-field"
              placeholder="John Doe"
              value={form.name}
              onChange={handleInputChange}
              required
              autoComplete="name"
            />
          </div>

          <div className="input-group">
            <label htmlFor="reg-email" className="input-label">
              Email Address
            </label>
            <input
              id="reg-email"
              name="email"
              type="email"
              className="input-field"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleInputChange}
              required
              autoComplete="email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="reg-password" className="input-label">
              Password
            </label>
            <input
              id="reg-password"
              name="password"
              type="password"
              className="input-field"
              placeholder="Choose a strong password"
              value={form.password}
              onChange={handleInputChange}
              required
              autoComplete="new-password"
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
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>

          <p className="auth-footer">
            Already have an account?{" "}
            <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
