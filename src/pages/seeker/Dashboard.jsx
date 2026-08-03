import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getResumeAnalysis } from "../../services/resumeService";


function Dashboard(){

    const [resume,setResume] = useState(null);

    const navigate = useNavigate();



    useEffect(()=>{

        fetchResume();

    },[]);



    const fetchResume = async()=>{

        try{

            const response = await getResumeAnalysis();

            console.log("Resume Response:", response);

            setResume(response);

        }
        catch(error){

            console.error(error);

            setResume(null);

        }

    };



return (

<div className="seeker-dashboard">


    <div className="dashboard-content">



        <h1>
            Welcome {localStorage.getItem("fullName")} 👋
        </h1>



        <p className="dashboard-subtitle">
            AI-Powered Job Matching System
        </p>





        <div className="dashboard-skills-section">


            <h2>
                Extracted Skills
            </h2>



            {
                resume ?


                <>


                    <p className="resume-status">
                        ✅ Resume Uploaded
                    </p>




                    <p className="skill-count">

                        Skills Found:
                        {" "}
                        {resume.extractedSkills.length}

                    </p>





                    <div className="dashboard-skills-grid">


                    {

                        resume.extractedSkills.map(
                            (skill,index)=>(

                            <div
                                className="skill-card"
                                key={index}
                            >

                                {skill}

                            </div>

                        ))

                    }


                    </div>



                </>



                :


                <>


                    <p>
                        ⚠️ Resume not uploaded
                    </p>




                    <button
                        className="btn-primary upload-btn"
                        onClick={()=>navigate("/resume")}
                    >

                        Upload Resume

                    </button>


                </>


            }



        </div>



    </div>



</div>

);


}


export default Dashboard;