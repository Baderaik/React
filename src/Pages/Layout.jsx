import { Outlet } from "react-router-dom";
import Header from "../Component/Partical/Header";
import Footer from "../Component/Partical/Footer";


let Layout =()=>{
    return(
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )

}
export default Layout;