import "./Auth.css";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../../services/authService";

function Login() {
  const navigate = useNavigate();

  const location = useLocation();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showMessage, setShowMessage] = useState(true);

  const message = location.state?.message;

  const errorMessage = location.state?.error;

  const [error, setError] = useState("");

  useEffect(() => {
    if (message || errorMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message, errorMessage]);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim() && !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!password.trim()) {
      setError("Password is required.");
      return;
    }

    console.log("Login button clicked");

    try {
      const response = await loginUser({
        email,

        password,
      });
      localStorage.setItem("token", response.token);

      localStorage.setItem("role", response.role);

      localStorage.setItem("fullName", response.fullName);

      localStorage.setItem("email", response.email);

      if (response.role === "SEEKER") {
        navigate("/dashboard");
      } else {
        navigate("/recruiter/dashboard");
      }

      console.log(response);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message || "Unable to login. Please try again.",
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Smart Match</h1>

        <p>AI Powered Resume Analysis & Job Recommendation</p>

        {message && showMessage && (
          <div className="success-message">✅ {message}</div>
        )}

        {error && <div className="error-message">❌ {error}</div>}

        {errorMessage && showMessage && (
          <div className="error-message">❌ {errorMessage}</div>
        )}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
          </div>

          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>

        <p className="bottom-text">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
