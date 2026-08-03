import { useLocation } from "react-router-dom";
import { useState } from "react";
import { getCareerAdvice } from "../../services/geminiService";
import "./RecommendationDetails.css";

function RecommendationDetails() {

    const { state } = useLocation();

    const [advice, setAdvice] = useState(null);
    const [loading, setLoading] = useState(false);

    if (!state) {
        return <h2>Recommendation not found.</h2>;
    }

    const generateAdvice = async () => {

        setLoading(true);

        try {

            const response = await getCareerAdvice({

                matchedSkills: state.matchedSkills,

                missingSkills: state.missingSkills,

            });

            setAdvice(response);

        } catch (error) {

            console.error(error);

        }

        setLoading(false);
    };

    return (

        <div className="details-page">

            <div className="details-card">

                <h1>{state.jobTitle}</h1>

                <h3>{state.company}</h3>
                <div className="job-description">

                    <h3>Job Description</h3>

                    <p>{state.jobDescription}</p>

                </div>

                <div className="score-box">

                    <h2>Match Score</h2>

                    <p>{state.matchPercentage}%</p>

                </div>

                <div className="skills-section">

                    <div>

                        <h3>Matched Skills</h3>

                        <ul>

                            {(state.matchedSkills || []).map((skill, index) => (

                                <li key={index}>
                                    ✅ {skill}
                                </li>

                            ))}

                        </ul>

                    </div>

                    <div>

                        <h3>Missing Skills</h3>

                        <ul>

                            {(state.missingSkills || []).map((skill, index) => (

                                <li key={index}>
                                    ❌ {skill}
                                </li>

                            ))}

                        </ul>

                    </div>

                </div>

                <button
                    className="ai-btn"
                    onClick={generateAdvice}
                >
                    {loading ? "Generating..." : "AI Suggestion"}
                </button>

                {advice && (

                    <div className="ai-section">

                        <h2>Career Summary</h2>

                        <p>{advice.careerSummary}</p>

                        <h2>Learning Roadmap</h2>

                        <ul>

                            {advice.learningRoadmap.map((item, index) => (

                                <li key={index}>{item}</li>

                            ))}

                        </ul>

                        <h2>Interview Preparation</h2>

                        <ul>

                            {advice.interviewPreparation.map((item, index) => (

                                <li key={index}>{item}</li>

                            ))}

                        </ul>

                        <h2>Resume Improvements</h2>

                        <ul>

                            {advice.resumeImprovements.map((item, index) => (

                                <li key={index}>{item}</li>

                            ))}

                        </ul>

                    </div>

                )}

            </div>

        </div>

    );
}

export default RecommendationDetails;