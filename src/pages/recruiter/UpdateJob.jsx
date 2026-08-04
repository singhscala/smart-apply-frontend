import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getJobById, updateJob } from "../../services/jobService";

function UpdateJob() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    requiredSkills: "",
    experience: "",
    salary: "",
  });

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchJob();
  }, []);

  async function fetchJob() {
    try {
      const job = await getJobById(id);

      setForm({
        title: job.title,

        company: job.company,

        location: job.location || "",

        description: job.description || "",

        requiredSkills: job.requiredSkills.join(", "),

        experience: job.experience || "",

        salary: job.salary || "",
      });
    } catch (error) {
      console.log("Fetch Job Error:", error);

      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to load job details");
      }
    }
  }

  function handleChange(e) {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    setSuccess("");

    setLoading(true);

    try {
      const skillsList = form.requiredSkills

        .split(",")

        .map((skill) => skill.trim())

        .filter((skill) => skill !== "");

      const payload = {
        title: form.title,

        company: form.company,

        location: form.location,

        description: form.description,

        requiredSkills: skillsList,

        experience: parseInt(form.experience),

        salary: parseFloat(form.salary),
      };

      await updateJob(id, payload);

      setSuccess("Job updated successfully!");

      setTimeout(() => {
        navigate("/recruiter/jobs");
      }, 1500);
    } catch (error) {
      console.log("Update Job Error:", error);

      if (error.response) {
        if (error.response.data.message) {
          setError(error.response.data.message);
        } else if (error.response.data.error) {
          setError(error.response.data.error);
        } else {
          setError("Failed to update job. Please check your details.");
        }
      } else if (error.request) {
        setError("Server is not responding. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Update Job</h1>

        <p>Edit your job listing details</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {success && <div className="alert alert-success">{success}</div>}

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Job Title</label>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Company</label>

            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Location</label>

            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Job Description</label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Required Skills</label>

            <input
              name="requiredSkills"
              value={form.requiredSkills}
              onChange={handleChange}
              required
            />

            <span className="form-hint">Separate skills with commas</span>
          </div>

          <div className="form-group">
            <label>Experience (years)</label>

            <input
              name="experience"
              type="number"
              value={form.experience}
              onChange={handleChange}
              min="0"
              max="30"
              required
            />
          </div>

          <div className="form-group">
            <label>Salary (LPA)</label>

            <input
              name="salary"
              type="number"
              value={form.salary}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div className="quick-actions">
            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Job"}
            </button>

            <Link to="/recruiter/jobs" className="btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateJob;
