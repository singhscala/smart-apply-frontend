import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createJob } from "../../services/jobService";

function CreateJob() {
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
        experience: Number(form.experience),
        salary: Number(form.salary),
      };

      await createJob(payload);

      setSuccess("Job posted successfully!");

      setTimeout(() => {
        navigate("/recruiter/jobs");
      }, 1500);
    } catch (error) {
      console.log("Job Post Error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to create job. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Post a New Job</h1>

        <p>Fill in the details to create a job listing</p>
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
              placeholder="e.g. Java Developer"
              required
            />
          </div>

          <div className="form-group">
            <label>Company</label>

            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="e.g. ABC Technologies"
              required
            />
          </div>

          <div className="form-group">
            <label>Location</label>

            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Delhi, India"
              required
            />
          </div>

          <div className="form-group">
            <label>Job Description</label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the role and responsibilities"
              required
            />
          </div>

          <div className="form-group">
            <label>Required Skills</label>

            <input
              name="requiredSkills"
              value={form.requiredSkills}
              onChange={handleChange}
              placeholder="Java, Spring Boot, MySQL"
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
              placeholder="e.g. 2"
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
              placeholder="e.g. 8"
              min="0"
              required
            />
          </div>

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? "Posting..." : "Post Job"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateJob;
