import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobById } from "../../services/jobService";


function JobDetails(){

    const {id} = useParams();

    const [job,setJob] = useState(null);



    useEffect(()=>{

        fetchJob();

    },[]);



    const fetchJob = async()=>{

        try{

            const response = await getJobById(id);

            setJob(response);

        }
        catch(error){

            console.error(error);

        }

    };



    if(!job){

        return (

            <div className="empty-state">

                Loading job details...

            </div>

        );

    }



    return (

    <div className="details-page">


        <div className="details-card card">


            <div className="job-header">

                <h1>
                    {job.title}
                </h1>

                <span className="company-badge">
                    {job.company}
                </span>

            </div>



            <div className="job-info">


                <div className="info-box">

                    <h4>
                        Location
                    </h4>

                    <p>
                        📍 {job.location}
                    </p>

                </div>



                <div className="info-box">

                    <h4>
                        Experience
                    </h4>

                    <p>
                        💼 {job.experience} years
                    </p>

                </div>


            </div>




            <div className="job-section">


                <h2>
                    Description
                </h2>


                <p>
                    {job.description}
                </p>


            </div>




            <div className="job-section">


                <h2>
                    Required Skills
                </h2>


                <div className="skills-list">


                    {
                        job.requiredSkills?.map((skill,index)=>(

                            <span
                                className="skill-tag"
                                key={index}
                            >

                                {skill}

                            </span>

                        ))
                    }


                </div>


            </div>



        </div>


    </div>

);
}


export default JobDetails;