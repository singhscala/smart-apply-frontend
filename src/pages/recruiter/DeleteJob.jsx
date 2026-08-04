import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { deleteJob } from "../../services/jobService";

function DeleteJob() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleDelete() {
    setLoading(true);

    try {
      await deleteJob(id);

      navigate("/recruiter/jobs");
    } catch (error) {
      setError(error.response?.data?.message || "Unable to delete job.");

      setLoading(false);
    }
  }

  return (
    <div className="delete-page">
      <div className="delete-card">
        <h1>Delete Job</h1>

        <p>Are you sure you want to delete this job posting?</p>

        <p className="delete-warning">This action cannot be undone.</p>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="delete-buttons">
          <button
            className="btn-secondary"
            onClick={() => navigate("/recruiter/jobs")}
          >
            Cancel
          </button>

          <button
            className="btn-danger"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteJob;
