import Navbar from "../components/common/Navbar";
import { Outlet } from "react-router-dom";


function SeekerLayout(){

    return (

        <>

            <Navbar />

            <Outlet />

        </>

    );

}


export default SeekerLayout;