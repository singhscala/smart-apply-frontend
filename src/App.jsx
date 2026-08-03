import { BrowserRouter, Routes, Route } from "react-router-dom";

// Authentication
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Layout
import SeekerLayout from "./layouts/SeekerLayout";

// Seeker Pages
import Dashboard from "./pages/seeker/Dashboard";
import Resume from "./pages/seeker/Resume";
import Recommendations from "./pages/seeker/Recommendations";
import RecommendationDetails from "./pages/seeker/RecommendationDetails";
import Profile from "./pages/seeker/Profile";

// Recruiter Pages
import RecruiterDashboard from "./pages/recruiter/Dashboard";
import Jobs from "./pages/recruiter/Jobs";
import CreateJob from "./pages/recruiter/CreateJob";
import UpdateJob from "./pages/recruiter/UpdateJob";
import RecruiterProfile from "./pages/recruiter/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Authentication */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Seeker Routes */}
        <Route element={<SeekerLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route
            path="/recommendations/:id"
            element={<RecommendationDetails />}
          />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Recruiter Routes */}
        <Route
          path="/recruiter/dashboard"
          element={<RecruiterDashboard />}
        />
        <Route
          path="/recruiter/jobs"
          element={<Jobs />}
        />
        <Route
          path="/recruiter/jobs/create"
          element={<CreateJob />}
        />
        <Route
          path="/recruiter/jobs/update/:id"
          element={<UpdateJob />}
        />
        <Route
          path="/recruiter/profile"
          element={<RecruiterProfile />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;