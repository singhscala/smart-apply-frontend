import { useState } from "react";
import { uploadResume } from "../../services/resumeService";
import "./Resume.css";

function Resume() {

    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const handleUpload = async (e) => {

        e.preventDefault();

        if (!file) {
            setMessage("Please select a PDF.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {

            await uploadResume(formData);

            setMessage("✅ Resume uploaded successfully.");

        } catch (error) {

            console.error(error);
            setMessage("❌ Upload failed.");

        }

    };

    return (

        <div className="resume-page">

            <div className="resume-upload-card">

                <h2>Upload Resume</h2>

                <form onSubmit={handleUpload}>

                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setFile(e.target.files[0])}
                    />

                    <button type="submit">
                        Upload Resume
                    </button>

                </form>

                {message && (
                    <p className="message">
                        {message}
                    </p>
                )}

            </div>

        </div>

    );
}

export default Resume;