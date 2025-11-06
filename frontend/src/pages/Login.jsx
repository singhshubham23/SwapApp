import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!email || !password) {
        alert("Please enter both email and password.");
        setLoading(false);
        return;
      }

      const res = await API.post("/auth/login", { email, password });
      login(res.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Invalid credentials. Please check your email and password.";
      alert(errorMessage);
    } finally {
      setLoading(false); // Reset loading state on finish
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        {/* Responsive card container, centered */}
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-4 fw-bold text-primary">
              Member Login 🔑
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="emailInput" className="form-label">
                  Email address
                </label>
                <input
                  id="emailInput"
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="passwordInput" className="form-label">
                  Password
                </label>
                <input
                  id="passwordInput"
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                className="btn btn-primary btn-lg w-100 mb-3"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Logging In...
                  </>
                ) : (
                  "Login"
                )}
              </button>

              <p className="mt-3 text-center">
                Don't have an account?{" "}
                <Link to="/register" className="fw-bold text-decoration-none">
                  Register Here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
