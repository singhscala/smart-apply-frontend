import { Link, useNavigate } from "react-router-dom";
import "./css/Navbar.css";

function Navbar() {
    const navigate = useNavigate();

    const role = localStorage.getItem("role");
    const fullName = localStorage.getItem("fullName");

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <nav className="navbar">

            <div className="logo">
                Smart Match
            </div>

            <div className="nav-links">

                {role === "SEEKER" && (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/resume">Resume</Link>
                        <Link to="/recommendations">Recommendations</Link>
                        <Link to="/profile">Profile</Link>
                    </>
                )}

                {role === "RECRUITER" && (
                    <>
                        <Link to="/recruiter/dashboard">Dashboard</Link>
                        <Link to="/recruiter/jobs">Jobs</Link>
                        <Link to="/recruiter/profile">Profile</Link>
                    </>
                )}

            </div>

            <div className="nav-user">

                <span>
                    Welcome {fullName}
                </span>

                <button onClick={logout}>
                    Logout
                </button>

            </div>

        </nav>
    );
}

export default Navbar;