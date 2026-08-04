import { useEffect, useState } from "react";
import { getProfile } from "../../services/userService";
import AlertMessage from "../../components/common/AlertMessage";

function Profile() {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      setProfile(response);
    } catch (error) {
      console.error(error);

      setProfile({
        fullName: localStorage.getItem("fullName") || "",
        email: localStorage.getItem("email") || "",
        role: localStorage.getItem("role") || "SEEKER",
      });
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-top">
          <div className="profile-avatar">P</div>

          <h1>Prachi Singh</h1>

          <span className="profile-role">Job Seeker</span>
        </div>

        <div className="profile-info">
          <h2>Account Information</h2>

          <div className="profile-item">
            <span className="profile-label">Full Name</span>

            <span className="profile-value">Prachi Singh</span>
          </div>

          <div className="profile-item">
            <span className="profile-label">Email</span>

            <span className="profile-value">prachi@gmail.com</span>
          </div>

          <div className="profile-item">
            <span className="profile-label">Role</span>

            <span className="profile-value">Job Seeker</span>
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
