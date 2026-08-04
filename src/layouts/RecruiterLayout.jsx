import { Outlet } from "react-router-dom";
import RecruiterSidebar from "../components/common/RecruiterSidebar";
import "../styles/recruiter.css";

console.log("Recruiter CSS loaded");

function RecruiterLayout() {
  return (
    <div className="recruiter-layout">
      <RecruiterSidebar />

      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

export default RecruiterLayout;
