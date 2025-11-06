import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!form.name || !form.email || !form.password) {
        alert("Please fill in all fields.");
        setLoading(false);
        return;
      }

      await API.post("/auth/register", form);
      alert("Registration successful! You can now log in.");
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please check your details.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-4 fw-bold text-success">
              Create Account 📝
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nameInput" className="form-label">
                  Your Name
                </label>
                <input
                  id="nameInput"
                  name="name"
                  className="form-control form-control-lg"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="emailInput" className="form-label">
                  Email address
                </label>
                <input
                  id="emailInput"
                  name="email"
                  className="form-control form-control-lg"
                  placeholder="user@example.com"
                  value={form.email}
                  onChange={handleInputChange}
                  type="email"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="passwordInput" className="form-label">
                  Password
                </label>
                <input
                  id="passwordInput"
                  name="password"
                  className="form-control form-control-lg"
                  placeholder="Choose a strong password"
                  type="password"
                  value={form.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button
                className="btn btn-success btn-lg w-100 mb-3"
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
                    Registering...
                  </>
                ) : (
                  "Register"
                )}
              </button>

              <p className="mt-3 text-center">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="fw-bold text-decoration-none text-primary"
                >
                  Login Here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
