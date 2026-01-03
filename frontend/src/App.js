import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UploadResume from "./UploadResume";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Signup from "./Signup";
import ProtectedRoute from "./ProtectedRoute"

function App() {
  return (
    <BrowserRouter>
      {/* <div style={{ padding: "10px", background: "#1976d2" }}>
        <Link to="/" style={{ color: "white", marginRight: "15px" }}>
          Analyze
        </Link>
        <Link to="/dashboard" style={{ color: "white", marginRight: "15px" }}>
          Dashboard
        </Link>
        <Link to="/login" style={{ color: "white", marginRight: "15px" }}>
          Login
        </Link>
        <Link to="/signup" style={{ color: "white" }}>
          Signup
        </Link>
      </div> */}
      <div
        style={{
          padding: "12px 20px",
          background: "#1976d2",
          display: "flex",
          gap: "16px",
        }}
      >
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Analyze
        </Link>
        <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>
          Dashboard
        </Link>
        <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
          Login
        </Link>
        <Link to="/signup" style={{ color: "white", textDecoration: "none" }}>
          Signup
        </Link>
      </div>


      <Routes>
        <Route path="/" element={
            <ProtectedRoute>
              <UploadResume />
            </ProtectedRoute>
          }/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
