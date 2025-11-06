

import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
 const { user, logout } = useContext(AuthContext);
 const navigate = useNavigate();

 const handleLogout = () => {
  logout();
  navigate("/");
 };

 return (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
   <div className="container-fluid">
    <Link className="navbar-brand fw-bold d-flex align-items-center me-4" to="/dashboard">
     <img
      src="/63.jpg"
      alt="SlotSwapper Logo"
      style={{ height: "35px", width: "35px", marginRight: "10px", borderRadius: "50%", objectFit: "cover" }}
      className="d-inline-block"
     />
     <span className="fs-5">SlotSwapper</span>
    </Link>
    <button
     className="navbar-toggler"
     type="button"
     data-bs-toggle="collapse"
     data-bs-target="#navbarNavContent"
     aria-controls="navbarNavContent"
     aria-expanded="false"
     aria-label="Toggle navigation"
    >
     <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavContent">
     
     {user ? (
      <>
       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
         <Link className="nav-link fs-6 fw-semibold" to="/dashboard">
          Dashboard
         </Link>
        </li>
        <li className="nav-item">
         <Link className="nav-link fs-6 fw-semibold" to="/marketplace">
          Marketplace
         </Link>
        </li>
        <li className="nav-item">
         <Link className="nav-link fs-6 fw-semibold" to="/requests">
          Requests
         </Link>
        </li>
       </ul>
       <div className="d-flex align-items-center mt-2 mt-lg-0">
         <span className="navbar-text me-3 text-light fw-medium">
          Welcome, {user.name.split(' ')[0]}!
         </span>
         <button onClick={handleLogout} className="btn btn-danger">
          Logout
         </button>
       </div>
      </>
     ) : (
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
       <li className="nav-item me-2">
        <Link className="btn btn-primary" to="/">
         Login
        </Link>
       </li>
       <li className="nav-item">
        <Link className="btn btn-success" to="/register">
         Register
        </Link>
       </li>
      </ul>
     )}
    </div>
   </div>
  </nav>
 )}

export default Navbar;