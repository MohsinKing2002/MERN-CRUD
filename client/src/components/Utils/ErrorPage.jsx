import React from "react";
import { NavLink } from "react-router-dom";

const ErrorPage = ()=>{
    return(
        <div style={{ minHeight: "91vh", width: "100%", backgroundColor: "#f7f7f7", textAlign: "center"}}>
            <img style={{ width: "70%" }} src="https://www.kindpng.com/picc/m/254-2549743_404-page-error-sign-error-404-transparent-hd.png" alt="" />
            <br /> <br />
            <NavLink to="/">Back to Home page..</NavLink>
        </div>
    );
}

export default ErrorPage;