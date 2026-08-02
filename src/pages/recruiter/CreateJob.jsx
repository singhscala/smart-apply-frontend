import "./Recruiter.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { logout } from "../../services/authService";

function CreateJob() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        company: "",
        location: "",
        description: "",
        requiredSkills: "",
        experience: "",
        salary: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);
        try {
            const token = localStorage.getItem("token");

            // convert skills string to List
            const skillsList = form.requiredSkills
                .split(",")
                .map(s => s.trim())
                .filter(s => s !== "");

            const payload = {
                title: form.title,
                company: form.company,
                location: form.location,
                description: form.description,
                requiredSkills: skillsList,
                experience: parseInt(form.experience),
                salary: parseFloat(form.salary)
            };

            await axios.post(
                "http://localhost:8080/api/jobs",
                payload,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSuccess("Job posted successfully!");
            setTimeout(() => navigate("/recruiter/jobs"), 1500);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to post job");
        } finally {
            setLoading(false);
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
                    <Link to="/recruiter/jobs" className="nav-item">My Jobs</Link>
                    <Link to="/recruiter/jobs/create" className="nav-item active">Post a Job</Link>
                    <Link to="/recruiter/profile" className="nav-item">Profile</Link>
                </nav>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>

            <div className="main-content">
                <div className="page-header">
                    <h1>Post a New Job</h1>
                    <p>Fill in the details to create a job listing</p>
                </div>

                {error && <div className="alert alert-error">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <div className="card">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Job Title</label>
                            <input
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="e.g. Java Developer"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Company</label>
                            <input
                                name="company"
                                value={form.company}
                                onChange={handleChange}
                                placeholder="e.g. ABC Technologies"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Location</label>
                            <input
                                name="location"
                                value={form.location}
                                onChange={handleChange}
                                placeholder="e.g. Delhi, India"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Job Description</label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Describe the role and responsibilities"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Required Skills</label>
                            <input
                                name="requiredSkills"
                                value={form.requiredSkills}
                                onChange={handleChange}
                                placeholder="Java, Spring Boot, MySQL"
                                required
                            />
                            <span className="form-hint">Separate skills with commas</span>
                        </div>
                        <div className="form-group">
                            <label>Experience (years)</label>
                            <input
                                name="experience"
                                type="number"
                                value={form.experience}
                                onChange={handleChange}
                                placeholder="e.g. 2"
                                min="0"
                                max="30"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Salary (LPA)</label>
                            <input
                                name="salary"
                                type="number"
                                value={form.salary}
                                onChange={handleChange}
                                placeholder="e.g. 8"
                                min="0"
                                required
                            />
                        </div>
                        <button className="btn-primary" type="submit" disabled={loading}>
                            {loading ? "Posting..." : "Post Job"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateJob;