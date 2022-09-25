import React from "react";

const Loader = ()=>{
    return(
        <div style={{
            minHeight: "91vh",
            width: "100%",
            backgroundColor: "rgb(229 239 241)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <img style={{ width: "30%" }} src="https://i.gifer.com/origin/e0/e0ea055299e92297b2ec0ef1c80696bf_w200.gif" alt="" />
        </div>
    );
}

export {Loader};