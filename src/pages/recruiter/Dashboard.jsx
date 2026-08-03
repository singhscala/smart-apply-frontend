import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function RecruiterDashboard() {
  const [jobCount, setJobCount] = useState(0);

  const [recruiterName, setRecruiterName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("fullName") || "Recruiter";

    setRecruiterName(name);

    const jobs = JSON.parse(localStorage.getItem("myJobs") || "[]");

    setJobCount(jobs.length);
  }, []);

  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Welcome, {recruiterName}! 👋</h1>

        <p>Manage your job postings from here</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Jobs Posted</h3>

          <div className="stat-number">{jobCount}</div>
        </div>

        <div className="stat-card">
          <h3>Role</h3>

          <div className="stat-number role-text">Recruiter</div>
        </div>

        <div className="stat-card">
          <h3>Status</h3>

          <div className="stat-number status-text">Active</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Quick Actions</h2>
        </div>

        <div className="quick-actions">
          <Link to="/recruiter/jobs/create" className="btn-primary">
            + Post New Job
          </Link>

          <Link to="/recruiter/jobs" className="btn-secondary">
            View My Jobs
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RecruiterDashboard;
