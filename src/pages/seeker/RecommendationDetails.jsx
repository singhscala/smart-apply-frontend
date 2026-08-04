import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { getCareerAdvice } from "../../services/geminiService";
import { getJobById } from "../../services/jobService";

function RecommendationDetails() {
  const { state } = useLocation();

  const [job, setJob] = useState(null);

  const [advice, setAdvice] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [aiError, setAiError] = useState("");

  useEffect(() => {
    if (state?.jobId) {
      fetchJob();
    }
  }, [state]);

  const fetchJob = async () => {
    try {
      const response = await getJobById(state.jobId);

      setJob(response);
    } catch (error) {
      setError(error.response?.data?.message || "Unable to load job details.");
    }
  };

  if (!state) {
    return (
      <div className="details-page">
        <h2>Recommendation not found</h2>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-error">{error}</div>;
  }

  const generateAdvice = async () => {
    setLoading(true);

    setAiError("");

    try {
      const response = await getCareerAdvice({
        matchedSkills: state.matchedSkills || [],

        missingSkills: state.missingSkills || [],
      });

      setAdvice(response);
    } catch (error) {
      setAiError(
        error.response?.data?.message ||
          "Unable to generate AI career guidance.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="details-page">
      <div className="details-card">
        {/* Job Header */}

        <div className="job-header">
          <h1>{state.jobTitle}</h1>

          <span className="company-badge">{state.company}</span>
        </div>

        {/* Job Information */}

        <div className="job-info">
          <div className="info-box">
            <h4>Location</h4>

            <p>{job?.location || "Not Available"}</p>
          </div>

          <div className="info-box">
            <h4>Experience</h4>

            <p>{job?.experience || 0} Years</p>
          </div>

          <div className="info-box">
            <h4>Salary</h4>

            <p>₹{job?.salary || 0} LPA</p>
          </div>
        </div>

        <div className="job-section">
          <h2>Job Description</h2>

          <p>{job?.description || "No description available"}</p>
        </div>

        <div className="job-section">
          <h2>Match Score</h2>

          <div className="details-score">
            <span>Your Match</span>

            <h1>{state.matchPercentage}%</h1>
          </div>
        </div>

        <div className="job-section">
          <h2>Matched Skills</h2>

          {state.matchedSkills?.length > 0 ? (
            state.matchedSkills.map((skill, index) => (
              <span key={index} className="details-skill">
                ✅ {skill}
              </span>
            ))
          ) : (
            <p>No matched skills</p>
          )}

          <h2 style={{ marginTop: "25px" }}>Missing Skills</h2>

          {state.missingSkills?.length > 0 ? (
            state.missingSkills.map((skill, index) => (
              <span key={index} className="details-skill missing">
                ❌ {skill}
              </span>
            ))
          ) : (
            <p>No missing skills 🎉</p>
          )}
        </div>

        <button
          className="btn-primary ai-btn"
          onClick={generateAdvice}
          disabled={loading}
        >
          {loading ? "Generating AI Advice..." : "🤖 Get AI Career Guidance"}
        </button>

        {aiError && <div className="alert alert-error">{aiError}</div>}

        {advice && (
          <div className="ai-section">
            <h2>🤖 AI Career Guidance</h2>

            <div className="ai-card">
              <h3>Career Summary</h3>

              <p>{advice.careerSummary}</p>
            </div>

            <div className="ai-card">
              <h3>Learning Roadmap</h3>

              <ul>
                {advice.learningRoadmap?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="ai-card">
              <h3>Interview Preparation</h3>

              <ul>
                {advice.interviewPreparation?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="ai-card">
              <h3>Resume Improvements</h3>

              <ul>
                {advice.resumeImprovements?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecommendationDetails;
