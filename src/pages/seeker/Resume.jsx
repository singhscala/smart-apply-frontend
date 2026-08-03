import { useState } from "react";
import { uploadResume } from "../../services/resumeService";
import AlertMessage from "../../components/common/AlertMessage";


function Resume() {


    const [file, setFile] = useState(null);

    const [alert, setAlert] = useState(null);





    const handleUpload = async (e) => {


        e.preventDefault();




        if (!file) {


            setAlert({

                message:"Please select a PDF file.",

                type:"error"

            });


            return;

        }






        const formData = new FormData();


        formData.append("file", file);






        try {


            await uploadResume(formData);



            setAlert({

                message:"Resume uploaded successfully.",

                type:"success"

            });



        }


        catch(error){


            console.error(error);



            setAlert({

                message:"Upload failed.",

                type:"error"

            });



        }



    };






return (


<div className="resume-page">


    <div className="resume-upload-card">



        <h1>
            Upload Resume
        </h1>




        <p>
            Upload your resume to extract skills and get personalized job recommendations.
        </p>





        {/* Alert Message */}

        <AlertMessage

            message={alert?.message}

            type={alert?.type}

            onClose={()=>setAlert(null)}

        />







        <form onSubmit={handleUpload}>



            <label className="upload-box">



                {

                    file ?

                    <span>
                        {file.name}
                    </span>


                    :


                    <span>
                        Choose PDF Resume
                    </span>

                }






                <input

                    type="file"

                    accept=".pdf"

                    onChange={(e)=>setFile(e.target.files[0])}

                />



            </label>






            <button

                type="submit"

                className="btn-primary"

            >

                Upload Resume

            </button>





        </form>






    </div>



</div>


);


}


export default Resume;