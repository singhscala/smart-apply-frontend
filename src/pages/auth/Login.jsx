import "./Auth.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";

function Login() {

    // State
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
    e.preventDefault();

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
        alert("Invalid email or password");
    }
};

    return (
        <div className="auth-container">
            <div className="auth-card">

                <h1>Smart Match</h1>
                <p>AI Powered Resume Analysis & Job Recommendation</p>

                <form onSubmit={handleLogin}>

                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="auth-btn">
                        Login
                    </button>

                </form>

                <p className="bottom-text">
                    Don't have an account?{" "}
                    <Link to="/register">Register</Link>
                </p>

            </div>
        </div>
    );
}

export default Login;