import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";

function RecruiterSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>Smart Match</h2>

        <p>Recruiter Panel</p>
      </div>

      <div className="sidebar-menu">
        <Link to="/recruiter/dashboard">Dashboard</Link>

        <Link to="/recruiter/jobs">My Jobs</Link>

        <Link to="/recruiter/jobs/create">Post a Job</Link>

        <Link to="/recruiter/profile">Profile</Link>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}

export default RecruiterSidebar;
