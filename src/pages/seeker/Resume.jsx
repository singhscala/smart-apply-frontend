import { useState } from "react";
import { uploadResume } from "../../services/resumeService";
import AlertMessage from "../../components/common/AlertMessage";

function Resume() {
  const [file, setFile] = useState(null);

  const [alert, setAlert] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setAlert({
        message: "Please select a PDF file.",
        type: "error",
      });
      return;
    }

    if (file.type !== "application/pdf") {
      setAlert({
        message: "Only PDF files are allowed.",
        type: "error",
      });
      return;
    }

    const maxSize = 10 * 1024 * 1024;

    if (file.size > maxSize) {
      setAlert({
        message: "File size should not exceed 10 MB.",
        type: "error",
      });
      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    setLoading(true);

    try {
      await uploadResume(formData);

      setAlert({
        message: "Resume uploaded successfully.",

        type: "success",
      });
    } catch (error) {
      console.error(error);

      setAlert({
        message: error.response?.data?.message || "Failed to upload resume.",

        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-page">
      <div className="resume-upload-card">
        <h1>Upload Resume</h1>

        <p>
          Upload your resume to extract skills and get personalized job
          recommendations.
        </p>

        <AlertMessage
          message={alert?.message}
          type={alert?.type}
          onClose={() => setAlert(null)}
        />

        <form onSubmit={handleUpload}>
          <label className="upload-box">
            {file ? <span>{file.name}</span> : <span>Choose PDF Resume</span>}

            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Uploading..." : "Upload Resume"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Resume;
