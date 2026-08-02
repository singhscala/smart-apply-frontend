import "./Recruiter.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { logout } from "../../services/authService";
import { getProfile } from "../../services/userService";

function RecruiterProfile() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        fullName: "",
        email: "",
        role: ""
    });

    useEffect(() => {
        async function fetchProfile() {
            try {
                const data = await getProfile();
                setProfile(data);
            } catch (err) {
                setProfile({
                    fullName: localStorage.getItem("fullName") || "",
                    email: localStorage.getItem("email") || "",
                    role: localStorage.getItem("role") || "RECRUITER"
                });
            }
        }
        fetchProfile();
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
                    <Link to="/recruiter/dashboard" className="nav-item">Dashboard</Link>
                    <Link to="/recruiter/jobs" className="nav-item">My Jobs</Link>
                    <Link to="/recruiter/jobs/create" className="nav-item">Post a Job</Link>
                    <Link to="/recruiter/profile" className="nav-item active">Profile</Link>
                </nav>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>

            <div className="main-content">
                <div className="page-header">
                    <h1>My Profile</h1>
                    <p>Your recruiter account details</p>
                </div>

                <div className="profile-card">
                    <div className="profile-avatar">
                        {profile.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div className="profile-name">{profile.fullName}</div>
                    <span className="profile-role">Recruiter</span>

                    <div className="profile-info">
                        <div className="profile-info-row">
                            <span>Full Name</span>
                            <span>{profile.fullName}</span>
                        </div>
                        <div className="profile-info-row">
                            <span>Email</span>
                            <span>{profile.email}</span>
                        </div>
                        <div className="profile-info-row">
                            <span>Role</span>
                            <span>{profile.role}</span>
                        </div>
                        <div className="profile-info-row">
                            <span>Account Status</span>
                            <span style={{color:"#16a34a"}}>Active</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecruiterProfile;