import "./Recruiter.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { logout } from "../../services/authService";

function Jobs() {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        fetchJobs();
    }, []);

    async function fetchJobs() {
        setLoading(true);
        setError("");
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:8080/api/jobs", {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = response.data || [];
            setJobs(data);
            
            // Sync job count with Dashboard via localStorage
            localStorage.setItem("myJobs", JSON.stringify(data));
        } catch (err) {
            setError("Failed to fetch jobs. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id) {
        if (!window.confirm("Are you sure you want to delete this job posting?")) {
            return;
        }

        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:8080/api/jobs/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const updatedJobs = jobs.filter(job => job.id !== id);
            setJobs(updatedJobs);
            localStorage.setItem("myJobs", JSON.stringify(updatedJobs));
            setSuccess("Job deleted successfully!");

            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete job");
        }
    }

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
                    <Link to="/recruiter/dashboard" className="nav-item">Dashboard</Link>
                    <Link to="/recruiter/jobs" className="nav-item active">My Jobs</Link>
                    <Link to="/recruiter/jobs/create" className="nav-item">Post a Job</Link>
                    <Link to="/recruiter/profile" className="nav-item">Profile</Link>
                </nav>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>

            <div className="main-content">
                <div className="page-header">
                    <h1>My Job Postings</h1>
                    <p>Manage and monitor all jobs you have posted</p>
                </div>

                {error && <div className="alert alert-error">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <div className="card">
                    <div className="card-header">
                        <h2>Posted Jobs ({jobs.length})</h2>
                        <Link to="/recruiter/jobs/create" className="btn-primary">+ Post New Job</Link>
                    </div>

                    {loading ? (
                        <p style={{ textAlign: "center", padding: "20px", color: "#666" }}>Loading jobs...</p>
                    ) : jobs.length === 0 ? (
                        <div className="empty-state">
                            <h3>No Job Postings Yet</h3>
                            <p>You haven't created any job listings. Click below to get started!</p>
                            <br />
                            <Link to="/recruiter/jobs/create" className="btn-primary">Post First Job</Link>
                        </div>
                    ) : (
                        <table className="job-table">
                            <thead>
                                <tr>
                                    <th>Job Title</th>
                                    <th>Company</th>
                                    <th>Location</th>
                                    <th>Exp (Yrs)</th>
                                    <th>Salary (LPA)</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.map((job) => (
                                    <tr key={job.id}>
                                        <td><strong>{job.title}</strong></td>
                                        <td>{job.company}</td>
                                        <td>{job.location || "N/A"}</td>
                                        <td>{job.experience ?? "N/A"}</td>
                                        <td>{job.salary ? `₹${job.salary} LPA` : "N/A"}</td>
                                        <td>
                                            <div className="actions">
                                                <Link 
                                                    to={`/recruiter/jobs/update/${job.id}`} 
                                                    className="btn-secondary"
                                                >
                                                    Edit
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(job.id)} 
                                                    className="btn-danger"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Jobs;