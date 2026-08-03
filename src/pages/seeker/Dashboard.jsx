import { useEffect, useState } from "react";
import { getResumeAnalysis } from "../../services/resumeService";
import "./Dashboard.css";

function Dashboard() {

    const [resume, setResume] = useState(null);

    useEffect(() => {
        fetchResume();
    }, []);

    const fetchResume = async () => {

        try {

            const response = await getResumeAnalysis();
            setResume(response);

        } catch (error) {

            console.error(error);

        }
    };

    return (
        <div className="dashboard">

            <h1>
                Welcome {localStorage.getItem("fullName")} 👋
            </h1>

            <div className="resume-card">

                <h2>Resume Status</h2>

                {resume ? (

                    <>
                        <p className="resume-status">
                            ✅ Resume Uploaded
                        </p>

                        <h3>Skills Extracted</h3>

                        <ul className="skills-list">

                            {resume.extractedSkills.map((skill, index) => (

                                <li key={index}>
                                    {skill}
                                </li>

                            ))}

                        </ul>

                    </>

                ) : (

                    <p>No resume uploaded.</p>

                )}

            </div>

        </div>
    );
}

export default Dashboard;