import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import Toast from "./components/Toast.jsx";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Marketplace from "./pages/Marketplace.jsx";
import Requests from "./pages/Requests.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Navbar />
          <Toast />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
              />
              <Route
                path="/marketplace"
                element={<ProtectedRoute><Marketplace /></ProtectedRoute>}
              />
              <Route
                path="/requests"
                element={<ProtectedRoute><Requests /></ProtectedRoute>}
              />
            </Routes>
          </main>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
