import { BrowserRouter, Routes, Route } from "react-router-dom";

// Authentication
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Protected Route
import ProtectedRoute from "./components/common/ProtectedRoute";

// Layout
import SeekerLayout from "./layouts/SeekerLayout";
import RecruiterLayout from "./layouts/RecruiterLayout";

// Seeker Pages
import Dashboard from "./pages/seeker/Dashboard";
import Resume from "./pages/seeker/Resume";
import Recommendations from "./pages/seeker/Recommendations";
import RecommendationDetails from "./pages/seeker/RecommendationDetails";
import Profile from "./pages/seeker/Profile";
import SeekerJobs from "./pages/seeker/Jobs";
import JobDetails from "./pages/seeker/JobDetails";

// Recruiter Pages
import RecruiterDashboard from "./pages/recruiter/Dashboard";
import RecruiterJobs from "./pages/recruiter/Jobs";
import CreateJob from "./pages/recruiter/CreateJob";
import UpdateJob from "./pages/recruiter/UpdateJob";
import RecruiterProfile from "./pages/recruiter/Profile";
import DeleteJob from "./pages/recruiter/DeleteJob";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =====================
                    Authentication
                ====================== */}

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* =====================
                    SEEKER ROUTES
                    Navbar applied here
                ====================== */}

        <Route
          element={
            <ProtectedRoute role="SEEKER">
              <SeekerLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/resume" element={<Resume />} />

          <Route path="/jobs" element={<SeekerJobs />} />

          <Route path="/jobs/:id" element={<JobDetails />} />

          <Route path="/recommendations" element={<Recommendations />} />

          <Route
            path="/recommendations/:id"
            element={<RecommendationDetails />}
          />

          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* =====================
                    RECRUITER ROUTES
                    Sidebar applied here
                ====================== */}

        <Route
          element={
            <ProtectedRoute role="RECRUITER">
              <RecruiterLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />

          <Route path="/recruiter/jobs" element={<RecruiterJobs />} />

          <Route path="/recruiter/jobs/create" element={<CreateJob />} />

          <Route path="/recruiter/jobs/update/:id" element={<UpdateJob />} />

          <Route path="/recruiter/jobs/delete/:id" element={<DeleteJob />} />

          <Route path="/recruiter/profile" element={<RecruiterProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
