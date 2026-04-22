import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/marketplace", label: "Marketplace" },
    { to: "/requests", label: "Requests" },
  ];

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        {/* Brand */}
        <Link to="/" style={styles.brand} onClick={() => setMobileOpen(false)}>
          <div style={styles.brandIcon}>S</div>
          <span style={styles.brandText}>SlotSwapper</span>
        </Link>

        {/* Desktop nav */}
        <div style={styles.desktopNav}>
          {user ? (
            <>
              <div style={styles.navLinks}>
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    style={{
                      ...styles.navLink,
                      ...(isActive(link.to) ? styles.navLinkActive : {}),
                    }}
                  >
                    {link.label}
                    {isActive(link.to) && <span style={styles.activeIndicator} />}
                  </Link>
                ))}
              </div>
              <div style={styles.userArea}>
                <div className="avatar">{user.name?.charAt(0).toUpperCase()}</div>
                <span style={styles.userName}>{user.name?.split(" ")[0]}</span>
                <button onClick={handleLogout} className="btn btn-ghost btn-sm">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div style={styles.authLinks}>
              <Link to="/login" className="btn btn-ghost btn-sm">
                Sign In
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          style={styles.hamburger}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            style={{
              ...styles.hamburgerLine,
              transform: mobileOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
            }}
          />
          <span
            style={{
              ...styles.hamburgerLine,
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              ...styles.hamburgerLine,
              transform: mobileOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        style={{
          ...styles.mobileMenu,
          maxHeight: mobileOpen ? "400px" : "0",
          opacity: mobileOpen ? 1 : 0,
          padding: mobileOpen ? "var(--space-lg)" : "0 var(--space-lg)",
        }}
      >
        {user ? (
          <>
            <div style={styles.mobileUser}>
              <div className="avatar">{user.name?.charAt(0).toUpperCase()}</div>
              <span style={{ fontWeight: 600 }}>{user.name}</span>
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  ...styles.mobileLink,
                  ...(isActive(link.to) ? styles.mobileLinkActive : {}),
                }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="btn btn-danger"
              style={{ width: "100%", marginTop: "var(--space-sm)" }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="btn btn-ghost"
              style={{ width: "100%" }}
              onClick={() => setMobileOpen(false)}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="btn btn-primary"
              style={{ width: "100%", marginTop: "var(--space-sm)" }}
              onClick={() => setMobileOpen(false)}
            >
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    background: "rgba(10, 10, 26, 0.8)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderBottom: "1px solid var(--color-border)",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 var(--space-lg)",
    height: "70px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-sm)",
    textDecoration: "none",
    color: "var(--color-text)",
  },
  brandIcon: {
    width: "36px",
    height: "36px",
    borderRadius: "var(--radius-sm)",
    background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    fontSize: "var(--font-size-lg)",
    color: "#fff",
  },
  brandText: {
    fontWeight: 700,
    fontSize: "var(--font-size-xl)",
  },
  desktopNav: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-xl)",
  },
  navLinks: {
    display: "flex",
    gap: "var(--space-xs)",
  },
  navLink: {
    position: "relative",
    padding: "0.5rem 1rem",
    color: "var(--color-text-secondary)",
    textDecoration: "none",
    fontSize: "var(--font-size-sm)",
    fontWeight: 500,
    borderRadius: "var(--radius-sm)",
    transition: "all 200ms ease",
  },
  navLinkActive: {
    color: "var(--color-text)",
    background: "var(--color-surface)",
  },
  activeIndicator: {
    position: "absolute",
    bottom: "-2px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "20px",
    height: "2px",
    background: "var(--color-primary)",
    borderRadius: "1px",
  },
  userArea: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-sm)",
  },
  userName: {
    fontSize: "var(--font-size-sm)",
    fontWeight: 500,
    color: "var(--color-text-secondary)",
  },
  authLinks: {
    display: "flex",
    gap: "var(--space-sm)",
  },
  hamburger: {
    display: "none",
    flexDirection: "column",
    gap: "5px",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
  },
  hamburgerLine: {
    width: "22px",
    height: "2px",
    background: "var(--color-text)",
    borderRadius: "1px",
    transition: "all 300ms ease",
  },
  mobileMenu: {
    overflow: "hidden",
    transition: "all 300ms ease",
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-sm)",
    borderTop: "1px solid var(--color-border)",
  },
  mobileUser: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-sm)",
    padding: "var(--space-sm) 0",
    marginBottom: "var(--space-sm)",
    borderBottom: "1px solid var(--color-border)",
    paddingBottom: "var(--space-md)",
  },
  mobileLink: {
    display: "block",
    padding: "0.75rem 1rem",
    color: "var(--color-text-secondary)",
    textDecoration: "none",
    borderRadius: "var(--radius-sm)",
    fontSize: "var(--font-size-sm)",
    fontWeight: 500,
    transition: "all 200ms ease",
  },
  mobileLinkActive: {
    color: "var(--color-text)",
    background: "var(--color-surface)",
  },
};

/* Show hamburger on mobile, hide desktop nav */
const mobileCSS = document.createElement("style");
mobileCSS.textContent = `
  @media (max-width: 768px) {
    nav > div:first-child > div:nth-child(2) { display: none !important; }
    nav > div:first-child > button { display: flex !important; }
  }
`;
document.head.appendChild(mobileCSS);

export default Navbar;