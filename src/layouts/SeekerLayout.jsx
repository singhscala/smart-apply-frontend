import Navbar from "../components/common/Navbar";
import { Outlet } from "react-router-dom";

function SeekerLayout() {
    return (
        <>
            <Navbar />

            <main
                style={{
                    padding: "40px"
                }}
            >
                <Outlet />
            </main>
        </>
    );
}

export default SeekerLayout;