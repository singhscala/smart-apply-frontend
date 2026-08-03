import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


function CreateJob() {


    const navigate = useNavigate();


    const [form, setForm] = useState({

        title: "",
        company: "",
        location: "",
        description: "",
        requiredSkills: "",
        experience: "",
        salary: ""

    });



    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    const [loading, setLoading] = useState(false);





    function handleChange(e) {


        setForm({

            ...form,

            [e.target.name]: e.target.value

        });


    }








    async function handleSubmit(e) {


        e.preventDefault();


        setError("");

        setSuccess("");

        setLoading(true);



        try {


            const token = localStorage.getItem("token");



            const skillsList = form.requiredSkills

                .split(",")

                .map(skill => skill.trim())

                .filter(skill => skill !== "");





            const payload = {


                title: form.title,

                company: form.company,

                location: form.location,

                description: form.description,

                requiredSkills: skillsList,

                experience: parseInt(form.experience),

                salary: parseFloat(form.salary)


            };






            await axios.post(

                "http://localhost:8080/api/jobs",

                payload,

                {

                    headers:{

                        Authorization:`Bearer ${token}`

                    }

                }

            );





            setSuccess("Job posted successfully!");



            setTimeout(()=>{


                navigate("/recruiter/jobs");


            },1500);




        }

        catch(error){

    console.log("Job Post Error:", error);


    if(error.response){

        if(error.response.data.message){

            setError(error.response.data.message);

        }
        else if(error.response.data.error){

            setError(error.response.data.error);

        }
        else{

            setError("Invalid job details. Please check your input.");

        }

    }
    else if(error.request){

        setError("Server is not responding. Please try again.");

    }
    else{

        setError("Something went wrong. Please try again.");

    }

}

        finally{


            setLoading(false);


        }


    }








    return (


        <div className="dashboard-content">





            <div className="page-header">


                <h1>
                    Post a New Job
                </h1>


                <p>
                    Fill in the details to create a job listing
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



                <form onSubmit={handleSubmit}>


                    <div className="form-group">

                        <label>
                            Job Title
                        </label>


                        <input

                            name="title"

                            value={form.title}

                            onChange={handleChange}

                            placeholder="e.g. Java Developer"

                            required

                        />

                    </div>








                    <div className="form-group">

                        <label>
                            Company
                        </label>


                        <input

                            name="company"

                            value={form.company}

                            onChange={handleChange}

                            placeholder="e.g. ABC Technologies"

                            required

                        />

                    </div>








                    <div className="form-group">

                        <label>
                            Location
                        </label>


                        <input

                            name="location"

                            value={form.location}

                            onChange={handleChange}

                            placeholder="e.g. Delhi, India"

                            required

                        />

                    </div>








                    <div className="form-group">

                        <label>
                            Job Description
                        </label>


                        <textarea

                            name="description"

                            value={form.description}

                            onChange={handleChange}

                            placeholder="Describe the role and responsibilities"

                            required

                        />

                    </div>








                    <div className="form-group">

                        <label>
                            Required Skills
                        </label>


                        <input

                            name="requiredSkills"

                            value={form.requiredSkills}

                            onChange={handleChange}

                            placeholder="Java, Spring Boot, MySQL"

                            required

                        />


                        <span className="form-hint">

                            Separate skills with commas

                        </span>


                    </div>








                    <div className="form-group">

                        <label>
                            Experience (years)
                        </label>


                        <input

                            name="experience"

                            type="number"

                            value={form.experience}

                            onChange={handleChange}

                            placeholder="e.g. 2"

                            min="0"

                            max="30"

                            required

                        />


                    </div>








                    <div className="form-group">

                        <label>
                            Salary (LPA)
                        </label>


                        <input

                            name="salary"

                            type="number"

                            value={form.salary}

                            onChange={handleChange}

                            placeholder="e.g. 8"

                            min="0"

                            required

                        />


                    </div>








                    <button

                        className="btn-primary"

                        type="submit"

                        disabled={loading}

                    >

                        {
                            loading
                            ?
                            "Posting..."
                            :
                            "Post Job"
                        }


                    </button>



                </form>



            </div>





        </div>


    );


}


export default CreateJob;