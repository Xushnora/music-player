import React from "react";

function Conatiner(props){
    return(
        <div className="container">
            {props.children}
        </div>
    )
}

export default Conatiner