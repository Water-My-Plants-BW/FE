import React from "react";
//Input reusable component


function Input(props) {

   const errorMessage = props.errors;

    return(
    
        <div>
     <input {...props}></input>
     { props.errors.length != 0 && <p style={{color: "cyan"}}>{errorMessage}</p>}
     </div>
  );
}


export default Input;