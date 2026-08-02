import "./Recruiter.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { logout } from "../../services/authService";

function RecruiterDashboard() {
    const navigate = useNavigate();
    const [jobCount, setJobCount] = useState(0);
    const [recruiterName, setRecruiterName] = useState("");

    useEffect(() => {
        const name = localStorage.getItem("fullName") || "Recruiter";
        setRecruiterName(name);
        const jobs = JSON.parse(localStorage.getItem("myJobs") || "[]");
        setJobCount(jobs.length);
    }, []);

    function handleLogout() {
        logout();
        navigate("/");
    }

    return (
        <div className="recruiter-layout">
            <div className="sidebar">
                <div className="sidebar-logo">
                    <h2>Smart Match</h2>
                    <p>Recruiter Panel</p>
                </div>
                <nav className="sidebar-nav">
                    <Link to="/recruiter/dashboard" className="nav-item active">Dashboard</Link>
                    <Link to="/recruiter/jobs" className="nav-item">My Jobs</Link>
                    <Link to="/recruiter/jobs/create" className="nav-item">Post a Job</Link>
                    <Link to="/recruiter/profile" className="nav-item">Profile</Link>
                </nav>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>

            <div className="main-content">
                <div className="page-header">
                    <h1>Welcome, {recruiterName}!</h1>
                    <p>Manage your job postings from here</p>
                </div>

                <div className="stats-grid">
                    <div className="stat-card">
                        <h3>Jobs Posted</h3>
                        <div className="stat-number">{jobCount}</div>
                    </div>
                    <div className="stat-card">
                        <h3>Role</h3>
                        <div className="stat-number" style={{fontSize:"20px",marginTop:"6px"}}>Recruiter</div>
                    </div>
                    <div className="stat-card">
                        <h3>Status</h3>
                        <div className="stat-number" style={{fontSize:"20px",marginTop:"6px",color:"#16a34a"}}>Active</div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <h2>Quick Actions</h2>
                    </div>
                    <div style={{display:"flex", gap:"12px"}}>
                        <Link to="/recruiter/jobs/create" className="btn-primary">+ Post New Job</Link>
                        <Link to="/recruiter/jobs" className="btn-secondary">View My Jobs</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecruiterDashboard;