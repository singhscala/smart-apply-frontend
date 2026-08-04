import "./Auth.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";

function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("SEEKER");

  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");

    try {
      await registerUser({
        fullName,
        email,
        password,
        role,
      });

      navigate("/", {
        state: {
          message: "Registration Successful!",
        },
      });
    } catch (err) {
      setError(err.response?.data?.message || "Registration Failed!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create Account</h1>

        <p>Register to Smart Match</p>

        {error && <div className="error-message">❌ {error}</div>}

        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label>Full Name</label>

            <input
              type="text"
              placeholder="Enter full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Role</label>

            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="SEEKER">Job Seeker</option>

              <option value="RECRUITER">Recruiter</option>
            </select>
          </div>

          <button type="submit" className="auth-btn">
            Register
          </button>
        </form>

        <p className="bottom-text">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
