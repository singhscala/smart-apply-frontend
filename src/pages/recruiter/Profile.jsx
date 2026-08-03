import { useState, useEffect } from "react";
import { getProfile } from "../../services/userService";


function RecruiterProfile() {


    const [profile, setProfile] = useState({

        fullName: "",
        email: "",
        role: ""

    });





    useEffect(() => {


        async function fetchProfile() {


            try {


                const data = await getProfile();

                setProfile(data);


            }
            catch(error) {


                setProfile({

                    fullName:
                    localStorage.getItem("fullName") || "",


                    email:
                    localStorage.getItem("email") || "",


                    role:
                    localStorage.getItem("role") || "RECRUITER"

                });


            }


        }


        fetchProfile();


    }, []);







    return (


        <div className="dashboard-content">



            <div className="page-header">


                <h1>
                    My Profile
                </h1>


                <p>
                    Your recruiter account details
                </p>


            </div>









            <div className="profile-container">


                <div className="profile-card">





                    <div className="profile-header">



                        <div className="profile-avatar">


                            {
                                profile.fullName
                                ?
                                profile.fullName
                                .charAt(0)
                                .toUpperCase()

                                :

                                "R"
                            }


                        </div>





                        <h2>
                            {profile.fullName}
                        </h2>



                        <p>
                            Recruiter
                        </p>



                    </div>









                    <div className="profile-details">





                        <div className="profile-field">


                            <label>
                                Full Name
                            </label>


                            <span>
                                {profile.fullName}
                            </span>


                        </div>








                        <div className="profile-field">


                            <label>
                                Email
                            </label>


                            <span>
                                {profile.email}
                            </span>


                        </div>








                        <div className="profile-field">


                            <label>
                                Role
                            </label>


                            <span>
                                Recruiter
                            </span>


                        </div>








                        <div className="profile-field">


                            <label>
                                Account Status
                            </label>


                            <span className="status-active">

                                🟢 Active

                            </span>


                        </div>





                    </div>





                </div>



            </div>





        </div>


    );


}


export default RecruiterProfile;