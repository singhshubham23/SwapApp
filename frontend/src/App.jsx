import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import Navbar from "./components/Navbar";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Marketplace from "./pages/Marketplace.jsx";
import Requests from "./pages/Requests.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <div
      style={{
        backgroundImage: "url('/bgImage.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        minHeight: "100vh",
      }}
    >

    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Login />} />
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
        </div>
      </BrowserRouter>
    </AuthProvider>
    </div>
  );
}

export default App;
