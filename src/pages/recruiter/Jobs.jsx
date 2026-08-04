import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getRecruiterJobs } from "../../services/jobService";
import Loader from "../../components/common/Loader";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchJobs() {
    setLoading(true);
    setError("");

    try {
      const data = await getRecruiterJobs();
      setJobs(data);
    } catch (error) {
      console.error(error);

      setError(error.response?.data?.message || "Unable to load jobs.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="alert alert-error">{error}</div>;
  }

  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>My Job Postings</h1>

        <p>Manage and monitor all jobs you have posted</p>
      </div>

      <div className="card">
        <div className="jobs-header">
          <h2>Posted Jobs ({jobs.length})</h2>

          <Link to="/recruiter/jobs/create" className="btn-primary">
            + Post New Job
          </Link>
        </div>

        {jobs.length === 0 ? (
          <div className="empty-state">
            <h3>No Job Postings Yet</h3>

            <p>You haven't created any job listings.</p>

            <br />

            <Link to="/recruiter/jobs/create" className="btn-primary">
              Post First Job
            </Link>
          </div>
        ) : (
          <table className="job-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Company</th>
                <th>Location</th>
                <th>Experience</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td>
                    <strong>{job.title}</strong>
                  </td>

                  <td>{job.company}</td>

                  <td>{job.location || "N/A"}</td>

                  <td>{job.experience ?? "N/A"} Years</td>

                  <td>{job.salary ? `₹${job.salary} LPA` : "N/A"}</td>

                  <td>
                    <div className="actions">
                      <Link
                        to={`/recruiter/jobs/update/${job.id}`}
                        className="btn-secondary"
                      >
                        Edit
                      </Link>

                      <Link
                        to={`/recruiter/jobs/delete/${job.id}`}
                        className="btn-danger"
                      >
                        Delete
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Jobs;
