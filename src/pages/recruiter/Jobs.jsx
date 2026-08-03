import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


function Jobs() {


    const [jobs, setJobs] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");





    useEffect(() => {

        fetchJobs();

    }, []);






    async function fetchJobs() {


        setLoading(true);

        setError("");



        try {


            const token = localStorage.getItem("token");



            const response = await axios.get(

                "http://localhost:8080/api/jobs/my-jobs",

                {

                    headers:{

                        Authorization:`Bearer ${token}`

                    }

                }

            );



            const data = response.data || [];



            setJobs(data);



            localStorage.setItem(

                "myJobs",

                JSON.stringify(data)

            );


        }

        catch(error){


            setError(
                "Failed to fetch jobs. Please try again later."
            );


        }

        finally{


            setLoading(false);


        }


    }







    async function handleDelete(id){



        if(
            !window.confirm(
                "Are you sure you want to delete this job posting?"
            )
        ){

            return;

        }



        try{


            const token = localStorage.getItem("token");



            await axios.delete(

                `http://localhost:8080/api/jobs/${id}`,

                {

                    headers:{

                        Authorization:`Bearer ${token}`

                    }

                }

            );



            const updatedJobs = jobs.filter(

                job => job.id !== id

            );



            setJobs(updatedJobs);



            localStorage.setItem(

                "myJobs",

                JSON.stringify(updatedJobs)

            );



            setSuccess(
                "Job deleted successfully!"
            );



            setTimeout(()=>{

                setSuccess("");

            },3000);



        }

        catch(error){


            setError(

                error.response?.data?.message ||

                "Failed to delete job"

            );


        }


    }







    return (


        <div className="dashboard-content">



            <div className="page-header">


                <h1>
                    My Job Postings
                </h1>


                <p>
                    Manage and monitor all jobs you have posted
                </p>


            </div>







            {
                error &&

                <div className="alert alert-error">

                    {error}

                </div>

            }




            {
                success &&

                <div className="alert alert-success">

                    {success}

                </div>

            }









            <div className="card">



                <div className="jobs-header">


                    <h2>
                        Posted Jobs ({jobs.length})
                    </h2>




                    <Link

                        to="/recruiter/jobs/create"

                        className="btn-primary"

                    >

                        + Post New Job

                    </Link>



                </div>









                {
                    loading ?


                    (

                        <p className="loading-text">

                            Loading jobs...

                        </p>


                    )


                    :


                    jobs.length === 0 ?


                    (

                        <div className="empty-state">


                            <h3>
                                No Job Postings Yet
                            </h3>



                            <p>
                                You haven't created any job listings.
                            </p>



                            <br/>



                            <Link

                                to="/recruiter/jobs/create"

                                className="btn-primary"

                            >

                                Post First Job

                            </Link>


                        </div>


                    )


                    :



                    (


                        <table className="job-table">


                            <thead>


                                <tr>


                                    <th>
                                        Job Title
                                    </th>


                                    <th>
                                        Company
                                    </th>


                                    <th>
                                        Location
                                    </th>


                                    <th>
                                        Exp (Yrs)
                                    </th>


                                    <th>
                                        Salary
                                    </th>


                                    <th>
                                        Actions
                                    </th>


                                </tr>


                            </thead>






                            <tbody>


                                {

                                jobs.map((job)=>(



                                    <tr key={job.id}>


                                        <td>

                                            <strong>
                                                {job.title}
                                            </strong>

                                        </td>





                                        <td>
                                            {job.company}
                                        </td>





                                        <td>
                                            {job.location || "N/A"}
                                        </td>





                                        <td>
                                            {job.experience ?? "N/A"}
                                        </td>





                                        <td>

                                            {
                                                job.salary
                                                ?
                                                `₹${job.salary}`
                                                :
                                                "N/A"
                                            }

                                        </td>







                                        <td>


                                            <div className="actions">


                                                <Link

                                                    to={`/recruiter/jobs/update/${job.id}`}

                                                    className="btn-secondary"

                                                >

                                                    Edit

                                                </Link>






                                                <button

                                                    onClick={()=>handleDelete(job.id)}

                                                    className="btn-danger"

                                                >

                                                    Delete

                                                </button>



                                            </div>


                                        </td>



                                    </tr>


                                ))

                                }



                            </tbody>



                        </table>


                    )


                }



            </div>




        </div>


    );


}


export default Jobs;