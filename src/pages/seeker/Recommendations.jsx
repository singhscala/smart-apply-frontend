import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecommendations } from "../../services/recommendationService";
import Loader from "../../components/common/Loader";

function Recommendations() {
  const navigate = useNavigate();

  const [recommendations, setRecommendations] = useState([]);

  const [page, setPage] = useState(0);

  const [hasNext, setHasNext] = useState(false);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(true);

  const fetchRecommendations = async (pageNumber) => {
    setLoading(true);
    setError("");
    try {
      const response = await getRecommendations(pageNumber, 6);

      if (response.length > 5) {
        setHasNext(true);

        setRecommendations(response.slice(0, 5));
      } else {
        setHasNext(false);

        setRecommendations(response);
      }
    } catch (error) {
      console.error(error);

      setHasNext(false);

      setError(
        error.response?.data?.message || "Unable to load recommendations.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations(page);
  }, [page]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="alert alert-error">{error}</div>;
  }

  return (
    <div className="recommendations-page">
      <div className="page-header">
        <h1>Recommended Jobs</h1>

        <p>Jobs matched based on your resume skills.</p>
      </div>

      <div className="recommendation-grid">
        {recommendations.length > 0 ? (
          recommendations.map((recommendation) => (
            <div
              key={recommendation.recommendationId}
              className="recommendation-card"
            >
              <div className="recommendation-header">
                <h2>{recommendation.jobTitle}</h2>

                <span className="company-name">{recommendation.company}</span>
              </div>

              <div className="match-box">
                <span>Match Score</span>

                <strong>{recommendation.matchPercentage}%</strong>
              </div>

              <div className="skills-result">
                <h4>Matched Skills</h4>

                <div>
                  {recommendation.matchedSkills?.map((skill, index) => (
                    <span className="skill-tag" key={index}>
                      {skill}
                    </span>
                  ))}
                </div>

                <h4 className="missing-title">Missing Skills</h4>

                <div>
                  {recommendation.missingSkills?.map((skill, index) => (
                    <span className="skill-tag missing" key={index}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <button
                className="btn-primary"
                onClick={() =>
                  navigate(
                    `/recommendations/${recommendation.recommendationId}`,

                    {
                      state: recommendation,
                    },
                  )
                }
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <h3>No recommendations found</h3>
          </div>
        )}
      </div>

      <div className="pagination">
        <button
          className="btn-secondary"
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        <span>Page {page + 1}</span>

        <button
          className="btn-secondary"
          disabled={!hasNext}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Recommendations;
