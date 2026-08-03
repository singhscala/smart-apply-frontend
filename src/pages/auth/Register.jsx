import { Link } from "react-router-dom";
import "./Auth.css";

function Register() {
  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1>Create Account</h1>
        <p>Register to Smart Apply</p>

        <form>

          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter full name"
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
            />
          </div>

          <div className="input-group">
            <label>Role</label>

            <select>
              <option value="SEEKER">Job Seeker</option>
              <option value="RECRUITER">Recruiter</option>
            </select>
          </div>

          <button className="auth-btn">
            Register
          </button>

        </form>

        <p className="bottom-text">
          Already have an account?{" "}
          <Link to="/">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;