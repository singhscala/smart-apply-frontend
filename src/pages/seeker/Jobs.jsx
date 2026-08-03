import { useEffect, useState } from "react";
import { getAllJobs } from "../../services/jobService";
import { useNavigate } from "react-router-dom";


function Jobs() {


    const [jobs,setJobs] = useState([]);
    const navigate = useNavigate();


    useEffect(()=>{

        fetchJobs();

    },[]);



    const fetchJobs = async()=>{

        try{

            const response = await getAllJobs();

            setJobs(response);

        }
        catch(error){

            console.error(error);

        }

    };



    return (

        <div className="recommendations-page">


            <div className="page-header">

                <h1>
                    Available Jobs
                </h1>

                <p>
                    Explore jobs and find your next opportunity.
                </p>

            </div>




            {
                jobs.length === 0 ?

                (

                    <div className="card empty-state">

                        No jobs available.

                    </div>

                )


                :

                (

                    jobs.map((job)=>(

                        <div 
                            className="card recommendation-card"
                            key={job.id}
                        >

                            <h2>
                                {job.title}
                            </h2>


                            <p>
                                Company: {job.company}
                            </p>


                            <p>
                                Location: {job.location}
                            </p>


                            <p>
                                Experience: {job.experience}
                            </p>



                            <button
                                className="btn-secondary"
                                onClick={() => navigate(`/jobs/${job.id}`)}
                            >

                                View Details

                            </button>


                        </div>

                    ))

                )

            }



        </div>

    );

}


export default Jobs;