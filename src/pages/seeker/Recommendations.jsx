import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecommendations } from "../../services/recommendationService";
import "./Recommendations.css";

function Recommendations() {

    const navigate = useNavigate();

    const [recommendations, setRecommendations] = useState([]);
    const [page, setPage] = useState(0);
    const [hasNext, setHasNext] = useState(true);

    useEffect(() => {
        fetchRecommendations(page);
    }, [page]);

    const fetchRecommendations = async (pageNumber) => {

        try {

            const response = await getRecommendations(pageNumber, 5);

            setRecommendations(response);

            setHasNext(response.length === 5);

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="recommendations-page">

            <h1>Recommended Jobs</h1>

            {recommendations.map((recommendation) => (

                <div
                    key={recommendation.recommendationId}
                    className="recommendation-card"
                >

                    <h2>{recommendation.jobTitle}</h2>

                    <p>{recommendation.company}</p>

                    <p>
                        <strong>Match Score:</strong>{" "}
                        {recommendation.matchPercentage}%
                    </p>

                    <button
                        onClick={() =>
                            navigate(
                                `/recommendations/${recommendation.recommendationId}`,
                                {
                                    state: recommendation,
                                }
                            )
                        }
                    >
                        View Details
                    </button>

                </div>

            ))}

            <div className="pagination">

                <button
                    disabled={page === 0}
                    onClick={() => setPage(page - 1)}
                >
                    Previous
                </button>

                <span>
                    Page {page + 1}
                </span>

                <button
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