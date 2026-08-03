import { useEffect } from "react";


function AlertMessage({message, type, onClose}) {


    useEffect(()=>{


        const timer = setTimeout(()=>{

            onClose();

        },3000);



        return ()=>clearTimeout(timer);


    },[onClose]);




    if(!message){
        return null;
    }



    return (

        <div className={type === "success" 
            ? "success-message" 
            : "error-message"}>


            {type === "success" ? "✅" : "❌"}

            {" "}

            {message}


        </div>

    );


}


export default AlertMessage;