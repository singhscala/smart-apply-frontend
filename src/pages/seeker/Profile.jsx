import { useEffect, useState } from "react";
import { getProfile } from "../../services/userService";
import AlertMessage from "../../components/common/AlertMessage";

function Profile() {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    role: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (error) {
      console.error(error);

      setError("Failed to load profile.");

      setProfile({
        fullName: localStorage.getItem("fullName") || "",
        email: localStorage.getItem("email") || "",
        role: localStorage.getItem("role") || "SEEKER",
      });
    }
  }

  return (
    <div className="profile-page">
      {error && <AlertMessage type="error" message={error} />}

      <div className="profile-card">
        <div className="profile-top">
          <div className="profile-avatar">
            {profile.fullName ? profile.fullName.charAt(0).toUpperCase() : "S"}
          </div>

          <h1>{profile.fullName}</h1>

          <span className="profile-role">
            {profile.role === "SEEKER" ? "Job Seeker" : profile.role}
          </span>
        </div>

        <div className="profile-info">
          <h2>Account Information</h2>

          <div className="profile-item">
            <span className="profile-label">Full Name</span>
            <span className="profile-value">{profile.fullName}</span>
          </div>

          <div className="profile-item">
            <span className="profile-label">Email</span>
            <span className="profile-value">{profile.email}</span>
          </div>

          <div className="profile-item">
            <span className="profile-label">Role</span>
            <span className="profile-value">
              {profile.role === "SEEKER" ? "Job Seeker" : profile.role}
            </span>
          </div>

          <div className="profile-item">
            <span className="profile-label">Account Status</span>
            <span className="status-active">🟢 Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
