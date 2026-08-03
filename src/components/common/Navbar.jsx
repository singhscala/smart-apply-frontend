import { Link, useNavigate } from "react-router-dom";
import "./css/Navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const fullName = localStorage.getItem("fullName");


    const handleLogout = () => {

        localStorage.clear();

        navigate("/");

    };


    return (

        <nav className="navbar">


            <div className="navbar-logo">
                Smart Match
            </div>



            <div className="navbar-links">


                <Link to="/dashboard">
                    Dashboard
                </Link>


                <Link to="/resume">
                    Resume
                </Link>


                <Link to="/jobs">
                    Jobs
                </Link>


                <Link to="/recommendations">
                    Recommendations
                </Link>


                <Link to="/profile">
                    Profile
                </Link>


            </div>





            <div className="navbar-user">


                <span>
                    Welcome, {fullName}
                </span>



                <button

                    className="btn-danger"

                    onClick={handleLogout}

                >

                    Logout

                </button>


            </div>


        </nav>

    );

}


export default Navbar;